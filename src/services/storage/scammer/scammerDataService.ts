
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
      console.log("[ScammerDataService] Saving scammer to Supabase:", scammer.name);
      
      // Create database record from ScammerListing
      const dbRecord = ScammerDataProcessor.listingToDbRecord(scammer);
      
      // Ensure ID is present since it's required
      if (!dbRecord.id) {
        throw new Error('Scammer ID is required');
      }
      
      // Create a properly formatted object for upsert
      // Using the correct format according to Supabase API
      const scammerData = {
        id: dbRecord.id,
        name: dbRecord.name,
        photo_url: dbRecord.photo_url,
        accused_of: dbRecord.accused_of,
        // Ensure these are proper string arrays for Supabase
        links: Array.isArray(dbRecord.links) ? dbRecord.links : [],
        aliases: Array.isArray(dbRecord.aliases) ? dbRecord.aliases : [],
        accomplices: Array.isArray(dbRecord.accomplices) ? dbRecord.accomplices : [],
        official_response: dbRecord.official_response,
        bounty_amount: dbRecord.bounty_amount || 0,
        wallet_address: dbRecord.wallet_address || '',
        date_added: dbRecord.date_added,
        added_by: dbRecord.added_by || '',
        likes: dbRecord.likes || 0,
        dislikes: dbRecord.dislikes || 0,
        views: dbRecord.views || 0,
        shares: dbRecord.shares || 0,
        comments: Array.isArray(dbRecord.comments) ? dbRecord.comments : [],
        deleted_at: null // Ensure new/updated records are not marked as deleted
      };
      
      console.log("[ScammerDataService] Formatted scammer data for Supabase:", scammerData);
      
      // First try using the direct insert method - RLS may be preventing upsert
      const { error: insertError } = await supabase
        .from('scammers')
        .insert([scammerData])
        .select();
        
      if (insertError) {
        console.error("[ScammerDataService] Insert failed:", insertError);
        
        // Fall back to local storage - make sure to save there at least
        const localStorageService = (await import('../localStorage/scammerService')).scammerService;
        const localScammer = {
          ...scammer,
          dateAdded: typeof scammer.dateAdded === 'string' ? scammer.dateAdded : new Date().toISOString()
        };
        localStorageService.saveScammer(localScammer);
        console.log("[ScammerDataService] Saved scammer to local storage as fallback");
        
        return false;
      }
      
      console.log("[ScammerDataService] Scammer saved successfully to Supabase:", scammer.name);
      
      // Also save to local storage for redundancy
      const localStorageService = (await import('../localStorage/scammerService')).scammerService;
      const localScammer = {
        ...scammer,
        dateAdded: typeof scammer.dateAdded === 'string' ? scammer.dateAdded : new Date().toISOString()
      };
      localStorageService.saveScammer(localScammer);
      console.log("[ScammerDataService] Saved scammer to local storage for redundancy");
      
      return true;
    } catch (error) {
      console.error("[ScammerDataService] Error in saveScammer:", error);
      
      // Always try to save to local storage as a last resort
      try {
        const localStorageService = (await import('../localStorage/scammerService')).scammerService;
        const localScammer = {
          ...scammer,
          dateAdded: typeof scammer.dateAdded === 'string' ? scammer.dateAdded : new Date().toISOString()
        };
        localStorageService.saveScammer(localScammer);
        console.log("[ScammerDataService] Saved scammer to local storage after error");
      } catch (localError) {
        console.error("[ScammerDataService] Failed to save to local storage:", localError);
      }
      
      return false;
    }
  }

  /**
   * Get a scammer by ID
   */
  async getScammer(id: string): Promise<ScammerListing | null> {
    try {
      console.log("[ScammerDataService] Getting scammer with ID:", id);
      const data = await this.getScammerRecord(id);

      if (!data) {
        console.log("[ScammerDataService] No scammer found with ID:", id);
        return null;
      }

      const scammer = ScammerDataProcessor.dbRecordToListing(data as ScammerDbRecord);
      return scammer;
    } catch (error) {
      console.error("[ScammerDataService] Error in getScammer:", error);
      return null;
    }
  }

  /**
   * Get all scammers (excluding deleted ones)
   */
  async getAllScammers(): Promise<ScammerListing[]> {
    try {
      console.log("[ScammerDataService] Fetching all scammers");
      const { data, error } = await supabase
        .from('scammers')
        .select('*')
        .is('deleted_at', null)
        .order('date_added', { ascending: false });

      if (error) {
        console.error("[ScammerDataService] Error fetching all scammers:", error);
        throw error;
      }

      if (!data || data.length === 0) {
        console.log("[ScammerDataService] No scammers found in database");
        return [];
      }

      console.log("[ScammerDataService] Found", data.length, "scammers");
      
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
      console.error("[ScammerDataService] Error in getAllScammers:", error);
      return [];
    }
  }
}

// Export a singleton instance
export const scammerDataService = new ScammerDataService();
