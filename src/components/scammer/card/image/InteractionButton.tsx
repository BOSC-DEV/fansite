
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
      style={{
        background: active && activeColor 
          ? activeColor 
          : `linear-gradient(45deg, #D4A574, #E0B878, #B8A5D9, #8FB1E0, #D889A5)`,
        backgroundSize: '300% 300%',
        animation: 'gradient-flow 3s ease infinite'
      }}
    >
      <Icon className={`h-${actualIconSize} w-${actualIconSize} mr-1 relative z-10 ${isMobile ? 'h-3 w-3' : ''}`} />
      <span className="relative z-10">{count || 0}</span>
      
      <style jsx>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
