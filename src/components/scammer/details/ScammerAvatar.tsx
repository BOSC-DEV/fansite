
import React from 'react';

interface ScammerAvatarProps {
  name: string;
  photoUrl: string;
}

export function ScammerAvatar({ name, photoUrl }: ScammerAvatarProps) {
  return (
    <div className="w-full aspect-square relative overflow-hidden rounded-md border border-western-wood/30">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${name}`}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="bg-western-sand/30 w-full h-full flex items-center justify-center">
          <span className="text-3xl font-bold text-western-wood/50">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
