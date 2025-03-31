
import { ScammerStats } from './scammerTypes';
import { ScammerBaseService } from './scammerBaseService';
import { supabase } from '@/lib/supabase';

/**
 * Service for managing scammer statistics
 */
export class ScammerStatsService extends ScammerBaseService {
  /**
   * Update statistics for a scammer
   */
  async updateScammerStats(scammerId: string, stats: ScammerStats): Promise<boolean> {
    try {
      return await this.updateScammerRecord(scammerId, stats);
    } catch (error) {
      console.error("Error updating scammer stats:", error);
      return false;
    }
  }

  /**
   * Increment the view count for a scammer
   */
  async incrementScammerViews(scammerId: string): Promise<boolean> {
    try {
      const scammer = await this.getScammerRecord(scammerId);
      
      if (!scammer) {
        console.error("Scammer not found for incrementing views:", scammerId);
        return false;
      }
      
      const currentViews = scammer.views || 0;
      
      const { error } = await supabase
        .from('scammers')
        .update({ views: currentViews + 1 })
        .eq('id', scammerId);
      
      if (error) {
        console.error("Error incrementing scammer views:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in incrementScammerViews:", error);
      return false;
    }
  }
  
  /**
   * Like a scammer
   */
  async likeScammer(scammerId: string): Promise<boolean> {
    try {
      const scammer = await this.getScammerRecord(scammerId);
      
      if (!scammer) {
        console.error("Scammer not found for liking:", scammerId);
        return false;
      }
      
      const currentLikes = scammer.likes || 0;
      
      return await this.updateScammerStats(scammerId, { likes: currentLikes + 1 });
    } catch (error) {
      console.error("Error in likeScammer:", error);
      return false;
    }
  }
  
  /**
   * Dislike a scammer
   */
  async dislikeScammer(scammerId: string): Promise<boolean> {
    try {
      const scammer = await this.getScammerRecord(scammerId);
      
      if (!scammer) {
        console.error("Scammer not found for disliking:", scammerId);
        return false;
      }
      
      const currentDislikes = scammer.dislikes || 0;
      
      return await this.updateScammerStats(scammerId, { dislikes: currentDislikes + 1 });
    } catch (error) {
      console.error("Error in dislikeScammer:", error);
      return false;
    }
  }
}

// Export a singleton instance
export const scammerStatsService = new ScammerStatsService();
