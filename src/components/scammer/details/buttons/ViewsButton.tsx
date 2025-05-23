
import React from 'react';
import { Eye } from 'lucide-react';
import { InteractionButton } from './InteractionButton';

interface ViewsButtonProps {
  count: number;
}

export function ViewsButton({ count }: ViewsButtonProps) {
  // This component displays the number of views a scammer profile has received
  return (
    <InteractionButton
      icon={Eye}
      count={count}
      title="Number of views"
      aria-label={`${count} views`}
      isViewOrComment={true} // Mark as view button to prevent greying out
    />
  );
}
