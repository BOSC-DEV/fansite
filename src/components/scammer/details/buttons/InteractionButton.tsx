
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
    <div className="group">
      <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={ariaLabel}
        className={cn(
          "flex items-center space-x-1 px-3 py-1 rounded-full border text-sm transition-all duration-200 hover:scale-105 hover:shadow-md relative overflow-hidden",
          isActive
            ? activeClassName
            : "border-western-wood/40 text-white hover:border-western-wood/60",
          // Add static gradient background for non-active buttons
          !isActive && "bg-gradient-to-r from-[#D4A574] via-[#E0B878] via-[#B8A5D9] via-[#8FB1E0] to-[#D889A5] bg-[length:300%_300%]",
          // Add hover animation only on group hover
          !isActive && "group-hover:animate-gradient-flow-hover"
        )}
      >
        <Icon className="h-4 w-4 relative z-10" />
        <span className="relative z-10">{count}</span>
        {showLabel && label && <span className="ml-1 relative z-10">{label}</span>}
      </button>
    </div>
  );
}
