
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";

interface ScammerInteractionButtonsProps {
  likes: number;
  dislikes: number;
  views: number;
  comments?: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  scammerId: string;
}

export function ScammerInteractionButtons({ 
  likes, 
  dislikes, 
  views, 
  comments = 0,
  isLiked, 
  isDisliked,
  onLike,
  onDislike,
  scammerId
}: ScammerInteractionButtonsProps) {
  const { isConnected, address, connectWallet } = useWallet();
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  
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
    }
  }, [address]);
  
  const handleLike = async () => {
    // Check if user is connected
    if (!isConnected || !address) {
      toast.error("You must be connected with a wallet to like");
      connectWallet();
      return;
    }
    
    // Check if profile check has completed
    if (!profileChecked) {
      toast.info("Please wait while we check your profile");
      return;
    }
    
    // Check if user has a profile once profile check is done
    if (!hasProfile) {
      toast.error("You need to create a profile before liking", {
        description: "Go to your profile page to create one",
        action: {
          label: "Create Profile",
          onClick: () => window.location.href = "/profile"
        }
      });
      return;
    }
    
    // Proceed with like operation
    onLike();
  };
  
  const handleDislike = async () => {
    // Check if user is connected
    if (!isConnected || !address) {
      toast.error("You must be connected with a wallet to dislike");
      connectWallet();
      return;
    }
    
    // Check if profile check has completed
    if (!profileChecked) {
      toast.info("Please wait while we check your profile");
      return;
    }
    
    // Check if user has a profile once profile check is done
    if (!hasProfile) {
      toast.error("You need to create a profile before disliking", {
        description: "Go to your profile page to create one",
        action: {
          label: "Create Profile",
          onClick: () => window.location.href = "/profile"
        }
      });
      return;
    }
    
    // Proceed with dislike operation
    onDislike();
  };

  const scrollToComments = () => {
    const commentsSection = document.querySelector('.comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyShareLink = () => {
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
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-green-400/80' : 'text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30'}`}
          onClick={handleLike}
        >
          <ThumbsUp className="h-5 w-5" />
        </Button>
        <span className="text-sm ml-1 text-western-wood/70">{likes}</span>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          className={`h-8 w-8 rounded-full p-0 ${isDisliked ? 'text-red-400/80' : 'text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30'}`}
          onClick={handleDislike}
        >
          <ThumbsDown className="h-5 w-5" />
        </Button>
        <span className="text-sm ml-1 text-western-wood/70">{dislikes}</span>
      </div>
      
      <div className="flex items-center">
        <div className="flex justify-center items-center h-8 w-8">
          <Eye className="h-5 w-5 text-western-wood/60" />
        </div>
        <span className="text-sm ml-1 text-western-wood/70">{views}</span>
      </div>
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30"
          onClick={scrollToComments}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <span className="text-sm ml-1 text-western-wood/70">{comments}</span>
      </div>
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30"
          onClick={copyShareLink}
          title="Copy share link"
        >
          <Share2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
