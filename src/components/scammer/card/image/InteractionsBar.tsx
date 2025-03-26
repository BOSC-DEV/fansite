
import { useState, useEffect } from "react";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare, Share2 } from "lucide-react";
import { toast } from "sonner";
import { InteractionButton } from "./InteractionButton";
import { storageService } from "@/services/storage/localStorageService";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";
import { supabase } from "@/lib/supabase";

interface InteractionsBarProps {
  scammerId?: string;
  likes: number;
  dislikes: number;
  views: number;
  comments: number;
  onScrollToComments?: () => void;
}

export function InteractionsBar({
  scammerId,
  likes,
  dislikes,
  views,
  comments,
  onScrollToComments
}: InteractionsBarProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likes);
  const [localDislikes, setLocalDislikes] = useState(dislikes);
  const { isConnected, address, connectWallet } = useWallet();
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  
  // Check for previous interactions from database
  useEffect(() => {
    if (scammerId && address && isConnected) {
      const checkInteractions = async () => {
        try {
          // Check user_scammer_interactions table for this user and scammer
          const { data, error } = await supabase
            .from('user_scammer_interactions')
            .select('liked, disliked')
            .eq('user_id', address)
            .eq('scammer_id', scammerId)
            .maybeSingle();
          
          if (error) {
            console.error("Error checking interactions:", error);
            return;
          }
          
          if (data) {
            console.log("Found interaction record:", data);
            setIsLiked(data.liked || false);
            setIsDisliked(data.disliked || false);
          } else {
            // Fallback to local storage if no DB record
            const userInteractions = localStorage.getItem(`scammer-interactions-${scammerId}`);
            if (userInteractions) {
              const { liked, disliked } = JSON.parse(userInteractions);
              setIsLiked(liked);
              setIsDisliked(disliked);
            }
          }
        } catch (error) {
          console.error("Error checking interactions:", error);
        }
      };
      
      checkInteractions();
    }
  }, [scammerId, address, isConnected]);
  
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
  
  // Update local likes/dislikes when props change
  useEffect(() => {
    setLocalLikes(likes);
    setLocalDislikes(dislikes);
  }, [likes, dislikes]);

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

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId || isInteractionLocked) return;
    
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

      let newLikes = localLikes;
      let newDislikes = localDislikes;

      if (isLiked) {
        // Unlike
        newLikes = localLikes - 1;
        setIsLiked(false);
        toast.info("Like removed");
      } else {
        // Like
        newLikes = localLikes + 1;
        
        if (isDisliked) {
          // Remove dislike if present
          newDislikes = localDislikes - 1;
          setIsDisliked(false);
        }
        
        setIsLiked(true);
        toast.success("Liked scammer");
      }
      
      // Update local state
      setLocalLikes(newLikes);
      setLocalDislikes(newDislikes);

      // Store interaction both locally and in DB
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: !isLiked, 
        disliked: isDisliked ? false : isDisliked 
      }));
      
      // Update in database
      await saveInteractionToDB(!isLiked, isDisliked ? false : isDisliked);

      // Update in storage service
      try {
        storageService.updateScammerStats(scammerId, {
          likes: newLikes,
          dislikes: newDislikes,
        });
      } catch (error) {
        console.error("Error updating likes:", error);
      }
    } catch (error) {
      console.error("Error handling like:", error);
    } finally {
      setIsInteractionLocked(false);
    }
  };

  const handleDislike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId || isInteractionLocked) return;
    
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

      let newLikes = localLikes;
      let newDislikes = localDislikes;

      if (isDisliked) {
        // Remove dislike
        newDislikes = localDislikes - 1;
        setIsDisliked(false);
        toast.info("Dislike removed");
      } else {
        // Dislike
        newDislikes = localDislikes + 1;
        
        if (isLiked) {
          // Remove like if present
          newLikes = localLikes - 1;
          setIsLiked(false);
        }
        
        setIsDisliked(true);
        toast.success("Disliked scammer");
      }
      
      // Update local state
      setLocalLikes(newLikes);
      setLocalDislikes(newDislikes);

      // Store interaction both locally and in DB
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: isLiked ? false : isLiked, 
        disliked: !isDisliked 
      }));
      
      // Update in database
      await saveInteractionToDB(isLiked ? false : isLiked, !isDisliked);

      // Update in storage service
      try {
        storageService.updateScammerStats(scammerId, {
          likes: newLikes,
          dislikes: newDislikes,
        });
      } catch (error) {
        console.error("Error updating dislikes:", error);
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
    } finally {
      setIsInteractionLocked(false);
    }
  };

  const scrollToComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onScrollToComments) {
      onScrollToComments();
    } else if (scammerId) {
      // If we're not on a detail page, navigate to the detail page with a hash
      window.location.href = `/scammer/${scammerId}#comments`;
    }
  };

  const copyShareLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!scammerId) return;
    
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
    <div className="absolute top-0 right-0 p-2 flex space-x-2">
      <InteractionButton 
        icon={ThumbsUp} 
        count={localLikes} 
        onClick={handleLike} 
        active={isLiked}
        activeColor="bg-green-600/80"
      />
      
      <InteractionButton 
        icon={ThumbsDown} 
        count={localDislikes} 
        onClick={handleDislike} 
        active={isDisliked}
        activeColor="bg-red-600/80"
      />
      
      <InteractionButton 
        icon={Eye} 
        count={views} 
      />
      
      <InteractionButton 
        icon={MessageSquare} 
        count={comments} 
        onClick={scrollToComments}
        title="View comments"
      />
      
      {scammerId && (
        <InteractionButton 
          icon={Share2} 
          count={0} 
          onClick={copyShareLink}
          title="Copy share link"
          className="[&>span]:hidden"
        />
      )}
    </div>
  );
}
