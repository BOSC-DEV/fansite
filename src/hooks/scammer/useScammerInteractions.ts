
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { Scammer } from "@/lib/types";

/**
 * Hook to manage user interactions (likes/dislikes) with a scammer
 */
export function useScammerInteractions(scammer: Scammer | null) {
  const [interactions, setInteractions] = useState({
    isLiked: false,
    isDisliked: false,
  });

  // Check if user has already interacted when component mounts
  useEffect(() => {
    if (!scammer?.id) return;
    
    const checkPreviousInteraction = async () => {
      try {
        // Check database first
        const { data, error } = await supabase
          .from('user_scammer_interactions')
          .select('liked, disliked')
          .eq('user_id', localStorage.getItem('walletAddress') || '')
          .eq('scammer_id', scammer.id)
          .maybeSingle();
          
        if (error) {
          console.error("Error checking previous interaction:", error);
          return;
        }
        
        if (data) {
          console.log("Found previous interaction:", data);
          setInteractions({
            isLiked: !!data.liked,
            isDisliked: !!data.disliked,
          });
          return;
        }
        
        // Fallback to local storage
        const storedInteraction = localStorage.getItem(`scammer-interactions-${scammer.id}`);
        if (storedInteraction) {
          const { liked, disliked } = JSON.parse(storedInteraction);
          setInteractions({
            isLiked: liked,
            isDisliked: disliked,
          });
        }
      } catch (error) {
        console.error("Error checking previous interaction:", error);
      }
    };
    
    checkPreviousInteraction();
  }, [scammer]);

  return {
    isLiked: interactions.isLiked,
    isDisliked: interactions.isDisliked,
    setInteractions
  };
}
