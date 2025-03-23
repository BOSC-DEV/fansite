
import React from 'react';
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ResponseTabProps {
  officialResponse: string;
}

export function ResponseTab({ officialResponse }: ResponseTabProps) {
  return (
    <Card className="border border-western-wood/20 bg-western-parchment/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-western-accent">Official Response</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
