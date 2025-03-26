
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { profileService } from '@/services/storage/profileService';

export interface ScammerInteractionButtonsProps {
  scammerId: string;
  likes: number;
  dislikes: number;
  views: number;
  comments?: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerInteractionButtons({
  scammerId,
  likes,
  dislikes,
  views,
  comments,
  isLiked,
  isDisliked,
  onLike,
  onDislike
}: ScammerInteractionButtonsProps) {
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const { isConnected, address, connectWallet } = useWallet();

  // Check if user has a profile
  useEffect(() => {
    if (address) {
      const checkProfile = async () => {
        try {
          const exists = await profileService.hasProfile(address);
          setHasProfile(exists);
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking if user has profile:", error);
          setProfileChecked(true);
        }
      };
      
      checkProfile();
    } else {
      setProfileChecked(false);
      setHasProfile(false);
    }
  }, [address]);

  const handleLike = async () => {
    if (isInteractionLocked) return;
    setIsInteractionLocked(true);
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to vote");
        await connectWallet();
        setIsInteractionLocked(false);
        return;
      }

      // Check if profile check has completed
      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setIsInteractionLocked(false);
        return;
      }
      
      // Check if user has profile
      if (!hasProfile) {
        toast.error("You need to create a profile before voting", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteractionLocked(false);
        return;
      }

      // Call the onLike callback to update parent component
      onLike();
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error("Failed to update vote");
    } finally {
      setIsInteractionLocked(false);
    }
  };

  const handleDislike = async () => {
    if (isInteractionLocked) return;
    setIsInteractionLocked(true);
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to vote");
        await connectWallet();
        setIsInteractionLocked(false);
        return;
      }

      // Check if profile check has completed
      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setIsInteractionLocked(false);
        return;
      }
      
      // Check if user has profile
      if (!hasProfile) {
        toast.error("You need to create a profile before voting", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteractionLocked(false);
        return;
      }

      // Call the onDislike callback to update parent component
      onDislike();
    } catch (error) {
      console.error("Error handling dislike:", error);
      toast.error("Failed to update vote");
    } finally {
      setIsInteractionLocked(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-2 ${isLiked ? 'bg-green-100 border-green-300 text-green-700' : ''}`}
        onClick={handleLike}
      >
        <ThumbsUp className="h-4 w-4" />
        <span>{likes || 0}</span>
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-2 ${isDisliked ? 'bg-red-100 border-red-300 text-red-700' : ''}`}
        onClick={handleDislike}
      >
        <ThumbsDown className="h-4 w-4" />
        <span>{dislikes || 0}</span>
      </Button>
    </div>
  );
}
