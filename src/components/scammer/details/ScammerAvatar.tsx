
import React, { useState, useEffect } from 'react';

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  // Check if photoUrl is empty or invalid immediately
  useEffect(() => {
    if (!photoUrl || photoUrl.trim() === '') {
      setImageError(true);
    } else {
      // Reset error state when a new URL is provided
      setImageError(false);
      setRetryCount(0);
    }
  }, [photoUrl]);
  
  // Generate fallback URL when image fails to load
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=random&size=200`;
  
  // Add a cache buster to the URL for retries
  const getImageUrl = () => {
    if (imageError || !photoUrl) return fallbackImageUrl;
    
    // Add cache buster for retries
    if (retryCount > 0) {
      const separator = photoUrl.includes('?') ? '&' : '?';
      return `${photoUrl}${separator}retry=${retryCount}`;
    }
    
    return photoUrl;
  };
  
  const handleImageError = () => {
    if (retryCount < maxRetries) {
      // Try again with cache buster
      setRetryCount(prev => prev + 1);
    } else {
      // After max retries, fallback to generated avatar
      setImageError(true);
    }
  };
  
  return (
    <div className="flex justify-center">
      <div className="relative w-full aspect-square max-w-full rounded-md overflow-hidden border border-western-wood shadow-md">
        <img
          src={getImageUrl()}
          alt={name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
    </div>
  );
}
