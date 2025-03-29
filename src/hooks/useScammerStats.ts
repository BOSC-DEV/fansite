
import { useState, useEffect } from 'react';
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { Scammer } from "@/lib/types";
import { useWallet } from '@/context/WalletContext';
import { supabase } from '@/lib/supabase';

export function useScammerStats(scammer: Scammer) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(scammer.likes || 0);
  const [dislikes, setDislikes] = useState(scammer.dislikes || 0);
  const [views, setViews] = useState(scammer.views || 0);
  const { address } = useWallet();
  
  // Check if user has already interacted when component mounts
  useEffect(() => {
    if (!address || !scammer.id) return;
    
    const checkPreviousInteraction = async () => {
      try {
        // Check database first
        const { data, error } = await supabase
          .from('user_scammer_interactions')
          .select('liked, disliked')
          .eq('user_id', address)
          .eq('scammer_id', scammer.id)
          .maybeSingle();
          
        if (error) {
          console.error("Error checking previous interaction:", error);
          return;
        }
        
        if (data) {
          console.log("Found previous interaction:", data);
          setIsLiked(!!data.liked);
          setIsDisliked(!!data.disliked);
          return;
        }
        
        // Fallback to local storage
        const storedInteraction = localStorage.getItem(`scammer-interactions-${scammer.id}`);
        if (storedInteraction) {
          const { liked, disliked } = JSON.parse(storedInteraction);
          setIsLiked(liked);
          setIsDisliked(disliked);
        }
      } catch (error) {
        console.error("Error checking previous interaction:", error);
      }
    };
    
    checkPreviousInteraction();
  }, [scammer.id, address]);

  const handleLike = async () => {
    if (!address) {
      toast.error("Please connect your wallet to interact");
      return;
    }
    
    const newLikedState = !isLiked;
    
    // Optimistically update UI state
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
      toast.info("Agreement removed");
    } else {
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(dislikes - 1);
      }
      setIsLiked(true);
      setLikes(likes + 1);
      toast.success("Agreed");
    }

    try {
      // Save to local storage as backup
      localStorage.setItem(`scammer-interactions-${scammer.id}`, JSON.stringify({
        liked: newLikedState,
        disliked: isDisliked ? false : isDisliked
      }));
      
      // Save to database for persistence
      if (address) {
        try {
          // Check if record exists
          const { data, error } = await supabase
            .from('user_scammer_interactions')
            .select('id')
            .eq('user_id', address)
            .eq('scammer_id', scammer.id)
            .maybeSingle();
          
          if (error) {
            console.error("Error checking interaction record:", error);
          } else if (data) {
            // Update existing record
            await supabase
              .from('user_scammer_interactions')
              .update({ 
                liked: newLikedState, 
                disliked: isDisliked ? false : isDisliked,
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
                  scammer_id: scammer.id, 
                  liked: newLikedState, 
                  disliked: isDisliked ? false : isDisliked 
                }
              ]);
          }
        } catch (dbError) {
          console.error("Error saving interaction to DB:", dbError);
        }
      }
      
      // Update in storage service
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes + 1,
        dislikes: isDisliked ? dislikes - 1 : dislikes,
      });
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Failed to update agreement");
      
      // Revert UI state if error
      setIsLiked(!newLikedState);
      setLikes(newLikedState ? likes - 1 : likes + 1);
      if (isDisliked && newLikedState) {
        setIsDisliked(true);
        setDislikes(dislikes + 1);
      }
    }
  };

  const handleDislike = async () => {
    if (!address) {
      toast.error("Please connect your wallet to interact");
      return;
    }
    
    const newDislikedState = !isDisliked;
    
    // Optimistically update UI
    if (isDisliked) {
      setIsDisliked(false);
      setDislikes(dislikes - 1);
      toast.info("Disagreement removed");
    } else {
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes - 1);
      }
      setIsDisliked(true);
      setDislikes(dislikes + 1);
      toast.success("Disagreed");
    }

    try {
      // Save to local storage as backup
      localStorage.setItem(`scammer-interactions-${scammer.id}`, JSON.stringify({
        liked: isLiked ? false : isLiked,
        disliked: newDislikedState
      }));
      
      // Save to database for persistence
      if (address) {
        try {
          // Check if record exists
          const { data, error } = await supabase
            .from('user_scammer_interactions')
            .select('id')
            .eq('user_id', address)
            .eq('scammer_id', scammer.id)
            .maybeSingle();
          
          if (error) {
            console.error("Error checking interaction record:", error);
          } else if (data) {
            // Update existing record
            await supabase
              .from('user_scammer_interactions')
              .update({ 
                liked: isLiked ? false : isLiked, 
                disliked: newDislikedState,
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
                  scammer_id: scammer.id, 
                  liked: isLiked ? false : isLiked, 
                  disliked: newDislikedState 
                }
              ]);
          }
        } catch (dbError) {
          console.error("Error saving interaction to DB:", dbError);
        }
      }
      
      // Update in storage service
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes,
        dislikes: isDisliked ? dislikes - 1 : dislikes + 1,
      });
    } catch (error) {
      console.error("Error updating dislikes:", error);
      toast.error("Failed to update disagreement");
      
      // Revert UI state if error
      setIsDisliked(!newDislikedState);
      setDislikes(newDislikedState ? dislikes - 1 : dislikes + 1);
      if (isLiked && newDislikedState) {
        setIsLiked(true);
        setLikes(likes + 1);
      }
    }
  };

  return {
    isLiked,
    isDisliked,
    likes,
    dislikes,
    views,
    handleLike,
    handleDislike
  };
}
