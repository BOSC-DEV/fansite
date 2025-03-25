
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Social Links</h3>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="xLink" className="flex items-center gap-1">
            <Twitter className="h-4 w-4" /> X / Twitter
          </Label>
          <div className="mt-1">
            <Input
              id="xLink"
              placeholder="https://x.com/yourusername"
              value={xLink}
              onChange={e => onXLinkChange?.(e.target.value)}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-muted cursor-not-allowed" : ""}
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="websiteLink" className="flex items-center gap-1">
            <ExternalLink className="h-4 w-4" /> Website
          </Label>
          <div className="mt-1">
            <Input
              id="websiteLink"
              placeholder="https://yourwebsite.com"
              value={websiteLink}
              onChange={e => onWebsiteLinkChange?.(e.target.value)}
              readOnly={isReadOnly}
              className={isReadOnly ? "bg-muted cursor-not-allowed" : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
