
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService, safeJsonToStringArray } from './baseSupabaseService';
import { Scammer } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

export interface ScammerListing extends Omit<Scammer, 'dateAdded'> {
  dateAdded: string; // ISO string
  comments?: string[]; // Array of comment IDs
  likes: number;
  dislikes: number;
  views: number;
}

export class ScammerService extends BaseSupabaseService {
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
      return data.map(item => {
        // Ensure aliases is properly converted from JSON
        let aliases: string[] = [];
        try {
          if (item.aliases) {
            aliases = safeJsonToStringArray(item.aliases);
          }
        } catch (e) {
          console.error(`Error parsing aliases for scammer ${item.name}:`, e, item.aliases);
          aliases = [];
        }
        
        console.log(`Scammer ${item.name} has aliases:`, aliases);
        
        return {
          id: item.id,
          name: item.name,
          photoUrl: item.photo_url || '',
          accusedOf: item.accused_of || '',
          links: safeJsonToStringArray(item.links),
          aliases: aliases,
          accomplices: safeJsonToStringArray(item.accomplices),
          officialResponse: item.official_response || '',
          bountyAmount: Number(item.bounty_amount) || 0,
          walletAddress: item.wallet_address || '',
          dateAdded: item.date_added,
          addedBy: item.added_by || '',
          likes: item.likes || 0,
          dislikes: item.dislikes || 0,
          views: item.views || 0
        };
      });
    } catch (error) {
      console.error('Unexpected error fetching scammers:', error);
      return [];
    }
  }

  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    console.log('Attempting to save scammer to Supabase:', scammer.id, scammer.name);
    
    try {
      // Convert from client format to database format
      const dbScammer = {
        id: scammer.id,
        name: scammer.name,
        photo_url: scammer.photoUrl,
        accused_of: scammer.accusedOf,
        links: scammer.links,
        aliases: scammer.aliases,
        accomplices: scammer.accomplices,
        official_response: scammer.officialResponse,
        bounty_amount: scammer.bountyAmount,
        wallet_address: scammer.walletAddress || "",
        date_added: scammer.dateAdded,
        added_by: scammer.addedBy,
        likes: scammer.likes || 0,
        dislikes: scammer.dislikes || 0,
        views: scammer.views || 0
      };
      
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
    return {
      id: data.id,
      name: data.name,
      photoUrl: data.photo_url || '',
      accusedOf: data.accused_of || '',
      links: safeJsonToStringArray(data.links),
      aliases: safeJsonToStringArray(data.aliases),
      accomplices: safeJsonToStringArray(data.accomplices),
      officialResponse: data.official_response || '',
      bountyAmount: Number(data.bounty_amount) || 0,
      walletAddress: data.wallet_address || '',
      dateAdded: data.date_added,
      addedBy: data.added_by || '',
      likes: data.likes || 0,
      dislikes: data.dislikes || 0,
      views: data.views || 0
    };
  }

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

  async updateScammerStats(scammerId: string, stats: { likes?: number; dislikes?: number; views?: number }): Promise<boolean> {
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

export const scammerService = new ScammerService();
