
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface NetworkTabProps {
  accomplices: string[];
}

export function NetworkTab({ accomplices }: NetworkTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Known Accomplices</h3>
      {accomplices && accomplices.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {accomplices.map((accomplice, index) => (
            <Badge key={index} variant="outline" className="bg-western-sand/10">
              {accomplice}
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No known accomplices</p>
      )}
    </div>
  );
}
