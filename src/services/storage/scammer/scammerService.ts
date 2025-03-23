
import { supabase } from '@/lib/supabase';
import { ScammerListing, ScammerStats, ScammerDbRecord, UserScammerInteraction, ScammerView } from './scammerTypes';
import { ScammerDataProcessor } from './scammerDataProcessor';
import { Json } from '@/integrations/supabase/types';

class ScammerService {
  /**
   * Save a scammer to Supabase
   */
  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    try {
      console.log("Saving scammer to Supabase:", scammer.name);
      
      // Create database record from ScammerListing
      const dbRecord = ScammerDataProcessor.listingToDbRecord(scammer);
      
      // Ensure ID is present since it's required
      if (!dbRecord.id) {
        throw new Error('Scammer ID is required');
      }
      
      // Use explicit object with all required fields to avoid type errors
      const { error } = await supabase
        .from('scammers')
        .upsert({
          id: dbRecord.id,
          name: dbRecord.name,
          photo_url: dbRecord.photo_url,
          accused_of: dbRecord.accused_of,
          links: dbRecord.links,
          aliases: dbRecord.aliases,
          accomplices: dbRecord.accomplices,
          official_response: dbRecord.official_response,
          bounty_amount: dbRecord.bounty_amount,
          wallet_address: dbRecord.wallet_address,
          date_added: dbRecord.date_added,
          added_by: dbRecord.added_by,
          likes: dbRecord.likes || 0,
          dislikes: dbRecord.dislikes || 0,
          views: dbRecord.views || 0,
          comments: dbRecord.comments,
          x_link: dbRecord.x_link
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error("Error saving scammer:", error);
        return false;
      }
      
      console.log("Scammer saved successfully:", scammer.name);
      return true;
    } catch (error) {
      console.error("Error in saveScammer:", error);
      return false;
    }
  }

  /**
   * Get a scammer by ID
   */
  async getScammer(id: string): Promise<ScammerListing | null> {
    try {
      const { data, error } = await supabase
        .from('scammers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching scammer:", error);
        return null;
      }

      if (!data) {
        console.log("No scammer found with ID:", id);
        return null;
      }

      const scammer = ScammerDataProcessor.dbRecordToListing(data as ScammerDbRecord);
      return scammer;
    } catch (error) {
      console.error("Error in getScammer:", error);
      return null;
    }
  }

  /**
   * Get all scammers
   */
  async getAllScammers(): Promise<ScammerListing[]> {
    try {
      const { data, error } = await supabase
        .from('scammers')
        .select('*')
        .order('date_added', { ascending: false });

      if (error) {
        console.error("Error fetching all scammers:", error);
        return [];
      }

      if (!data || data.length === 0) {
        console.log("No scammers found in database");
        return [];
      }

      const scammers = data.map(record => 
        ScammerDataProcessor.dbRecordToListing(record as ScammerDbRecord)
      );
      
      return scammers;
    } catch (error) {
      console.error("Error in getAllScammers:", error);
      return [];
    }
  }

