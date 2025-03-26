
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
      // Convert to DB column names
      const dbStats: Record<string, any> = {};
      if (stats.likes !== undefined) dbStats.likes = stats.likes;
      if (stats.dislikes !== undefined) dbStats.dislikes = stats.dislikes;
      if (stats.views !== undefined) dbStats.views = stats.views;
      if (stats.shares !== undefined) dbStats.shares = stats.shares;
      
      return await this.updateScammerRecord(scammerId, dbStats);
    } catch (error) {
      console.error("Error updating scammer stats:", error);
      return false;
    }
  }

  /**
   * Increment the view count for a scammer, only if the IP hasn't viewed it before
   */
  async incrementScammerViews(scammerId: string): Promise<boolean> {
    try {
      // Create an anonymous hash of the IP to protect privacy while tracking uniqueness
      const ipHash = await this.getAnonymousIpHash();
      
      // Check if this IP has already viewed this scammer
      const { data: existingView } = await supabase
        .from('scammer_views')
        .select('id')
        .eq('scammer_id', scammerId)
        .eq('ip_hash', ipHash)
        .maybeSingle();
      
      // If the IP has already viewed this scammer, don't increment the count
      if (existingView) {
        console.log("This IP has already viewed this scammer");
        return true; // Return true to indicate successful check, but no increment
      }
      
      // Record the new view
      const { error: insertError } = await supabase
        .from('scammer_views')
        .insert({
          scammer_id: scammerId,
          ip_hash: ipHash
        });
      
      if (insertError) {
        console.error("Error recording scammer view:", insertError);
        return false;
      }
      
      // Increment the view count
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
   * Generate an anonymous hash of the client's IP address
   */
  private async getAnonymousIpHash(): Promise<string> {
    try {
      // Call an edge function to get a hashed version of the client IP
      // This protects privacy while allowing us to track unique views
      const { data } = await supabase.functions.invoke('get-client-ip-hash');
      return data?.ipHash || 'unknown';
    } catch (error) {
      console.error("Error getting anonymous IP hash:", error);
      // Fallback to a random string if we can't get the IP hash
      return `fallback-${Math.random().toString(36).substring(2, 15)}`;
    }
  }
  
  /**
   * Increment the share count for a scammer
   */
  async incrementScammerShares(scammerId: string): Promise<boolean> {
    try {
      const scammer = await this.getScammerRecord(scammerId);
      
      if (!scammer) {
        console.error("Scammer not found for incrementing shares:", scammerId);
        return false;
      }
      
      // Get current shares count (default to 0 if not set)
      const currentShares = scammer.shares || 0;
      
      // Update the shares count
      const { error } = await supabase
        .from('scammers')
        .update({ shares: currentShares + 1 })
        .eq('id', scammerId);
      
      if (error) {
        console.error("Error incrementing scammer shares:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in incrementScammerShares:", error);
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
