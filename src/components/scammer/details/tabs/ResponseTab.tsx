
import React from 'react';
import { AlertCircle } from "lucide-react";

interface ResponseTabProps {
  officialResponse: string;
}

export function ResponseTab({ officialResponse }: ResponseTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Official Response</h3>
      {officialResponse ? (
        <div className="bg-western-accent/10 border border-western-accent/30 p-4 rounded-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-western-accent mt-1 flex-shrink-0" />
            <p className="text-sm">{officialResponse}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No official response provided</p>
      )}
    </div>
  );
}
