
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

  const handleDislike = (event: React.MouseEvent) => {
    // Prevent event bubbling
    event.preventDefault();
    event.stopPropagation();
    
    // Use the handler from props
    handleInteraction(onDislike);
    
    console.log("Disagree button clicked", { count, isActive });
  };

  return (
    <InteractionButton
      icon={ThumbsDown}
      count={count}
      isActive={isActive}
      activeClassName="bg-red-100 border-red-300 text-red-700"
      onClick={handleDislike}
      title="Disagree with this scammer report"
    />
  );
}
