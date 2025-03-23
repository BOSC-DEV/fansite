
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface IdentityTabProps {
  aliases: string[];
}

export function IdentityTab({ aliases = [] }: IdentityTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Known Aliases</h3>
      {aliases && aliases.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {aliases.map((alias, index) => (
            <Badge key={index} variant="outline" className="bg-western-sand/10">
              {alias}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No known aliases</p>
      )}
    </div>
  );
}
