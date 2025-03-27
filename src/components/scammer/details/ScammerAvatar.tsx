
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  const isMounted = useRef(true);
  const imgKey = useRef(`img-${Date.now()}`);
  
  // Effect for component lifecycle and URL changes
  useEffect(() => {
    isMounted.current = true;
    
    // Reset states on mount/update
    setImageError(false);
    setRetryCount(0);
    
    // Generate a new key to force re-render
    imgKey.current = `img-${Date.now()}`;
    
    // Check for empty URL immediately
    if (!photoUrl || photoUrl.trim() === '') {
      setImageError(true);
    }
    
    return () => {
      isMounted.current = false;
    };
  }, [photoUrl]);
  
  // Generate fallback URL 
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'Unknown')}&background=random&size=400`;
  
  // Prepare image URL with cache busting strategy
  const getImageUrl = useCallback(() => {
    if (imageError || !photoUrl) return fallbackImageUrl;
    
    const cacheBuster = `t=${imgKey.current}`;
    const separator = photoUrl.includes('?') ? '&' : '?';
    return `${photoUrl}${separator}${cacheBuster}`;
  }, [photoUrl, imageError, fallbackImageUrl]);
  
  // Handle image load errors
  const handleImageError = useCallback(() => {
    if (!isMounted.current) return;
    
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
    } else {
      setImageError(true);
    }
  }, [retryCount, maxRetries]);
  
  return (
    <div className="flex justify-center">
      <div className="relative w-full aspect-square max-w-full rounded-md overflow-hidden border border-western-wood shadow-md">
        <img
          key={`${imgKey.current}-${retryCount}`}
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
