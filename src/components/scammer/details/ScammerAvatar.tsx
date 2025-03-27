
import React, { useState, useEffect, useRef } from 'react';

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const retryCount = useRef(0);
  const maxRetries = 3;
  
  // Reset states when photo URL changes
  useEffect(() => {
    if (photoUrl) {
      setImageError(false);
      setImageLoaded(false);
      retryCount.current = 0;
    } else {
      // If no photoUrl is provided, go straight to fallback
      setImageError(true);
    }
  }, [photoUrl]);
  
  // Generate fallback URL when image fails to load
  const getFallbackImageUrl = () => {
    // Ensure name is properly encoded and handle empty names
    const encodedName = encodeURIComponent(name || 'Unknown');
    return `https://ui-avatars.com/api/?name=${encodedName}&background=random&size=200`;
  };
  
  // Handle image load success
  const handleImageLoad = () => {
    console.log(`ScammerAvatar: Image loaded successfully for ${name}`);
    setImageLoaded(true);
    setImageError(false);
  };
  
  // Handle image load error with retry logic
  const handleImageError = () => {
    console.warn(`ScammerAvatar: Image failed to load for ${name}, attempt ${retryCount.current + 1}/${maxRetries}`);
    
    if (retryCount.current < maxRetries && photoUrl) {
      // Increment retry counter
      retryCount.current += 1;
      
      // Add cache-busting parameter to force reload
      const retrySrc = `${photoUrl}${photoUrl.includes('?') ? '&' : '?'}retry=${retryCount.current}&t=${Date.now()}`;
      
      // Create a new Image to try preloading
      const img = new Image();
      img.src = retrySrc;
      img.onload = handleImageLoad;
      img.onerror = () => {
        if (retryCount.current >= maxRetries) {
          console.error(`ScammerAvatar: Max retries reached for ${name}, using fallback`);
          setImageError(true);
        } else {
          // Try another retry
          handleImageError();
        }
      };
      
      // Return to prevent immediate fallback
      return;
    }
    
    // If max retries reached or no URL, use fallback
    console.error(`ScammerAvatar: Using fallback image for ${name}`);
    setImageError(true);
  };
  
  // The image to display - use fallback if error or if photoUrl is empty
  const displayImageUrl = imageError ? getFallbackImageUrl() : photoUrl;
  
  return (
    <div className="flex justify-center">
      <div className="relative w-full aspect-square max-w-full rounded-md overflow-hidden border-2 border-western-wood shadow-md">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-western-sand/30 animate-pulse">
            <div className="h-10 w-10 rounded-full border-4 border-western-wood/30 border-t-western-wood animate-spin"></div>
          </div>
        )}
        <img
          src={displayImageUrl}
          alt={name || "Scammer"}
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
          data-testid="scammer-avatar"
        />
      </div>
    </div>
  );
}
