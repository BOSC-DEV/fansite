
import React from 'react';
import { LikeButton } from './buttons/LikeButton';
import { DislikeButton } from './buttons/DislikeButton';
import { ViewsButton } from './buttons/ViewsButton';
import { CommentsButton } from './buttons/CommentsButton';
import { ShareButton } from './buttons/ShareButton';

export interface ScammerInteractionButtonsProps {
  scammerId: string;
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
  comments?: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  className?: string;
}

export function ScammerInteractionButtons({
  scammerId,
  likes,
  dislikes,
  views,
  shares,
  comments = 0,
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  className
}: ScammerInteractionButtonsProps) {
  return (
    <div className={`flex items-center gap-2 ${className || ''}`}>
      <LikeButton 
        count={likes} 
        isActive={isLiked} 
        onLike={onLike} 
      />
      
      <DislikeButton 
        count={dislikes} 
        isActive={isDisliked} 
        onDislike={onDislike} 
      />

      <ViewsButton count={views} />

      <CommentsButton count={comments} />
      
      <ShareButton scammerId={scammerId} count={shares} />
    </div>
  );
}
