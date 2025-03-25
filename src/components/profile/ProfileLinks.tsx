
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
    <div className="flex gap-2">
      {xLink && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 bg-western-sand/20 border-western-wood/20 hover:bg-western-sand/40"
          asChild
        >
          <a href={xLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <Twitter size={16} className="text-western-wood" />
          </a>
        </Button>
      )}
      
      {websiteLink && (
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 bg-western-sand/20 border-western-wood/20 hover:bg-western-sand/40"
          asChild
        >
          <a href={websiteLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
            <Globe size={16} className="text-western-wood" />
          </a>
        </Button>
      )}
    </div>
  );
}

export default ProfileLinks;
