
import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ShareProfileButtonProps {
  username: string;
  walletAddress?: string;
}

export function ShareProfileButton({ username, walletAddress }: ShareProfileButtonProps) {
  const handleShare = async () => {
    try {
      // Determine the URL to share based on username or wallet address
      let shareUrl = '';
      
      if (username) {
        shareUrl = `${window.location.origin}/${username}`;
      } else if (walletAddress) {
        shareUrl = `${window.location.origin}/user/${walletAddress}`;
      } else {
        throw new Error('No username or wallet address provided');
      }
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareUrl);
      
      // Show success toast
      toast.success('Profile link copied to clipboard', {
        description: 'Share this profile with others'
      });
    } catch (error) {
      console.error('Failed to copy profile link:', error);
      toast.error('Failed to copy profile link');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="flex items-center gap-1 text-western-wood hover:bg-western-sand/20"
      title="Share profile"
    >
      <Share2 className="h-4 w-4" />
      <span>Share</span>
    </Button>
  );
}
