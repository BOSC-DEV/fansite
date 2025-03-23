
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Twitter, Globe } from "lucide-react";

interface SocialLinksFormProps {
  xLink: string;
  websiteLink: string;
  onXLinkChange: (link: string) => void;
  onWebsiteLinkChange: (link: string) => void;
}

export function SocialLinksForm({
  xLink,
  websiteLink,
  onXLinkChange,
  onWebsiteLinkChange,
}: SocialLinksFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="xLink" className="flex items-center gap-2">
          <Twitter size={16} className="text-muted-foreground" />
          X (Twitter) Profile
        </Label>
        <Input
          id="xLink"
          placeholder="https://x.com/username"
          value={xLink}
          onChange={(e) => onXLinkChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Your X (Twitter) profile URL</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="websiteLink" className="flex items-center gap-2">
          <Globe size={16} className="text-muted-foreground" />
          Website
        </Label>
        <Input
          id="websiteLink"
          placeholder="https://example.com"
          value={websiteLink}
          onChange={(e) => onWebsiteLinkChange(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">Your personal or business website</p>
      </div>
    </div>
  );
}
