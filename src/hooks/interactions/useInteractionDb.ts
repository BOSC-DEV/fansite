
import { supabase } from "@/lib/supabase";
import { storageService } from "@/services/storage/localStorageService";

/**
 * Hook to manage database interactions for likes/dislikes
 */
export function useInteractionDb() {
  // Save interaction to database
  const saveInteractionToDB = async (
    scammerId: string, 
    userId: string, 
    liked: boolean, 
    disliked: boolean
  ) => {
    if (!scammerId || !userId) return;
    
    try {
      // Check if record exists
      const { data, error } = await supabase
        .from('user_scammer_interactions')
        .select('id')
        .eq('user_id', userId)
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
            { user_id: userId, scammer_id: scammerId, liked, disliked }
          ]);
      }
    } catch (error) {
      console.error("Error saving interaction to DB:", error);
    }
  };
  
  // Update scammer stats in storage
  const updateScammerStats = async (scammerId: string, likes: number, dislikes: number) => {
    try {
      await storageService.updateScammerStats(scammerId, {
        likes: likes,
        dislikes: dislikes,
      });
    } catch (error) {
      console.error("Error updating scammer stats:", error);
    }
  };
  
  return {
    saveInteractionToDB,
    updateScammerStats
  };
}
