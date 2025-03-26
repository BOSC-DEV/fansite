
import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";
import { toast } from "sonner";

interface AgreementRatioBarProps {
  likes: number;
  dislikes: number;
  onLike?: () => void;
  onDislike?: () => void;
}

export function AgreementRatioBar({ likes, dislikes, onLike, onDislike }: AgreementRatioBarProps) {
  // Calculate the percentage of likes vs. total reactions
  const total = likes + dislikes;
  const agreementPercentage = total > 0 ? Math.round((likes / total) * 100) : 50;
  
  const [isInteracting, setIsInteracting] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const { isConnected, address, connectWallet } = useWallet();
  
  // Check if user has a profile when address changes
  React.useEffect(() => {
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
  
  const handleInteraction = async (action: 'like' | 'dislike') => {
    if (isInteracting) return;
    setIsInteracting(true);
    
    try {
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to vote");
        await connectWallet();
        setIsInteracting(false);
        return;
      }

      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setIsInteracting(false);
        return;
      }
      
      if (!hasProfile) {
        toast.error("You need to create a profile before voting", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteracting(false);
        return;
      }

      if (action === 'like' && onLike) {
        onLike();
      } else if (action === 'dislike' && onDislike) {
        onDislike();
      }
    } catch (error) {
      console.error(`Error handling ${action}:`, error);
      toast.error(`Failed to update vote`);
    } finally {
      setIsInteracting(false);
    }
  };
  
  return (
    <div className="relative bg-western-parchment/50 border border-western-wood/20 rounded-md p-4 mb-6">
      {/* Entire container divided into two clickable halves */}
      <div className="absolute inset-0 flex">
        <div 
          className="w-1/2 cursor-pointer rounded-l-md"
          onClick={() => handleInteraction('like')}
        ></div>
        <div 
          className="w-1/2 cursor-pointer rounded-r-md"
          onClick={() => handleInteraction('dislike')}
        ></div>
      </div>
      
      {/* Actual visible content (sits on top of clickable areas) */}
      <div className="relative z-10 pointer-events-none">
        {/* Header with Like/Dislike counts */}
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center">
            <ThumbsUp className="h-4 w-4 text-green-600 mr-1" />
            <span className="text-sm font-medium text-green-600">Agree ({likes})</span>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-red-600">Disagree ({dislikes})</span>
            <ThumbsDown className="h-4 w-4 text-red-600 ml-1" />
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="pt-1">
          <Progress 
            value={agreementPercentage} 
            className="h-2 bg-red-200"
            indicatorClassName="bg-green-500"
          />
        </div>
        
        {/* Percentage text */}
        <div className="mt-1 text-center">
          <span className="text-xs text-western-wood/70">
            {total === 0 
              ? "No votes yet" 
              : `${agreementPercentage}% of community members agree`}
          </span>
        </div>
      </div>
      
      {/* Visual hover indicators */}
      <div className="absolute inset-0 flex opacity-0 hover:opacity-10 transition-opacity">
        <div className="w-1/2 bg-green-600 rounded-l-md"></div>
        <div className="w-1/2 bg-red-600 rounded-r-md"></div>
      </div>
    </div>
  );
}
