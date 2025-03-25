
import React from "react";
import { ExternalLink, Twitter } from "lucide-react";

interface ProfileLinksProps {
  xLink: string;
  websiteLink: string;
  onXLinkChange?: (link: string) => void;
  onWebsiteLinkChange?: (link: string) => void;
}

export function ProfileLinks({ 
  xLink, 
  websiteLink, 
  onXLinkChange, 
  onWebsiteLinkChange 
}: ProfileLinksProps) {
  const isReadOnly = !onXLinkChange || !onWebsiteLinkChange;
  
  return (
    <div className="flex gap-3">
      {xLink && (
        <a 
          href={xLink.startsWith('http') ? xLink : `https://${xLink}`}
          target="_blank" 
          rel="noreferrer"
          className="text-western-wood hover:text-western-accent transition-colors"
        >
          <Twitter className="h-5 w-5" />
        </a>
      )}
      
      {websiteLink && (
        <a 
          href={websiteLink.startsWith('http') ? websiteLink : `https://${websiteLink}`}
          target="_blank" 
          rel="noreferrer"
          className="text-western-wood hover:text-western-accent transition-colors"
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      )}
    </div>
  );
}
