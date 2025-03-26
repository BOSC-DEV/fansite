
import { supabase } from '@/lib/supabase';
import { ScammerDbRecord } from './scammerTypes';

/**
 * Base service with core scammer operations
 */
export class ScammerBaseService {
  /**
   * Get a scammer record from the database
   */
  protected async getScammerRecord(id: string): Promise<ScammerDbRecord | null> {
    try {
      const { data, error } = await supabase
        .from('scammers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error("Error fetching scammer record:", error);
        return null;
      }

      if (!data) {
        console.log("No scammer found with ID:", id);
        return null;
      }

      // Add the shares property if it doesn't exist
      return {
        ...data,
        shares: data.shares || 0
      } as ScammerDbRecord;
    } catch (error) {
      console.error("Error in getScammerRecord:", error);
      return null;
    }
  }

  /**
   * Update a scammer record with the given values
   */
  protected async updateScammerRecord(id: string, updateData: Partial<ScammerDbRecord>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('scammers')
        .update(updateData)
        .eq('id', id);

      if (error) {
        console.error("Error updating scammer record:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Error in updateScammerRecord:", error);
      return false;
    }
  }
}
