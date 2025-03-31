
import { supabase } from "@/lib/supabase";
import { storageService } from "@/services/storage/localStorageService";
import { scammerService } from "@/services/storage/scammer/scammerService";

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
      console.log("Saving interaction to DB:", { scammerId, userId, liked, disliked });
      
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
        const { error: updateError } = await supabase
          .from('user_scammer_interactions')
          .update({ liked, disliked, last_updated: now })
          .eq('id', data.id);
          
        if (updateError) {
          console.error("Error updating interaction:", updateError);
        } else {
          console.log("Updated existing interaction record");
        }
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('user_scammer_interactions')
          .insert([
            { user_id: userId, scammer_id: scammerId, liked, disliked }
          ]);
          
        if (insertError) {
          console.error("Error inserting interaction:", insertError);
        } else {
          console.log("Created new interaction record");
        }
      }
    } catch (error) {
      console.error("Error saving interaction to DB:", error);
    }
  };
  
  // Update scammer stats in storage
  const updateScammerStats = async (scammerId: string, likes: number, dislikes: number) => {
    try {
      console.log("Updating scammer stats:", { scammerId, likes, dislikes });
      
      // Update through the scammer service
      await scammerService.updateScammerStats(scammerId, {
        likes,
        dislikes,
      });
      
      // Also update through local storage for redundancy
      await storageService.updateScammerStats(scammerId, {
        likes,
        dislikes,
      });
      
      console.log("Scammer stats updated successfully");
    } catch (error) {
      console.error("Error updating scammer stats:", error);
    }
  };
  
  return {
    saveInteractionToDB,
    updateScammerStats
  };
}
