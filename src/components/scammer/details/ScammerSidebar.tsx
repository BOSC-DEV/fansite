
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
  isProfileLoading: boolean;
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
  isProfileLoading,
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
    <div className="flex-shrink-0 w-full bg-background rounded-lg p-4 shadow-sm border border-border">
      <div className="space-y-6">
        <ScammerAvatar name={name} photoUrl={photoUrl} />
        
        <div className="space-y-6">
          <ScammerInteractionButtons 
            likes={likes}
            dislikes={dislikes}
            views={views}
            isLiked={isLiked}
            isDisliked={isDisliked}
            onLike={onLike}
            onDislike={onDislike}
          />

          <ScammerDetailsSection 
            dateAdded={dateAdded}
            addedBy={addedBy}
            addedByUsername={addedByUsername}
            isProfileLoading={isProfileLoading}
            formatDate={formatDate}
          />
        </div>
      </div>
    </div>
  );
}
