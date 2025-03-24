
import React from 'react';
import { ScammerAvatar } from './ScammerAvatar';
import { ScammerInteractionButtons } from './ScammerInteractionButtons';
import { ScammerDetailsSection } from './ScammerDetailsSection';

interface ScammerSidebarProps {
  name: string;
  photoUrl: string;
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  addedByPhotoUrl?: string | null;
  isProfileLoading: boolean;
  profileId: string | null;
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  formatDate: (date: string) => string;
}

export function ScammerSidebar({
  name,
  photoUrl,
  dateAdded,
  addedBy,
  addedByUsername,
  addedByPhotoUrl,
  isProfileLoading,
  profileId,
  likes,
  dislikes,
  views,
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  formatDate
}: ScammerSidebarProps) {
  return (
    <div className="w-full relative">
      <div className="absolute top-3 right-3 z-10">
        <ScammerInteractionButtons 
          likes={likes}
          dislikes={dislikes}
          views={views}
          isLiked={isLiked}
          isDisliked={isDisliked}
          onLike={onLike}
          onDislike={onDislike}
        />
      </div>
      
      <div className="space-y-6">
        <ScammerAvatar name={name} photoUrl={photoUrl} />
        
        <ScammerDetailsSection 
          dateAdded={dateAdded}
          addedBy={addedBy}
          addedByUsername={addedByUsername}
          addedByPhotoUrl={addedByPhotoUrl}
          isProfileLoading={isProfileLoading}
          profileId={profileId}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
