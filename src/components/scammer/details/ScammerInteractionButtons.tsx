
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";
import { supabase } from "@/lib/supabase";

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
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  
  // Check if user has a profile and previous interactions
  useEffect(() => {
    if (address) {
      const checkProfile = async () => {
        try {
          const exists = await profileService.hasProfile(address);
          setHasProfile(exists);
          setProfileChecked(true);
          
          // Check for previous DB interactions
          if (exists && scammerId) {
            try {
              const { data, error } = await supabase
                .from('user_scammer_interactions')
                .select('liked, disliked')
                .eq('user_id', address)
                .eq('scammer_id', scammerId)
                .maybeSingle();
              
              if (error) {
                console.error("Error checking interactions:", error);
              } else if (data) {
                // We found a previous interaction for this user and scammer
                console.log("Found interaction record:", data);
              }
            } catch (error) {
              console.error("Error checking interactions:", error);
            }
          }
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
  }, [address, scammerId]);
  
  // Update DB with user interaction
  const saveInteractionToDB = async (liked: boolean, disliked: boolean) => {
    if (!scammerId || !address) return;
    
    try {
      // Check if record exists
      const { data, error } = await supabase
        .from('user_scammer_interactions')
        .select('id')
        .eq('user_id', address)
        .eq('scammer_id', scammerId)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking interaction record:", error);
        return;
      }
      
      if (data) {
        // Update existing record
        await supabase
          .from('user_scammer_interactions')
          .update({ liked, disliked, last_updated: new Date() })
          .eq('id', data.id);
      } else {
        // Insert new record
        await supabase
          .from('user_scammer_interactions')
          .insert([
            { user_id: address, scammer_id: scammerId, liked, disliked }
          ]);
      }
    } catch (error) {
      console.error("Error saving interaction to DB:", error);
    }
  };
  
  const handleLike = async () => {
    if (isInteractionLocked) return;
    
    setIsInteractionLocked(true);
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to like");
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
      
      // Check if user has a profile once profile check is done
      if (!hasProfile) {
        toast.error("You need to create a profile before liking", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteractionLocked(false);
        return;
      }
      
      // Update DB for persistent storage
      await saveInteractionToDB(!isLiked, isDisliked ? false : isDisliked);
      
      // Proceed with like operation
      onLike();
      
      // Store result in local storage for backup
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: !isLiked, 
        disliked: isDisliked ? false : isDisliked 
      }));
    } catch (error) {
      console.error("Error handling like:", error);
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
        toast.error("You must be connected with a wallet to dislike");
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
      
      // Check if user has a profile once profile check is done
      if (!hasProfile) {
        toast.error("You need to create a profile before disliking", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteractionLocked(false);
        return;
      }
      
      // Update DB for persistent storage
      await saveInteractionToDB(isLiked ? false : isLiked, !isDisliked);
      
      // Proceed with dislike operation
      onDislike();
      
      // Store result in local storage for backup
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: isLiked ? false : isLiked, 
        disliked: !isDisliked 
      }));
    } catch (error) {
      console.error("Error handling dislike:", error);
    } finally {
      setIsInteractionLocked(false);
    }
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
