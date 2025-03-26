
import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScammerImageLoaderProps {
  name: string;
  photoUrl: string;
  onImageLoaded: (loaded: boolean, error: boolean) => void;
}

export function ScammerImageLoader({ name, photoUrl, onImageLoaded }: ScammerImageLoaderProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Reset image states when image changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [photoUrl]);

  const handleImageError = () => {
    console.log(`Image failed to load for scammer: ${name}`);
    setImageError(true);
    onImageLoaded(true, true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    onImageLoaded(true, false);
  };

  // Fallback URL when image fails to load
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;
  
  // The image to display
  const displayImageUrl = imageError ? fallbackImageUrl : photoUrl;

  // Ensure image has absolute URL for social sharing
  const getAbsoluteImageUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
  };
  
  // Set absolute URL for use in SEO
  const absoluteImageUrl = getAbsoluteImageUrl(displayImageUrl);
  
  return (
    <>
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
        </div>
      )}
      
      <img
        src={displayImageUrl}
        alt={name}
        className={cn(
          "object-cover w-full h-full transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={handleImageLoad}
        onError={handleImageError}
        loading="lazy"
        data-absolute-url={absoluteImageUrl} // Store for potential SEO use
      />
      
      {/* Hidden metadata for Twitter crawlers */}
      <meta property="twitter:image" content={absoluteImageUrl} />
      <meta property="twitter:image:alt" content={`Profile image of ${name}`} />
      <meta property="og:image" content={absoluteImageUrl} />
    </>
  );
}
