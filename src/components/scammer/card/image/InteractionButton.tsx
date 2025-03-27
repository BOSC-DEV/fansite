
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
}

export function InteractionButton({ 
  icon: Icon, 
  count, 
  onClick, 
  active = false, 
  activeColor = 'bg-black/60',
  className,
  title,
  iconSize
}: InteractionButtonProps) {
  const isMobile = useIsMobile();
  const defaultIconSize = isMobile ? 2.5 : 3;
  const actualIconSize = iconSize || defaultIconSize;
  
  const buttonClasses = cn(
    "flex items-center",
    active ? activeColor : "bg-black/60",
    "text-white py-1 px-2 rounded-full text-xs",
    onClick ? "cursor-pointer hover:bg-black/80 transition-colors" : "",
    isMobile ? "px-1.5 py-0.5" : "",
    className
  );
  
  const iconClasses = cn(`h-${actualIconSize} w-${actualIconSize} mr-1`);
  
  return (
    <div 
      className={buttonClasses}
      onClick={onClick} 
      title={title}
    >
      <Icon className={iconClasses} />
      <span>{count || 0}</span>
    </div>
  );
}
