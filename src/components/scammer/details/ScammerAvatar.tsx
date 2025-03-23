
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
    <div className="w-full">
      <AspectRatio ratio={1/1} className="w-full bg-muted">
        <Avatar className="h-full w-full rounded-lg">
          {!imageError ? (
            <AvatarImage 
              src={photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} 
              alt={name} 
              className="object-cover"
              onError={handleImageError}
            />
          ) : (
            <AvatarFallback className="rounded-lg bg-western-sand text-western-wood">
              <UserCircle2 className="h-24 w-24" />
            </AvatarFallback>
          )}
        </Avatar>
      </AspectRatio>
    </div>
  );
}
