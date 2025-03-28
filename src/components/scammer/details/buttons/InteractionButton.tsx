
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface InteractionButtonProps {
  icon: LucideIcon;
  count: number;
  label?: string;
  onClick?: () => void;
  isActive?: boolean;
  activeClassName?: string;
  className?: string;
  title?: string;
  showLabel?: boolean;
  'aria-label'?: string;
  isViewOrComment?: boolean; // New prop to identify view or comment buttons
}

export function InteractionButton({
  icon: Icon,
  count,
  label,
  onClick,
  isActive = false,
  activeClassName = 'bg-green-600 border-green-700 text-white',
  className,
  title,
  showLabel = false,
  'aria-label': ariaLabel,
  isViewOrComment = false
}: InteractionButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex items-center gap-1 px-2 py-1 h-8 text-xs font-medium shadow-sm',
        isActive ? activeClassName : 'bg-western-wood text-western-parchment border-western-wood/80',
        className
      )}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{count || 0}</span>
      {showLabel && label && <span className="hidden sm:inline">{label}</span>}
    </Button>
  );
}
