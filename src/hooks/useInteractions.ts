
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";
import { storageService } from "@/services/storage/localStorageService";

interface InteractionState {
  isLiked: boolean;
  isDisliked: boolean;
  localLikes: number;
  localDislikes: number;
  profileChecked: boolean;
  hasProfile: boolean;
  isInteractionLocked: boolean;
}

interface UseInteractionsProps {
  scammerId?: string;
  initialLikes: number;
  initialDislikes: number;
}

export function useInteractions({ 
  scammerId, 
  initialLikes, 
  initialDislikes 
}: UseInteractionsProps) {
  const [state, setState] = useState<InteractionState>({
    isLiked: false,
    isDisliked: false,
    localLikes: initialLikes,
    localDislikes: initialDislikes,
    profileChecked: false,
    hasProfile: false,
    isInteractionLocked: false
  });
  
  const { isConnected, address, connectWallet } = useWallet();
  
  // Update local likes/dislikes when props change
  useEffect(() => {
    setState(prev => ({
      ...prev,
      localLikes: initialLikes,
      localDislikes: initialDislikes
    }));
  }, [initialLikes, initialDislikes]);
  
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
            setState(prev => ({
              ...prev,
              isLiked: data.liked || false,
              isDisliked: data.disliked || false
            }));
          } else {
            // Fallback to local storage if no DB record
            const userInteractions = localStorage.getItem(`scammer-interactions-${scammerId}`);
            if (userInteractions) {
              const { liked, disliked } = JSON.parse(userInteractions);
              setState(prev => ({
                ...prev,
                isLiked: liked,
                isDisliked: disliked
              }));
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
          setState(prev => ({
            ...prev,
            hasProfile: exists,
            profileChecked: true
          }));
        } catch (error) {
          console.error("Error checking if user has profile:", error);
          setState(prev => ({
            ...prev,
            profileChecked: true
          }));
        }
      };
      
      checkProfile();
    } else {
      setState(prev => ({
        ...prev,
        profileChecked: false,
        hasProfile: false
      }));
    }
  }, [address]);
  
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
      
      const now = new Date().toISOString();
      
      if (data) {
        // Update existing record
        await supabase
          .from('user_scammer_interactions')
          .update({ liked, disliked, last_updated: now })
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
  
  // Handle like functionality
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId || state.isInteractionLocked) return;
    
    setState(prev => ({ ...prev, isInteractionLocked: true }));
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to like");
        await connectWallet();
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      // Check if profile check has completed
      if (!state.profileChecked) {
        toast.info("Please wait while we check your profile");
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }
      
      // Check if user has a profile once profile check is done
      if (!state.hasProfile) {
        toast.error("You need to create a profile before liking", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      let newLikes = state.localLikes;
      let newDislikes = state.localDislikes;
      let newIsLiked = state.isLiked;
      let newIsDisliked = state.isDisliked;

      if (state.isLiked) {
        // Unlike
        newLikes = state.localLikes - 1;
        newIsLiked = false;
        toast.info("Like removed");
      } else {
        // Like
        newLikes = state.localLikes + 1;
        newIsLiked = true;
        
        if (state.isDisliked) {
          // Remove dislike if present
          newDislikes = state.localDislikes - 1;
          newIsDisliked = false;
        }
        
        toast.success("Liked scammer");
      }
      
      // Update local state
      setState(prev => ({
        ...prev,
        localLikes: newLikes,
        localDislikes: newDislikes,
        isLiked: newIsLiked,
        isDisliked: newIsDisliked
      }));

      // Store interaction both locally and in DB
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: newIsLiked, 
        disliked: newIsDisliked 
      }));
      
      // Update in database
      await saveInteractionToDB(newIsLiked, newIsDisliked);

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
      setState(prev => ({ ...prev, isInteractionLocked: false }));
    }
  };
  
  // Handle dislike functionality
  const handleDislike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId || state.isInteractionLocked) return;
    
    setState(prev => ({ ...prev, isInteractionLocked: true }));
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to dislike");
        await connectWallet();
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      // Check if profile check has completed
      if (!state.profileChecked) {
        toast.info("Please wait while we check your profile");
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }
      
      // Check if user has a profile once profile check is done
      if (!state.hasProfile) {
        toast.error("You need to create a profile before disliking", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      let newLikes = state.localLikes;
      let newDislikes = state.localDislikes;
      let newIsLiked = state.isLiked;
      let newIsDisliked = state.isDisliked;

      if (state.isDisliked) {
        // Remove dislike
        newDislikes = state.localDislikes - 1;
        newIsDisliked = false;
        toast.info("Dislike removed");
      } else {
        // Dislike
        newDislikes = state.localDislikes + 1;
        newIsDisliked = true;
        
        if (state.isLiked) {
          // Remove like if present
          newLikes = state.localLikes - 1;
          newIsLiked = false;
        }
        
        toast.success("Disliked scammer");
      }
      
      // Update local state
      setState(prev => ({
        ...prev,
        localLikes: newLikes,
        localDislikes: newDislikes,
        isLiked: newIsLiked,
        isDisliked: newIsDisliked
      }));

      // Store interaction both locally and in DB
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: newIsLiked, 
        disliked: newIsDisliked 
      }));
      
      // Update in database
      await saveInteractionToDB(newIsLiked, newIsDisliked);

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
      setState(prev => ({ ...prev, isInteractionLocked: false }));
    }
  };
  
  return {
    isLiked: state.isLiked,
    isDisliked: state.isDisliked,
    localLikes: state.localLikes,
    localDislikes: state.localDislikes,
    handleLike,
    handleDislike
  };
}
