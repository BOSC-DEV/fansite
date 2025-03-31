
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { InteractionButton } from './InteractionButton';

interface CommentsButtonProps {
  count: number;
}

export function CommentsButton({ count }: CommentsButtonProps) {
  const scrollToComments = () => {
    const commentsSection = document.querySelector('.comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <InteractionButton
      icon={MessageSquare}
      count={count}
      onClick={scrollToComments}
      title="View comments"
      isViewOrComment={true} // Mark as comment button to prevent greying out
    />
  );
}
