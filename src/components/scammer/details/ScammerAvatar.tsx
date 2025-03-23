
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";

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
    <div className="w-full px-4 mb-4">
      <Avatar className="h-auto w-full mx-auto rounded-lg aspect-square border border-western-wood/20">
        {!imageError ? (
          <AvatarImage 
            src={photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} 
            alt={name} 
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        ) : (
          <AvatarFallback className="rounded-lg bg-western-sand text-western-wood w-full h-full">
            <UserCircle2 className="h-16 w-16" />
          </AvatarFallback>
        )}
      </Avatar>
    </div>
  );
}
