
import { useState, useEffect, memo } from "react";
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
  
  // Reset image states when image URL changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [photoUrl]);

  // Check if photoUrl is empty or invalid immediately
  useEffect(() => {
    if (!photoUrl || photoUrl.trim() === '') {
      console.log(`Empty image URL for scammer: ${name}`);
      setImageError(true);
      setImageLoaded(true);
      onImageLoaded(true, true);
    }
  }, [photoUrl, name, onImageLoaded]);

  const handleImageError = () => {
    console.log(`Image failed to load for scammer: ${name}, URL: ${photoUrl}`);
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
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
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
