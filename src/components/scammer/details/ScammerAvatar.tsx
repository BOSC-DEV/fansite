
import React, { useState, useEffect, useRef } from 'react';

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const isMounted = useRef(true);
  
  // Set up when component mounts and clean up when it unmounts
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
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
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=random&size=400`;
  
  // Add a cache buster to the URL for retries
  const getImageUrl = () => {
    if (imageError || !photoUrl) return fallbackImageUrl;
    
    // Add cache buster for retries
    if (retryCount > 0) {
      const separator = photoUrl.includes('?') ? '&' : '?';
      return `${photoUrl}${separator}retry=${retryCount}&t=${Date.now()}`;
    }
    
    return photoUrl;
  };
  
  const handleImageError = () => {
    if (!isMounted.current) return;
    
    if (retryCount < maxRetries) {
      // Try again with cache buster
      console.log(`Avatar image retry ${retryCount + 1}/${maxRetries} for ${name}`);
      setRetryCount(prev => prev + 1);
    } else {
      // After max retries, fallback to generated avatar
      console.log(`Avatar image failed after ${maxRetries} retries for ${name}, using fallback`);
      setImageError(true);
    }
  };
  
  return (
    <div className="flex justify-center">
      <div className="relative w-full aspect-square max-w-full rounded-md overflow-hidden border border-western-wood shadow-md">
        <img
          key={`${photoUrl}-${retryCount}`} // Key helps React understand this is a new image
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
