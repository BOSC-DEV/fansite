
import { useState, useEffect, memo, useRef, useCallback } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScammerImageLoaderProps {
  name: string;
  photoUrl: string;
  onImageLoaded: (loaded: boolean, error: boolean) => void;
}

const ScammerImageLoaderComponent = ({ name, photoUrl, onImageLoaded }: ScammerImageLoaderProps) => {
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
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      
      <img
        key={`${imgKey.current}-${retryCount}`}
        src={getImageUrl()}
        alt={name || "Scammer"}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        data-testid="scammer-image"
      />
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ScammerImageLoader = memo(ScammerImageLoaderComponent);
