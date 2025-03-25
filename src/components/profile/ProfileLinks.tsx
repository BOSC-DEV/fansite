
import React from "react";
import { Twitter, Globe, Copy } from "lucide-react";
import { toast } from "sonner";

interface ProfileLinksProps {
  xLink?: string;
  websiteLink?: string;
  walletAddress?: string;
}

export function ProfileLinks({ xLink, websiteLink, walletAddress }: ProfileLinksProps) {
  const copyToClipboard = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast.success("Wallet address copied to clipboard");
  };

  if (!xLink && !websiteLink && !walletAddress) return null;

  return (
    <div className="flex flex-wrap gap-4 items-center mt-2">
      {xLink && (
        <a 
          href={xLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-western-sand hover:text-western-accent transition-colors"
        >
          <Twitter size={18} />
          <span className="text-sm">X / Twitter</span>
        </a>
      )}
      
      {websiteLink && (
        <a 
          href={websiteLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-western-sand hover:text-western-accent transition-colors"
        >
          <Globe size={18} />
          <span className="text-sm">Website</span>
        </a>
      )}
      
      {walletAddress && (
        <button
          onClick={() => copyToClipboard(walletAddress)}
          className="flex items-center gap-2 text-western-sand hover:text-western-accent transition-colors"
          aria-label="Copy wallet address"
        >
          <Copy size={18} />
          <span className="text-sm">Copy Address</span>
        </button>
      )}
    </div>
  );
}
