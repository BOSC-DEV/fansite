
import { ScammerBaseService } from './scammerBaseService';
import { ScammerStats } from './scammerTypes';

/**
 * Service for handling scammer statistics operations
 */
export class ScammerStatsService extends ScammerBaseService {
  /**
   * Update scammer statistics
   */
  async updateScammerStats(scammerId: string, stats: ScammerStats): Promise<boolean> {
    try {
      console.log("Updating stats for scammer:", scammerId, stats);
      
      // Get the current scammer to ensure we have valid data
      const scammer = await this.getScammerRecord(scammerId);
        
      if (!scammer) {
        console.error("Error fetching scammer for stats update");
        return false;
      }
      
      // Create the update object with required name field
      const updatePayload = {
        id: scammerId,
        name: scammer.name, // Required field
        likes: stats.likes !== undefined ? stats.likes : scammer.likes,
        dislikes: stats.dislikes !== undefined ? stats.dislikes : scammer.dislikes,
        views: stats.views !== undefined ? stats.views : scammer.views
      };
      
      const { error } = await supabase
        .from('scammers')
        .upsert(updatePayload, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error("Error updating scammer stats:", error);
        return false;
      }
      
      console.log("Scammer stats updated successfully");
      return true;
    } catch (error) {
      console.error("Error in updateScammerStats:", error);
      return false;
    }
  }
  
  /**
   * Increment view count for a scammer
   */
  async incrementScammerViews(scammerId: string): Promise<boolean> {
    try {
      console.log("Incrementing views for scammer:", scammerId);
      
      const scammer = await this.getScammerRecord(scammerId);
        
      if (!scammer) {
        console.error("Error fetching scammer for view increment");
        return false;
      }
      
      const currentViews = scammer.views || 0;
      const newViews = currentViews + 1;
      
      return this.updateScammerRecord(scammerId, { views: newViews });
    } catch (error) {
      console.error("Error in incrementScammerViews:", error);
      return false;
    }
  }

  /**
   * Like a scammer (increment likes count)
   */
  async likeScammer(scammerId: string): Promise<boolean> {
    try {
      console.log("Liking scammer:", scammerId);
      
      const scammer = await this.getScammerRecord(scammerId);
        
      if (!scammer) {
        console.error("Error fetching scammer for like");
        return false;
      }
      
      const currentLikes = scammer.likes || 0;
      const newLikes = currentLikes + 1;
      
      return this.updateScammerRecord(scammerId, { likes: newLikes });
    } catch (error) {
      console.error("Error in likeScammer:", error);
      return false;
    }
  }

  /**
   * Dislike a scammer (increment dislikes count)
   */
  async dislikeScammer(scammerId: string): Promise<boolean> {
    try {
      console.log("Disliking scammer:", scammerId);
      
      const scammer = await this.getScammerRecord(scammerId);
        
      if (!scammer) {
        console.error("Error fetching scammer for dislike");
        return false;
      }
      
      const currentDislikes = scammer.dislikes || 0;
      const newDislikes = currentDislikes + 1;
      
      return this.updateScammerRecord(scammerId, { dislikes: newDislikes });
    } catch (error) {
      console.error("Error in dislikeScammer:", error);
      return false;
    }
  }
}

export const scammerStatsService = new ScammerStatsService();
