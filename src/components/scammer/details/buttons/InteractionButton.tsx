
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
  showLabel = false
}: InteractionButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        'flex items-center gap-2',
        isActive ? activeClassName : '',
        className
      )}
      onClick={onClick}
      title={title}
    >
      <Icon className="h-4 w-4" />
      <span>{count || 0}</span>
      {showLabel && label && <span className="hidden sm:inline">{label}</span>}
    </Button>
  );
}
