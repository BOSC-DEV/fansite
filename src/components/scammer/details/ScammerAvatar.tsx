
import React, { useState } from 'react';
import { UserCircle2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="w-full mb-2">
      <AspectRatio ratio={1} className="bg-western-sand/20 rounded-lg overflow-hidden shadow-md">
        {!imageError ? (
          <img 
            src={photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} 
            alt={name} 
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-western-sand text-western-wood">
            <UserCircle2 className="h-24 w-24" />
          </div>
        )}
      </AspectRatio>
    </div>
  );
}
