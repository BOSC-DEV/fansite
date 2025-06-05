
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";

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
          <img 
            src="/lovable-uploads/b26a0095-6dd4-4425-9294-0b6ee067135a.png" 
            alt="X (Twitter)" 
            className="h-4 w-4" 
          />
        </Label>
        <Input
          id="xLink"
          placeholder="https://x.com/username"
          value={xLink}
          onChange={(e) => onXLinkChange(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="websiteLink" className="flex items-center gap-2">
          <Globe size={16} className="text-muted-foreground" />
        </Label>
        <Input
          id="websiteLink"
          placeholder="https://example.com"
          value={websiteLink}
          onChange={(e) => onWebsiteLinkChange(e.target.value)}
        />
      </div>
    </div>
  );
}
