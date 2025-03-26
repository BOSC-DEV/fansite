
import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { InteractionButton } from './InteractionButton';

interface ShareButtonProps {
  scammerId: string;
}

export function ShareButton({ scammerId }: ShareButtonProps) {
  const shareScammer = () => {
    const shareUrl = `${window.location.origin}/scammer/${scammerId}`;
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("Link copied to clipboard", {
          description: "Share this scammer with others"
        });
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast.error("Failed to copy link");
      });
  };

  return (
    <InteractionButton
      icon={Share2}
      count={0}
      label="Share"
      showLabel={true}
      onClick={shareScammer}
      title="Share this scammer"
    />
  );
}
