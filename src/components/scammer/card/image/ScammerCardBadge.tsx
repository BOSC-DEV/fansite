
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ScammerCardBadgeProps {
  rank?: number;
  className?: string;
}

export function ScammerCardBadge({ rank, className }: ScammerCardBadgeProps) {
  if (!rank) return null;
  
  return (
    <div className="absolute top-2 left-2">
      <div className="flex items-center">
        <div className="bg-western-accent text-western-parchment font-wanted text-xs px-1.5 py-0.5 rounded-sm">
          #{rank} Most Wanted
        </div>
      </div>
    </div>
  );
}
