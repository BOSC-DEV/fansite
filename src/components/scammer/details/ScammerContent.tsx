
import React from 'react';
import { IdentityTab } from './tabs/IdentityTab';
import { NetworkTab } from './tabs/NetworkTab';
import { EvidenceTab } from './tabs/EvidenceTab';
import { Separator } from "@/components/ui/separator";

interface ScammerContentProps {
  aliases: string[];
  accomplices: string[];
  links: string[];
  officialResponse: string;
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerContent({
  aliases = [],
  accomplices = [],
  links = [],
  officialResponse = "",
  likes,
  dislikes,
  views,
  isLiked,
  isDisliked,
  onLike,
  onDislike
}: ScammerContentProps) {
  return (
    <div className="space-y-8">
      <IdentityTab aliases={aliases} />
      
      <Separator className="my-4 bg-western-wood/20" />
      
      <NetworkTab accomplices={accomplices} />
      
      <Separator className="my-4 bg-western-wood/20" />
      
      <EvidenceTab links={links} />
      
      <Separator className="my-4 bg-western-wood/20" />
      
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Official Response</h3>
        {officialResponse ? (
          <div className="bg-western-parchment/40 p-4 rounded-md border border-western-wood/20">
            <p className="text-sm text-western-wood italic whitespace-pre-line">{officialResponse}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No official response provided</p>
        )}
      </div>
    </div>
  );
}
