
import React from "react";
import { Twitter, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileLinksProps {
  xLink?: string;
  websiteLink?: string;
}

export function ProfileLinks({ xLink, websiteLink }: ProfileLinksProps) {
  if (!xLink && !websiteLink) return null;
  
  return (
    <div className="flex gap-2 mt-2">
      {xLink && (
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 p-0"
          asChild
        >
          <a href={xLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <Twitter size={20} className="text-muted-foreground" />
          </a>
        </Button>
      )}
      
      {websiteLink && (
        <Button
          variant="outline"
          size="sm"
          className="h-9 w-9 p-0"
          asChild
        >
          <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <Globe size={20} className="text-muted-foreground" />
          </a>
        </Button>
      )}
    </div>
  );
}

export default ProfileLinks;
