
import React from 'react';
import { LinkIcon } from "lucide-react";

interface EvidenceTabProps {
  links: string[];
}

export function EvidenceTab({ links = [] }: EvidenceTabProps) {
  console.log("EvidenceTab rendering with links:", links);
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Evidence Links</h3>
      {links && links.length > 0 ? (
        <ul className="space-y-1">
          {links.map((link, index) => (
            <li key={index} className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
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
      ) : (
        <p className="text-sm text-muted-foreground">No evidence links provided</p>
      )}
    </div>
  );
}
