
import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { GlowingEffect } from "@/components/ui/glowing-effect";

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
  isViewOrComment?: boolean; // New prop to identify view or comment buttons
}

export function InteractionButton({ 
  icon: Icon, 
  count, 
  onClick, 
  active = false, 
  activeColor = 'bg-hacker-accent',
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
    "flex items-center relative",
    active ? activeColor : "bg-hacker-card",
    "text-hacker-text py-1 px-2 rounded-full text-xs font-mono border border-hacker-border/30",
    onClick && !isDisabled ? "cursor-pointer hover:bg-hacker-accent/20 transition-colors" : "cursor-default",
    isDisabled ? "opacity-70" : "",
    isMobile ? "py-0.5 px-1.5" : "",
    className
  );
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick && !isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }
  };
  
  return (
    <div 
      className={buttonClasses}
      onClick={handleClick} 
      title={title}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {onClick && !isDisabled && (
        <GlowingEffect 
          glow={active}
          disabled={false}
          spread={30}
          borderWidth={1}
          variant="matrix"
          blur={5}
        />
      )}
      <Icon className={`h-${actualIconSize} w-${actualIconSize} mr-1 ${isMobile ? 'h-3 w-3' : ''}`} />
      <span>{count || 0}</span>
    </div>
  );
}
