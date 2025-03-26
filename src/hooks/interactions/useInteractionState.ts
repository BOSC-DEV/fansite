
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useWallet } from "@/context/WalletContext";

interface UseInteractionStateProps {
  scammerId?: string;
  initialLikes: number;
  initialDislikes: number;
}

/**
 * Hook to manage interaction state (likes/dislikes)
 */
export function useInteractionState({ 
  scammerId, 
  initialLikes, 
  initialDislikes 
}: UseInteractionStateProps) {
  const [state, setState] = useState({
    isLiked: false,
    isDisliked: false,
    localLikes: initialLikes,
    localDislikes: initialDislikes,
    isInteractionLocked: false
  });
  
  const { isConnected, address } = useWallet();
  
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

  return { 
    state, 
    setState
  };
}
