
import React from 'react';
import { Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { InteractionButton } from './InteractionButton';
import { scammerStatsService } from '@/services/storage/scammer/scammerStatsService';

interface ShareButtonProps {
  scammerId: string;
  count?: number;
}

export function ShareButton({ scammerId, count = 0 }: ShareButtonProps) {
  const shareScammer = async () => {
    const shareUrl = `${window.location.origin}/scammer/${scammerId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard", {
        description: "Share this scammer with others"
      });
      
      // Increment the share count
      await scammerStatsService.incrementScammerShares(scammerId);
    } catch (error) {
      console.error("Failed to copy link:", error);
      toast.error("Failed to copy link");
    }
  };

  return (
    <InteractionButton
      icon={Share2}
      count={count}
      showLabel={true}
      label="Share"
      onClick={shareScammer}
      title="Share this scammer"
    />
  );
}
