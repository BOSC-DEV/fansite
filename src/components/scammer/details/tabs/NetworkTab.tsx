
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NetworkTabProps {
  accomplices?: string[];
}

export function NetworkTab({ accomplices = [] }: NetworkTabProps) {
  return (
    <Card className="border border-western-wood/20 bg-western-parchment/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-western-accent">Known Accomplices</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
