
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface IdentityTabProps {
  aliases?: string[];
}

export function IdentityTab({ aliases = [] }: IdentityTabProps) {
  return (
    <Card className="border border-western-wood/20 bg-western-parchment/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-western-accent">Known Aliases</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
