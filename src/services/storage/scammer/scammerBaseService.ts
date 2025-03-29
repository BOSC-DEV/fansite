
import { supabase } from '@/integrations/supabase/client';
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
      // Convert JSON types to proper format for Supabase
      const supabaseUpdateData: Record<string, any> = {};
      
      // Copy only the properties that exist in updateData
      Object.keys(updateData).forEach(key => {
        // Handle arrays specifically
        if (['links', 'aliases', 'accomplices', 'comments'].includes(key) && updateData[key as keyof ScammerDbRecord]) {
          supabaseUpdateData[key] = updateData[key as keyof ScammerDbRecord];
        } else {
          supabaseUpdateData[key] = updateData[key as keyof ScammerDbRecord];
        }
      });
      
      const { error } = await supabase
        .from('scammers')
        .update(supabaseUpdateData)
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
