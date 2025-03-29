
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

  const handleLike = (event: React.MouseEvent) => {
    // Prevent event bubbling
    event.preventDefault();
    event.stopPropagation();
    
    // Use the handler from props
    handleInteraction(onLike);
    
    console.log("Agree button clicked", { count, isActive });
  };

  return (
    <InteractionButton
      icon={ThumbsUp}
      count={count}
      isActive={isActive}
      onClick={handleLike}
      title="Agree with this scammer report"
    />
  );
}
