
import React from 'react';
import { IdentityTab } from './tabs/IdentityTab';
import { EvidenceTab } from './tabs/EvidenceTab';
import { NetworkTab } from './tabs/NetworkTab';
import { ResponseTab } from './tabs/ResponseTab';

interface ScammerContentProps {
  aliases?: string[];
  links?: string[];
  accomplices?: string[];
  officialResponse?: string;
  likes?: number;
  dislikes?: number;
  views?: number;
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
}

export function ScammerContent({ 
  aliases = [], 
  links = [], 
  accomplices = [], 
  officialResponse = "",
  likes = 0,
  dislikes = 0,
  views = 0,
  isLiked = false,
  isDisliked = false,
  onLike = () => {},
  onDislike = () => {}
}: ScammerContentProps) {
  return (
    <div className="w-full space-y-8">
      {/* Identity Section */}
      <IdentityTab aliases={aliases} />
      
      {/* Evidence Section */}
      <EvidenceTab links={links} />
      
      {/* Network Section */}
      <NetworkTab accomplices={accomplices} />
      
      {/* Response Section */}
      <ResponseTab officialResponse={officialResponse} />
    </div>
  );
}
