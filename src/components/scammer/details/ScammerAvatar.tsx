
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
    <Avatar className="h-32 w-32 mx-auto rounded-lg">
      {!imageError ? (
        <AvatarImage 
          src={photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`} 
          alt={name} 
          className="object-cover"
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback className="rounded-lg bg-western-sand text-western-wood">
          <UserCircle2 className="h-16 w-16" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
