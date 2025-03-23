
import React from 'react';
import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EvidenceTabProps {
  links?: string[];
}

export function EvidenceTab({ links = [] }: EvidenceTabProps) {
  return (
    <Card className="border border-western-wood/20 bg-western-parchment/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-western-accent">Evidence Links</CardTitle>
      </CardHeader>
      <CardContent>
        {links && links.length > 0 ? (
          <div className="space-y-2">
            {links.map((link, index) => (
              <Button 
                key={index} 
                variant="outline" 
                className="w-full justify-start text-left overflow-hidden text-ellipsis bg-western-sand/10 hover:bg-western-sand/20"
                onClick={() => window.open(link, '_blank', 'noopener,noreferrer')}
              >
                <ExternalLink className="h-4 w-4 mr-2 flex-shrink-0" />
                <span className="truncate">{link}</span>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No evidence links provided</p>
        )}
      </CardContent>
    </Card>
  );
}
