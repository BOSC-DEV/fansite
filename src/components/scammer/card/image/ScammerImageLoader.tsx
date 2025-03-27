
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
  const retryCount = useRef(0);
  const maxRetries = 3;
  
  // Reset states when image URL changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
    retryCount.current = 0;
    
    // Check if photoUrl is empty or invalid immediately
    if (!photoUrl || photoUrl.trim() === '') {
      console.log(`Empty image URL for scammer: ${name}`);
      setImageError(true);
      setImageLoaded(true); // Mark as loaded even though we'll show fallback
      onImageLoaded(true, true);
    }
  }, [photoUrl, name, onImageLoaded]);

  const handleImageError = () => {
    console.log(`Image failed to load for scammer: ${name}, URL: ${photoUrl}, attempt ${retryCount.current + 1}/${maxRetries}`);
    
    if (retryCount.current < maxRetries && photoUrl && photoUrl.trim() !== '') {
      // Increment retry counter
      retryCount.current += 1;
      
      // Add cache-busting parameter to URL
      const retrySrc = `${photoUrl}${photoUrl.includes('?') ? '&' : '?'}retry=${retryCount.current}&t=${Date.now()}`;
      
      // Try preloading the image
      const img = new Image();
      img.src = retrySrc;
      img.onload = () => {
        console.log(`Retry successful for ${name} on attempt ${retryCount.current}`);
        setImageLoaded(true);
        setImageError(false);
        onImageLoaded(true, false);
      };
      img.onerror = () => {
        if (retryCount.current >= maxRetries) {
          console.error(`Max retries (${maxRetries}) reached for ${name}, using fallback`);
          setImageError(true);
          setImageLoaded(true);
          onImageLoaded(true, true);
        } else {
          // Trigger another retry with incrementing the counter
          handleImageError();
        }
      };
      
      return;
    }
    
    // If max retries reached or no valid URL, use fallback
    console.log(`Using fallback for scammer: ${name} after failed load attempts`);
    setImageError(true);
    setImageLoaded(true); // Mark as loaded even on error so we display the fallback
    onImageLoaded(true, true);
  };

  const handleImageLoad = () => {
    console.log(`Image loaded successfully for scammer: ${name}`);
    setImageLoaded(true);
    onImageLoaded(true, false);
  };

  // Generate fallback URL when image fails to load - ensure name is properly encoded
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=random&size=400`;
  
  // The image to display - use fallback if error or if photoUrl is empty
  const displayImageUrl = imageError || !photoUrl ? fallbackImageUrl : photoUrl;

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
          <div className="h-10 w-10 rounded-full border-4 border-western-wood/30 border-t-western-wood animate-spin"></div>
        </div>
      )}
      
      <img
        src={displayImageUrl}
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
