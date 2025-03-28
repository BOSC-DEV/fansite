
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

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
  isViewOrComment?: boolean;
}

export function InteractionButton({
  icon: Icon,
  count,
  label,
  onClick,
  isActive = false,
  activeClassName = 'bg-green-600 border-green-700 text-white',
  className,
  title,
  showLabel = false,
  'aria-label': ariaLabel,
  isViewOrComment = false
}: InteractionButtonProps) {
  const isMobile = useIsMobile();
  const buttonHeight = isMobile ? 'h-6' : 'h-7';
  const iconSize = isMobile ? 'h-3 w-3' : 'h-3 w-3';
  const textSize = isMobile ? 'text-[10px]' : 'text-xs';

  return (
    <Button
      variant="outline"
      size="sm"
      className={cn(
        `flex items-center gap-1 px-2 py-1 ${buttonHeight} ${textSize} font-medium shadow-sm`,
        isActive ? activeClassName : 'bg-western-wood text-western-parchment border-western-wood/80',
        className
      )}
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
    >
      <Icon className={iconSize} />
      <span>{count || 0}</span>
      {showLabel && label && <span className="hidden sm:inline">{label}</span>}
    </Button>
  );
}
