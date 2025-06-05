
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
    "flex items-center",
    active ? activeColor : "bg-western-wood",
    "text-western-parchment py-1 px-2 rounded-full text-xs font-western",
    onClick && !isDisabled ? "cursor-pointer hover:bg-western-wood/90 hover:scale-105 hover:shadow-md transition-all duration-200" : "cursor-default",
    isDisabled ? "opacity-70" : "",
    isMobile ? "py-0.5 px-1.5" : "",
    className
  );
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick && !isDisabled) {
      onClick(e);
    }
  };
  
  return (
    <div 
      className={buttonClasses}
      onClick={handleClick} 
      title={title}
    >
      <Icon className={`h-${actualIconSize} w-${actualIconSize} mr-1 ${isMobile ? 'h-3 w-3' : ''}`} />
      <span>{count || 0}</span>
    </div>
  );
}
