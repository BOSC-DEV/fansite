
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ScammerCardBadgeProps {
  name: string;
  rank?: number;
  className?: string;
}

export function ScammerCardBadge({ name, rank, className }: ScammerCardBadgeProps) {
  return (
    <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 to-transparent">
      <div className="flex items-center">
        {rank && (
          <div className="mr-2 bg-western-accent text-western-parchment font-wanted text-xs px-1.5 py-0.5 rounded-sm">
            #{rank}
          </div>
        )}
        <h3 className="text-white text-sm truncate font-western">
          {name}
        </h3>
      </div>
    </div>
  );
}
