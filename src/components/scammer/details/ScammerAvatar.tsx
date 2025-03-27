
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
  const imgKey = useRef(`img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);
  
  // Set up when component mounts and clean up when it unmounts
  useEffect(() => {
    isMounted.current = true;
    console.log(`ScammerAvatar mounted for ${name}:`, { photoUrl });
    
    // Reset states on mount/update
    setImageError(false);
    setRetryCount(0);
    
    // Generate a new key when component mounts to force re-render
    imgKey.current = `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    
    return () => {
      isMounted.current = false;
    };
  }, [name, photoUrl]);
  
  // Check if photoUrl is empty or invalid immediately
  useEffect(() => {
    if (!photoUrl || photoUrl.trim() === '') {
      console.log(`Empty avatar URL for ${name}, using fallback`);
      setImageError(true);
    }
  }, [photoUrl, name]);
  
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
    
    // Always add a timestamp to prevent browser caching between page navigations
    const separator = photoUrl.includes('?') ? '&' : '?';
    return `${photoUrl}${separator}t=${Date.now()}`;
  };
  
  const handleImageError = () => {
    if (!isMounted.current) return;
    
    console.log(`Avatar image error for ${name}, retry: ${retryCount}/${maxRetries}`);
    
    if (retryCount < maxRetries) {
      // Try again with cache buster
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
          key={`${imgKey.current}-${retryCount}`} // Enhanced key to force re-render
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
