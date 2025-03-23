
import { supabase } from '@/lib/supabase';
import { ScammerListing, ScammerStats, ScammerDbRecord } from './scammerTypes';
import { ScammerDataProcessor } from './scammerDataProcessor';

class ScammerService {
  /**
   * Save a scammer to Supabase
   */
  async saveScammer(scammer: ScammerListing): Promise<void> {
    try {
      console.log("Saving scammer to Supabase:", scammer.name);
      
      // Create database record from ScammerListing
      const dbRecord = ScammerDataProcessor.listingToDbRecord(scammer);
      
      // Ensure ID is present since it's required
      if (!dbRecord.id) {
        throw new Error('Scammer ID is required');
      }
      
      const { error } = await supabase
        .from('scammers')
        .upsert(dbRecord, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error("Error saving scammer:", error);
        throw error;
      }
      
      console.log("Scammer saved successfully:", scammer.name);
    } catch (error) {
      console.error("Error in saveScammer:", error);
      throw error;
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
  async updateScammerStats(scammerId: string, stats: ScammerStats): Promise<void> {
    try {
      console.log("Updating stats for scammer:", scammerId, stats);
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('id, likes, dislikes, views')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for stats update:", fetchError);
        throw fetchError;
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
        throw error;
      }
      
      console.log("Scammer stats updated successfully");
    } catch (error) {
      console.error("Error in updateScammerStats:", error);
      throw error;
    }
  }
  
  /**
   * Increment view count for a scammer
   */
  async incrementScammerViews(scammerId: string): Promise<void> {
    try {
      console.log("Incrementing views for scammer:", scammerId);
      
      const { data: existingScammer, error: fetchError } = await supabase
        .from('scammers')
        .select('views')
        .eq('id', scammerId)
        .single();
        
      if (fetchError) {
        console.error("Error fetching scammer for view increment:", fetchError);
        throw fetchError;
      }
      
      const currentViews = existingScammer?.views || 0;
      const newViews = currentViews + 1;
      
      const { error } = await supabase
        .from('scammers')
        .update({ views: newViews })
        .eq('id', scammerId);

      if (error) {
        console.error("Error incrementing scammer views:", error);
        throw error;
      }
      
      console.log("Scammer views incremented successfully to", newViews);
    } catch (error) {
      console.error("Error in incrementScammerViews:", error);
      throw error;
    }
  }
}

export const scammerService = new ScammerService();
