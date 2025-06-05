
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface InteractionButtonProps {
  icon: LucideIcon;
  count: number;
  onClick?: (e: React.MouseEvent) => void;
  active?: boolean;
  activeColor?: string;
  className?: string;
  title?: string;
  iconSize?: number;
  disabled?: boolean;
  isViewOrComment?: boolean;
}

export function InteractionButton({ 
  icon: Icon, 
  count, 
  onClick, 
  active = false, 
  activeColor = 'bg-western-wood',
  className,
  title,
  iconSize,
  disabled = false,
  isViewOrComment = false
}: InteractionButtonProps) {
  const isMobile = useIsMobile();
  const defaultIconSize = 3;
  const actualIconSize = iconSize || defaultIconSize;
  
  // If it's a view or comment button, we don't want to grey it out
  const isDisabled = disabled && !isViewOrComment;
  
  const buttonClasses = cn(
    "flex items-center relative overflow-hidden",
    "text-white py-1 px-2 rounded-full text-xs font-western",
    onClick && !isDisabled ? "cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200" : "cursor-default",
    isDisabled ? "opacity-70" : "",
    isMobile ? "py-0.5 px-1.5" : "",
    // Add static gradient background for non-active buttons
    !active && "bg-gradient-to-r from-[#D4A574] via-[#E0B878] via-[#B8A5D9] via-[#8FB1E0] to-[#D889A5] bg-[length:300%_300%]",
    className
  );
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick && !isDisabled) {
      onClick(e);
    }
  };
  
  return (
    <div className="group">
      <div 
        className={cn(
          buttonClasses,
          // Add hover animation only on group hover
          !active && "group-hover:animate-gradient-flow-hover"
        )}
        onClick={handleClick} 
        title={title}
        style={active && activeColor ? { background: activeColor } : undefined}
      >
        <Icon className={`h-${actualIconSize} w-${actualIconSize} mr-1 relative z-10 ${isMobile ? 'h-3 w-3' : ''}`} />
        <span className="relative z-10">{count || 0}</span>
      </div>
    </div>
  );
}
