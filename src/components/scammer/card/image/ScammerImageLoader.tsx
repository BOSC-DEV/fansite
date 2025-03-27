
import { useState, useEffect, memo, useRef } from "react";
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
  const maxRetries = 3;
  const imageRef = useRef<HTMLImageElement>(null);
  const isMounted = useRef(true);
  
  // Generate fallback URL when image fails to load - ensure name is properly encoded
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
    
    // Check if photoUrl is empty or invalid immediately
    if (!photoUrl || photoUrl.trim() === '') {
      console.log(`Empty image URL for scammer: ${name}, using fallback`);
      setImageError(true);
      setImageLoaded(true); // Mark as loaded even though we'll show fallback
      onImageLoaded(true, true);
    }
    
    // Return cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [photoUrl, name, onImageLoaded]);

  // Add cache buster to the URL for retries
  const getImageUrl = () => {
    if (imageError || !photoUrl) return fallbackImageUrl;
    
    // Add cache buster for retries
    if (retryCount > 0) {
      const separator = photoUrl.includes('?') ? '&' : '?';
      return `${photoUrl}${separator}retry=${retryCount}&t=${Date.now()}`;
    }
    
    // Always add a timestamp to prevent browser caching between page navigations
    const separator = photoUrl.includes('?') ? '&' : '?';
    return `${photoUrl}${separator}t=${Date.now()}`;
  };

  const handleImageError = () => {
    if (!isMounted.current) return;
    
    console.log(`Image failed to load for scammer: ${name}, URL: ${photoUrl}, retry: ${retryCount}`);
    
    if (retryCount < maxRetries) {
      // Try again with cache buster
      setRetryCount(prev => prev + 1);
    } else {
      // After max retries, fallback to generated avatar
      console.log(`Image failed after ${maxRetries} retries for ${name}, using fallback`);
      setImageError(true);
      setImageLoaded(true); // Mark as loaded so we show the fallback
      onImageLoaded(true, true);
    }
  };

  const handleImageLoad = () => {
    if (!isMounted.current) return;
    
    console.log(`Image loaded successfully for scammer: ${name}`);
    setImageLoaded(true);
    onImageLoaded(true, false);
  };
  
  // Ensure image has absolute URL for social sharing
  const getAbsoluteImageUrl = (url: string) => {
    if (!url) return fallbackImageUrl;
    
    if (url.startsWith('http')) {
      return url;
    }
    
    // Create absolute URL from relative URL
    const origin = window.location.origin;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${origin}${path}`;
  };
  
  // Set absolute URL for use in SEO
  const absoluteImageUrl = getAbsoluteImageUrl(displayImageUrl);
  
  return (
    <>
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      
      <img
        ref={imageRef}
        key={`img-${photoUrl}-${retryCount}-${Date.now()}`} // Enhanced key to force re-render
        src={getImageUrl()}
        alt={name || "Scammer"}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        data-absolute-url={absoluteImageUrl} // Store for potential SEO use
      />
    </>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const ScammerImageLoader = memo(ScammerImageLoaderComponent);
