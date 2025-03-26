
import React from 'react';
import { Eye } from 'lucide-react';
import { InteractionButton } from './InteractionButton';

interface ViewsButtonProps {
  count: number;
}

export function ViewsButton({ count }: ViewsButtonProps) {
  return (
    <InteractionButton
      icon={Eye}
      count={count}
      title="Number of views"
    />
  );
}
