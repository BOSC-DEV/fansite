
import { supabase } from '@/integrations/supabase/client';
import { ScammerBaseService } from './scammerBaseService';
import { ScammerListing, ScammerDbRecord } from './scammerTypes';
import { ScammerDataProcessor } from './scammerDataProcessor';

/**
 * Service for handling core scammer data operations
 */
export class ScammerDataService extends ScammerBaseService {
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
        .upsert([{  // Wrap the object in an array since upsert expects an array of records
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
          shares: dbRecord.shares || 0,
          comments: dbRecord.comments,
          deleted_at: null // Ensure new/updated records are not marked as deleted
        }])
        .select();

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
      const data = await this.getScammerRecord(id);

      if (!data) {
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
   * Get all scammers (excluding deleted ones)
   */
  async getAllScammers(): Promise<ScammerListing[]> {
    try {
      const { data, error } = await supabase
        .from('scammers')
        .select('*')
        .is('deleted_at', null)
        .order('date_added', { ascending: false });

      if (error) {
        console.error("Error fetching all scammers:", error);
        return [];
      }

      if (!data || data.length === 0) {
        console.log("No scammers found in database");
        return [];
      }

      const scammers = data.map(record => {
        // Add shares property if it doesn't exist
        const recordWithShares = {
          ...record,
          shares: record.shares || 0
        };
        return ScammerDataProcessor.dbRecordToListing(recordWithShares as ScammerDbRecord);
      });
      
      return scammers;
    } catch (error) {
      console.error("Error in getAllScammers:", error);
      return [];
    }
  }
}

// Export a singleton instance
export const scammerDataService = new ScammerDataService();
