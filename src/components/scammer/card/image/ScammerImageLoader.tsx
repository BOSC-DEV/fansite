
import { useState, useEffect, memo, useRef, useCallback } from "react";
import { AlertCircle, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export interface ScammerImageLoaderProps {
  name: string;
  photoUrl: string;
  onImageLoaded: (loaded: boolean, error: boolean) => void;
  className?: string;
  fallback?: React.ReactNode;
}

export const ScammerImageLoader = memo(({ 
  name, 
  photoUrl, 
  onImageLoaded,
  className,
  fallback
}: ScammerImageLoaderProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  const isMounted = useRef(true);
  const imgKey = useRef(`img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  
  // Generate fallback URL when image fails to load
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=random&size=400`;
  
  // The image to display - use fallback if error or if photoUrl is empty
  const displayImageUrl = imageError || !photoUrl ? fallbackImageUrl : photoUrl;
  
  // Reset component state when image URL changes or component mounts
  useEffect(() => {
    // Mark component as mounted
    isMounted.current = true;
    
    // Reset states
    setImageLoaded(false);
    setImageError(false);
    setRetryCount(0);
    
    // Generate new key to force re-render
    imgKey.current = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    // Check if photoUrl is empty or invalid immediately
    if (!photoUrl || photoUrl.trim() === '') {
      if (isMounted.current) {
        setImageError(true);
        setImageLoaded(true); // Mark as loaded even though we'll show fallback
        onImageLoaded(true, true);
      }
    }
    
    // Return cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [photoUrl, name, onImageLoaded]);

  // Prepare the image URL with caching strategy
  const getImageUrl = useCallback(() => {
    if (imageError || !photoUrl) return fallbackImageUrl;
    
    // Always add a timestamp to prevent browser caching between page navigations
    const cacheBuster = `t=${imgKey.current}`;
    const separator = photoUrl.includes('?') ? '&' : '?';
    
    return `${photoUrl}${separator}${cacheBuster}`;
  }, [photoUrl, imageError, fallbackImageUrl]);

  const handleImageLoad = useCallback(() => {
    if (!isMounted.current) return;
    
    setImageLoaded(true);
    onImageLoaded(true, false);
  }, [onImageLoaded]);

  const handleImageError = useCallback(() => {
    if (!isMounted.current) return;
    
    if (retryCount < maxRetries) {
      // Try again with cache buster
      setRetryCount(prev => prev + 1);
    } else {
      // After max retries, fallback to generated avatar
      setImageError(true);
      setImageLoaded(true);
      onImageLoaded(true, true);
    }
  }, [retryCount, maxRetries, onImageLoaded]);
  
  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="flex flex-col items-center">
            <ImageIcon className="h-8 w-8 text-muted-foreground/70 animate-pulse" />
            <div className="mt-2 bg-western-wood/50 h-1 w-16 rounded-full overflow-hidden">
              <div 
                className="h-full bg-western-wood shimmer" 
                style={{ 
                  width: `${Math.min(100, retryCount * 33)}%`,
                  transition: 'width 0.5s ease-in-out' 
                }}
              />
            </div>
          </div>
        </div>
      )}
      
      {imageError && fallback ? (
        <div className={className}>{fallback}</div>
      ) : (
        <img
          key={`${imgKey.current}-${retryCount}`}
          src={getImageUrl()}
          alt={name || "Scammer"}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0",
            className
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          data-testid="scammer-image"
        />
      )}
    </>
  );
});

ScammerImageLoader.displayName = "ScammerImageLoader";
