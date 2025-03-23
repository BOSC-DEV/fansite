
import { supabase } from '@/lib/supabase';
import { ScammerListing, ScammerStats, ScammerDbRecord } from './scammerTypes';
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
      
      // Since id is required by Supabase but optional in our type,
      // we need to create a record with the known required id
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
          comments: dbRecord.comments
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
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('id, likes, dislikes, views')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for stats update:", fetchError);
        return false;
      }
      
      // Create update payload with only the fields we want to update
      const updatePayload: any = { id: scammerId };
      
      if (stats.likes !== undefined) {
        updatePayload.likes = stats.likes;
      }
      
      if (stats.dislikes !== undefined) {
        updatePayload.dislikes = stats.dislikes;
      }
      
      if (stats.views !== undefined) {
        updatePayload.views = stats.views;
      }
      
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
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('views')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for view increment:", fetchError);
        return false;
      }
      
      const currentViews = existingScammer?.views || 0;
      const newViews = currentViews + 1;
      
      const { error } = await supabase
        .from('scammers')
        .update({ views: newViews })
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
        .select('likes')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for like:", fetchError);
        return false;
      }
      
      const currentLikes = existingScammer?.likes || 0;
      const newLikes = currentLikes + 1;
      
      const { error } = await supabase
        .from('scammers')
        .update({ likes: newLikes })
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
        .select('dislikes')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for dislike:", fetchError);
        return false;
      }
      
      const currentDislikes = existingScammer?.dislikes || 0;
      const newDislikes = currentDislikes + 1;
      
      const { error } = await supabase
        .from('scammers')
        .update({ dislikes: newDislikes })
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
