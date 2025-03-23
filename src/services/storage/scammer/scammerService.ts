
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from '../baseSupabaseService';
import { ScammerDataProcessor } from './scammerDataProcessor';
import { ScammerListing, ScammerStats } from './scammerTypes';

export class ScammerService extends BaseSupabaseService {
  /**
   * Retrieve all scammers from the database
   */
  async getAllScammers(): Promise<ScammerListing[]> {
    try {
      const { data, error } = await this.supabase
        .from('scammers')
        .select('*')
        .order('date_added', { ascending: false });

      if (error) {
        console.error('Error fetching scammers from Supabase:', error);
        return [];
      }

      if (!data || data.length === 0) {
        console.log('No scammers found in Supabase');
        return [];
      }

      console.log(`Retrieved ${data.length} scammers from Supabase`);

      // Convert from database format to client format
      return data.map(item => ScammerDataProcessor.dbRecordToListing(item));
    } catch (error) {
      console.error('Unexpected error fetching scammers:', error);
      return [];
    }
  }

  /**
   * Save a scammer to the database
   */
  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    console.log('Attempting to save scammer to Supabase:', scammer.id, scammer.name);
    
    try {
      // Convert from client format to database format
      const dbScammer = ScammerDataProcessor.listingToDbRecord(scammer);
      
      // Check if scammer exists
      const { data: existingScammer, error: checkError } = await this.supabase
        .from('scammers')
        .select('id')
        .eq('id', scammer.id)
        .maybeSingle();

      if (checkError) {
        console.error('Error checking if scammer exists:', checkError);
        return false;
      }

      let result;
      
      if (existingScammer) {
        console.log('Updating existing scammer in Supabase:', scammer.id);
        // Update
        result = await this.supabase
          .from('scammers')
          .update(dbScammer)
          .eq('id', scammer.id);
      } else {
        console.log('Inserting new scammer in Supabase:', scammer.id);
        // Insert
        result = await this.supabase
          .from('scammers')
          .insert(dbScammer);
      }

      if (result.error) {
        console.error('Error saving scammer to Supabase:', result.error);
        return false;
      }
      
      console.log('Successfully saved scammer to Supabase:', scammer.id);
      return true;
    } catch (error) {
      console.error('Unexpected error saving scammer:', error);
      return false;
    }
  }

  /**
   * Get a specific scammer by ID
   */
  async getScammer(scammerId: string): Promise<ScammerListing | null> {
    const { data, error } = await this.supabase
      .from('scammers')
      .select('*')
      .eq('id', scammerId)
      .single();

    if (error || !data) {
      console.error('Error fetching scammer:', error);
      return null;
    }

    // Convert from database format to client format
    return ScammerDataProcessor.dbRecordToListing(data);
  }

  /**
   * Increment the view count for a scammer
   */
  async incrementScammerViews(scammerId: string): Promise<void> {
    const { data: scammer } = await this.supabase
      .from('scammers')
      .select('views')
      .eq('id', scammerId)
      .single();

    if (scammer) {
      await this.supabase
        .from('scammers')
        .update({ views: (scammer.views || 0) + 1 })
        .eq('id', scammerId);
    }
  }

  /**
   * Increment the like count for a scammer
   */
  async likeScammer(scammerId: string): Promise<void> {
    const { data: scammer } = await this.supabase
      .from('scammers')
      .select('likes')
      .eq('id', scammerId)
      .single();

    if (scammer) {
      await this.supabase
        .from('scammers')
        .update({ likes: (scammer.likes || 0) + 1 })
        .eq('id', scammerId);
    }
  }

  /**
   * Increment the dislike count for a scammer
   */
  async dislikeScammer(scammerId: string): Promise<void> {
    const { data: scammer } = await this.supabase
      .from('scammers')
      .select('dislikes')
      .eq('id', scammerId)
      .single();

    if (scammer) {
      await this.supabase
        .from('scammers')
        .update({ dislikes: (scammer.dislikes || 0) + 1 })
        .eq('id', scammerId);
    }
  }

  /**
   * Update statistics for a scammer
   */
  async updateScammerStats(scammerId: string, stats: ScammerStats): Promise<boolean> {
    try {
      console.log(`Updating stats for scammer ${scammerId}:`, stats);
      
      const { data: scammer, error: getError } = await this.supabase
        .from('scammers')
        .select('likes, dislikes, views')
        .eq('id', scammerId)
        .maybeSingle();
      
      if (getError) {
        console.error('Error fetching scammer for stats update:', getError);
        return false;
      }
      
      if (!scammer) {
        console.error('Scammer not found for stats update');
        return false;
      }
      
      const { error: updateError } = await this.supabase
        .from('scammers')
        .update({
          likes: stats.likes !== undefined ? stats.likes : scammer.likes,
          dislikes: stats.dislikes !== undefined ? stats.dislikes : scammer.dislikes,
          views: stats.views !== undefined ? stats.views : scammer.views
        })
        .eq('id', scammerId);
      
      if (updateError) {
        console.error('Error updating scammer stats:', updateError);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Unexpected error updating scammer stats:', error);
      return false;
    }
  }
}

// Export a singleton instance of the service
export const scammerService = new ScammerService();
