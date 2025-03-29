
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InteractionButtonProps {
  icon: LucideIcon;
  count: number;
  isActive?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  title?: string;
  activeClassName?: string;
  showLabel?: boolean;
  label?: string;
  isViewOrComment?: boolean;
  "aria-label"?: string;
}

export function InteractionButton({ 
  icon: Icon, 
  count, 
  isActive = false, 
  onClick, 
  title, 
  activeClassName = "bg-green-100 border-green-300 text-green-700",
  showLabel = false,
  label,
  isViewOrComment = false,
  "aria-label": ariaLabel
}: InteractionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      className={cn(
        "flex items-center space-x-1 px-3 py-1 rounded-full border text-sm",
        isActive
          ? activeClassName
          : "bg-western-parchment border-western-wood/40 text-western-wood hover:bg-western-parchment/80 transition-colors"
      )}
    >
      <Icon className="h-4 w-4" />
      <span>{count}</span>
      {showLabel && label && <span className="ml-1">{label}</span>}
    </button>
  );
}
