
import React from "react";
import { Twitter, Globe, Copy } from "lucide-react";
import { toast } from "sonner";

interface ProfileLinksProps {
  xLink?: string;
  websiteLink?: string;
  walletAddress?: string;
  onXLinkChange?: (link: string) => void;
  onWebsiteLinkChange?: (link: string) => void;
}

export function ProfileLinks({ 
  xLink, 
  websiteLink, 
  walletAddress,
  onXLinkChange,
  onWebsiteLinkChange
}: ProfileLinksProps) {
  const isEditMode = !!onXLinkChange && !!onWebsiteLinkChange;
  
  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Wallet address copied to clipboard");
  };

  if (!isEditMode && !xLink && !websiteLink && !walletAddress) return null;

  if (isEditMode) {
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-medium">Social Links</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-2">
            <Twitter size={18} className="text-western-wood" />
            <input
              type="text"
              placeholder="X (Twitter) URL"
              value={xLink || ''}
              onChange={(e) => onXLinkChange(e.target.value)}
              className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-western-wood" />
            <input
              type="text"
              placeholder="Website URL"
              value={websiteLink || ''}
              onChange={(e) => onWebsiteLinkChange(e.target.value)}
              className="flex-1 bg-background border border-input rounded-md px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 mt-2">
      {xLink && (
        <a 
          href={xLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-western-sand/20 text-western-wood hover:bg-western-sand/40 hover:text-western-accent transition-colors"
          title="X / Twitter"
        >
          <Twitter size={16} />
        </a>
      )}
      
      {websiteLink && (
        <a 
          href={websiteLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-western-sand/20 text-western-wood hover:bg-western-sand/40 hover:text-western-accent transition-colors"
          title="Website"
        >
          <Globe size={16} />
        </a>
      )}
      
      {walletAddress && (
        <button
          onClick={() => copyToClipboard(walletAddress)}
          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-western-sand/20 text-western-wood hover:bg-western-sand/40 hover:text-western-accent transition-colors"
          aria-label="Copy wallet address"
          title="Copy wallet address"
        >
          <Copy size={16} />
        </button>
      )}
    </div>
  );
}
