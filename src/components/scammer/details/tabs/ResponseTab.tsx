
import React from 'react';
import { AlertCircle } from "lucide-react";

interface ResponseTabProps {
  officialResponse: string;
}

export function ResponseTab({ officialResponse }: ResponseTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-western font-semibold text-western-accent">Official Response</h3>
      {officialResponse ? (
        <div className="bg-western-parchment border border-western-wood/30 p-4 rounded-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-western-accent mt-1 flex-shrink-0" />
            <p className="text-sm font-western text-western-wood">{officialResponse}</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-western-wood/70 font-western">No official response provided</p>
      )}
    </div>
  );
}
