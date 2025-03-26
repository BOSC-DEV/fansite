
import { supabase } from '@/lib/supabase';
import { ScammerBaseService } from './scammerBaseService';
import { ScammerListing, ScammerDbRecord } from './scammerTypes';
import { ScammerDataProcessor } from './scammerDataProcessor';

/**
 * Service for handling scammer deletion operations
 */
export class ScammerDeleteService extends ScammerBaseService {
  /**
   * Permanently delete a scammer by ID (keeping for backwards compatibility)
   */
  async deleteScammer(id: string): Promise<boolean> {
    console.log("Warning: Using permanent delete method. Consider using softDeleteScammer instead.");
    try {
      console.log("Permanently deleting scammer with ID:", id);
      
      const { error } = await supabase
        .from('scammers')
        .delete()
        .eq('id', id);

      if (error) {
        console.error("Error deleting scammer:", error);
        return false;
      }
      
      console.log("Scammer permanently deleted successfully");
      return true;
    } catch (error) {
      console.error("Error in deleteScammer:", error);
      return false;
    }
  }

  /**
   * Soft delete a scammer by ID (mark as deleted)
   */
  async softDeleteScammer(id: string): Promise<boolean> {
    try {
      console.log("Soft deleting scammer with ID:", id);
      
      const { error } = await supabase
        .from('scammers')
        .update({ deleted_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error("Error soft deleting scammer:", error);
        return false;
      }
      
      console.log("Scammer soft deleted successfully");
      return true;
    } catch (error) {
      console.error("Error in softDeleteScammer:", error);
      return false;
    }
  }

  /**
   * Restore a soft-deleted scammer
   */
  async restoreScammer(id: string): Promise<boolean> {
    try {
      console.log("Restoring deleted scammer with ID:", id);
      
      const { error } = await supabase
        .from('scammers')
        .update({ deleted_at: null })
        .eq('id', id);

      if (error) {
        console.error("Error restoring scammer:", error);
        return false;
      }
      
      console.log("Scammer restored successfully");
      return true;
    } catch (error) {
      console.error("Error in restoreScammer:", error);
      return false;
    }
  }

  /**
   * Get a list of all deleted scammers
   */
  async getDeletedScammers(): Promise<ScammerListing[]> {
    try {
      console.log("Fetching deleted scammers");
      
      const { data, error } = await supabase
        .from('deleted_scammers')
        .select('*')
        .order('deleted_at', { ascending: false });

      if (error) {
        console.error("Error fetching deleted scammers:", error);
        return [];
      }

      if (!data || data.length === 0) {
        console.log("No deleted scammers found");
        return [];
      }

      const scammers = data.map(record => 
        ScammerDataProcessor.dbRecordToListing(record as ScammerDbRecord)
      );
      
      return scammers;
    } catch (error) {
      console.error("Error in getDeletedScammers:", error);
      return [];
    }
  }
}

// Export a singleton instance
export const scammerDeleteService = new ScammerDeleteService();
