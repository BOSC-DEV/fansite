
import React from 'react';
import { ThumbsDown } from 'lucide-react';
import { InteractionButton } from './InteractionButton';
import { useProfileInteraction } from '@/hooks/interactions/useProfileInteraction';

interface DislikeButtonProps {
  count: number;
  isActive: boolean;
  onDislike: () => void;
}

export function DislikeButton({ count, isActive, onDislike }: DislikeButtonProps) {
  const { handleInteraction } = useProfileInteraction();

  const handleDislike = () => {
    handleInteraction(onDislike);
  };

  return (
    <InteractionButton
      icon={ThumbsDown}
      count={count}
      isActive={isActive}
      activeClassName="bg-red-100 border-red-300 text-red-700"
      onClick={handleDislike}
      title="Dislike this scammer"
    />
  );
}
