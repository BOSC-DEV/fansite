
import React from 'react';
import { ThumbsUp } from 'lucide-react';
import { InteractionButton } from './InteractionButton';
import { useProfileInteraction } from '@/hooks/interactions/useProfileInteraction';

interface LikeButtonProps {
  count: number;
  isActive: boolean;
  onLike: () => void;
}

export function LikeButton({ count, isActive, onLike }: LikeButtonProps) {
  const { handleInteraction } = useProfileInteraction();

  const handleLike = () => {
    handleInteraction(onLike);
  };

  return (
    <InteractionButton
      icon={ThumbsUp}
      count={count}
      isActive={isActive}
      onClick={handleLike}
      title="Like this scammer"
    />
  );
}
