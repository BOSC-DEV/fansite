
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
        "flex items-center space-x-1 px-3 py-1 rounded-full border text-sm transition-all duration-200 hover:scale-105 hover:shadow-md relative overflow-hidden",
        isActive
          ? activeClassName
          : "border-western-wood/40 text-white hover:border-western-wood/60"
      )}
      style={{
        background: isActive 
          ? undefined 
          : `linear-gradient(45deg, #D4A574, #E0B878, #B8A5D9, #8FB1E0, #D889A5)`,
        backgroundSize: '300% 300%',
        animation: 'gradient-flow 3s ease infinite'
      }}
    >
      <Icon className="h-4 w-4 relative z-10" />
      <span className="relative z-10">{count}</span>
      {showLabel && label && <span className="ml-1 relative z-10">{label}</span>}
      
      <style jsx>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </button>
  );
}
