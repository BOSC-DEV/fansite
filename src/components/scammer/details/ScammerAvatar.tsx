
import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  // Check if photoUrl is empty or invalid immediately
  useEffect(() => {
    if (!photoUrl || photoUrl.trim() === '') {
      setImageError(true);
    }
  }, [photoUrl]);
  
  // Fallback URL when image fails to load or photoUrl is empty
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=200`;
  
  // The image to display - use fallback if error or if photoUrl is empty
  const displayImageUrl = imageError || !photoUrl ? fallbackImageUrl : photoUrl;
  
  return (
    <div className="flex justify-center">
      <div className="relative w-full aspect-square max-w-full rounded-md overflow-hidden border-2 border-western-wood shadow-md">
        <img
          src={displayImageUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
          loading="lazy"
        />
      </div>
    </div>
  );
}
