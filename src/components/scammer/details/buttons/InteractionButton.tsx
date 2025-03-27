
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
}

export function InteractionButton({
  icon: Icon,
  count,
  label,
  onClick,
  isActive = false,
  activeClassName = 'bg-green-100 border-green-300 text-green-700',
  className,
  title,
  showLabel = false,
  'aria-label': ariaLabel
}: InteractionButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex items-center gap-1 px-2 py-1 h-8 text-xs',
        isActive ? activeClassName : '',
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
