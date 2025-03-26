
import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { profileService } from '@/services/storage/profileService';

interface ScammerInteractionButtonsProps {
  scammerId: string;
  likes: number;
  dislikes: number;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerInteractionButtons({
  scammerId,
  likes,
  dislikes,
  onLike,
  onDislike
}: ScammerInteractionButtonsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const { isConnected, address, connectWallet } = useWallet();

  // Check for previous interactions
  useEffect(() => {
    if (scammerId && address) {
      const checkPreviousInteraction = async () => {
        try {
          const { data, error } = await supabase
            .from('user_scammer_interactions')
            .select('liked, disliked')
            .eq('user_id', address)
            .eq('scammer_id', scammerId)
            .maybeSingle();
            
          if (error) {
            console.error("Error checking previous interaction:", error);
            return;
          }
          
          if (data) {
            setIsLiked(!!data.liked);
            setIsDisliked(!!data.disliked);
          } else {
            // Check localStorage as fallback
            const storedInteraction = localStorage.getItem(`scammer-interactions-${scammerId}`);
            if (storedInteraction) {
              const { liked, disliked } = JSON.parse(storedInteraction);
              setIsLiked(liked);
              setIsDisliked(disliked);
            }
          }
        } catch (error) {
          console.error("Error checking previous interaction:", error);
        }
      };
      
      checkPreviousInteraction();
    }
  }, [scammerId, address]);

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

  // Save interaction to the database
  const saveInteractionToDB = async (liked: boolean, disliked: boolean) => {
    if (!address || !scammerId) return;
    
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
          .update({ 
            liked, 
            disliked, 
            last_updated: new Date().toISOString() 
          })
          .eq('id', data.id);
      } else {
        // Insert new record
        await supabase
          .from('user_scammer_interactions')
          .insert([
            { 
              user_id: address, 
              scammer_id: scammerId, 
              liked, 
              disliked 
            }
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

      // Toggle like state
      const newLikedState = !isLiked;
      
      // If disliked, remove dislike
      let newDislikedState = isDisliked;
      if (newLikedState && isDisliked) {
        newDislikedState = false;
      }
      
      // Update local state
      setIsLiked(newLikedState);
      setIsDisliked(newDislikedState);
      
      // Save to local storage
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({
        liked: newLikedState,
        disliked: newDislikedState
      }));
      
      // Save to database
      await saveInteractionToDB(newLikedState, newDislikedState);
      
      // Call the onLike callback to update parent component
      onLike();
      
      // Show toast
      if (newLikedState) {
        toast.success("Agreed with this scammer report");
      } else {
        toast.info("Removed agreement");
      }
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

      // Toggle dislike state
      const newDislikedState = !isDisliked;
      
      // If liked, remove like
      let newLikedState = isLiked;
      if (newDislikedState && isLiked) {
        newLikedState = false;
      }
      
      // Update local state
      setIsLiked(newLikedState);
      setIsDisliked(newDislikedState);
      
      // Save to local storage
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({
        liked: newLikedState,
        disliked: newDislikedState
      }));
      
      // Save to database
      await saveInteractionToDB(newLikedState, newDislikedState);
      
      // Call the onDislike callback to update parent component
      onDislike();
      
      // Show toast
      if (newDislikedState) {
        toast.success("Disagreed with this scammer report");
      } else {
        toast.info("Removed disagreement");
      }
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