  /**
   * Update scammer statistics
   */
  async updateScammerStats(scammerId: string, stats: ScammerStats): Promise<boolean> {
    try {
      console.log("Updating stats for scammer:", scammerId, stats);
      
      // Get the current scammer to ensure we have valid data
      const { data: scammer, error: fetchError } = await supabase
        .from('scammers')
        .select('id, name, likes, dislikes, views')
        .eq('id', scammerId)
        .single();
        
      if (fetchError || !scammer) {
        console.error("Error fetching scammer for stats update:", fetchError);
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
   * Save user's interaction with a scammer (likes/dislikes)
   */
  async saveUserScammerInteraction(
    userId: string, 
    scammerId: string, 
    interaction: { liked: boolean; disliked: boolean }
  ): Promise<boolean> {
    try {
      console.log("Saving user interaction for scammer:", scammerId, interaction);
      
      const { error } = await supabase
        .from('user_scammer_interactions')
        .upsert({
          user_id: userId,
          scammer_id: scammerId,
          liked: interaction.liked,
          disliked: interaction.disliked,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'user_id,scammer_id'
        });

      if (error) {
        console.error("Error saving user interaction:", error);
        return false;
      }
      
      console.log("User interaction saved successfully");
      return true;
    } catch (error) {
      console.error("Error in saveUserScammerInteraction:", error);
      return false;
    }
  }
  
  /**
   * Get user's interaction with a scammer
   */
  async getUserScammerInteractions(
    userId: string, 
    scammerId: string
  ): Promise<UserScammerInteraction | null> {
    try {
      console.log("Getting user interaction for scammer:", scammerId);
      
      const { data, error } = await supabase
        .from('user_scammer_interactions')
        .select('*')
        .eq('user_id', userId)
        .eq('scammer_id', scammerId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching user interaction:", error);
        return null;
      }
      
      if (!data) {
        return null;
      }
      
      return {
        userId: data.user_id,
        scammerId: data.scammer_id,
        liked: data.liked,
        disliked: data.disliked,
        lastUpdated: data.last_updated
      };
    } catch (error) {
      console.error("Error in getUserScammerInteractions:", error);
      return null;
    }
  }
  
  /**
   * Record a view for a scammer with IP tracking to prevent duplicate views
   */
  async recordScammerView(scammerId: string, ipHash: string): Promise<boolean> {
    try {
      // First check if this IP has already viewed this scammer
      const { data: existingView, error: checkError } = await supabase
        .from('scammer_views')
        .select('id')
        .eq('scammer_id', scammerId)
        .eq('ip_hash', ipHash)
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking for existing view:", checkError);
        return false;
      }
      
      // If this IP has already viewed this scammer, don't increment the counter
      if (existingView) {
        console.log("IP has already viewed this scammer, not incrementing view count");
        return true;
      }
      
      // Record the view
      const { error: insertError } = await supabase
        .from('scammer_views')
        .insert({
          scammer_id: scammerId,
          ip_hash: ipHash,
          viewed_at: new Date().toISOString()
        });
        
      if (insertError) {
        console.error("Error recording view:", insertError);
        return false;
      }
      
      // Increment the scammer's view count
      const { data: scammer, error: fetchError } = await supabase
        .from('scammers')
        .select('views, name')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for view increment:", fetchError);
        return false;
      }
      
      const currentViews = scammer?.views || 0;
      const newViews = currentViews + 1;
      
      const { error } = await supabase
        .from('scammers')
        .update({ 
          views: newViews,
          name: scammer.name // Required field
        })
        .eq('id', scammerId);

      if (error) {
        console.error("Error incrementing scammer views:", error);
        return false;
      }
      
      console.log("Scammer view recorded and count incremented successfully to", newViews);
      return true;
    } catch (error) {
      console.error("Error in recordScammerView:", error);
      return false;
    }
  }

  /**
   * Increment view count for a scammer (deprecated, use recordScammerView instead)
   */
  async incrementScammerViews(scammerId: string): Promise<boolean> {
    try {
      console.log("Incrementing views for scammer:", scammerId);
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('views, name')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for view increment:", fetchError);
        return false;
      }
      
      const currentViews = existingScammer?.views || 0;
      const newViews = currentViews + 1;
      
      // Make sure to include the required fields (id and name)
      const { error } = await supabase
        .from('scammers')
        .update({ 
          views: newViews,
          name: existingScammer.name
        })
        .eq('id', scammerId);

      if (error) {
        console.error("Error incrementing scammer views:", error);
        return false;
      }
      
      console.log("Scammer views incremented successfully to", newViews);
      return true;
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
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('likes, name')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for like:", fetchError);
        return false;
      }
      
      const currentLikes = existingScammer?.likes || 0;
      const newLikes = currentLikes + 1;
      
      // Make sure to include the required fields (id and name)
      const { error } = await supabase
        .from('scammers')
        .update({ 
          likes: newLikes,
          name: existingScammer.name
        })
        .eq('id', scammerId);

      if (error) {
        console.error("Error liking scammer:", error);
        return false;
      }
      
      console.log("Scammer likes incremented successfully to", newLikes);
      return true;
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
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('dislikes, name')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for dislike:", fetchError);
        return false;
      }
      
      const currentDislikes = existingScammer?.dislikes || 0;
      const newDislikes = currentDislikes + 1;
      
      // Make sure to include the required fields (id and name)
      const { error } = await supabase
        .from('scammers')
        .update({ 
          dislikes: newDislikes,
          name: existingScammer.name  
        })
        .eq('id', scammerId);

      if (error) {
        console.error("Error disliking scammer:", error);
        return false;
      }
      
      console.log("Scammer dislikes incremented successfully to", newDislikes);
      return true;
    } catch (error) {
      console.error("Error in dislikeScammer:", error);
      return false;
    }
  }
}

export const scammerService = new ScammerService();
