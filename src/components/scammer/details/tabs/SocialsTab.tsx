
import React from 'react';
import { ExternalLink, LinkIcon, Twitter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SocialsTabProps {
  links: string[];
}

export function SocialsTab({ links }: SocialsTabProps) {
  // Helper function to determine if a link is a Twitter/X link
  const isTwitterLink = (link: string) => {
    return link.includes('twitter.com') || link.includes('x.com');
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Links</h3>
      {links && links.length > 0 ? (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-3">
            {links.map((link, index) => (
              <a 
                key={index}
                href={link.startsWith('http') ? link : `https://${link}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-western-sand/20 text-western-wood hover:bg-western-sand/40 transition-colors rounded-md text-sm"
              >
                {isTwitterLink(link) ? (
                  <Twitter className="h-3.5 w-3.5" />
                ) : (
                  <LinkIcon className="h-3.5 w-3.5" />
                )}
                <span className="truncate max-w-[200px]">
                  {link.replace(/https?:\/\/(www\.)?/, '')}
                </span>
                <ExternalLink className="h-3 w-3 opacity-60" />
              </a>
            ))}
          </div>
          
          <ul className="space-y-1 border-t border-western-wood/20 pt-4 mt-4">
            {links.map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                {isTwitterLink(link) ? (
                  <Twitter className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <LinkIcon className="h-4 w-4 text-muted-foreground" />
                )}
                <a 
                  href={link.startsWith('http') ? link : `https://${link}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm hover:underline truncate max-w-[300px]"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-sm text-muted-foreground">No links provided</p>
          <Badge variant="outline" className="mt-2">No links available</Badge>
        </div>
      )}
    </div>
  );
}
