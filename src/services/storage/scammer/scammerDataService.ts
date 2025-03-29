import { ScammerListing } from './scammerTypes';
import { ScammerBaseService } from './scammerBaseService';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service for managing scammer data operations
 * This handles CRUD operations for scammer listings
 */
export class ScammerDataService extends ScammerBaseService {
  /**
   * Save a scammer listing to the database
   */
  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    try {
      console.log(`[ScammerDataService] Saving scammer: ${scammer.name}`);
      
      // Convert arrays to string arrays for Supabase
      const scammerToSave = {
        id: scammer.id,
        name: scammer.name,
        photo_url: scammer.photoUrl || '',
        accused_of: scammer.accusedOf || '',
        links: Array.isArray(scammer.links) ? scammer.links.map(l => String(l)) : [],
        aliases: Array.isArray(scammer.aliases) ? scammer.aliases.map(a => String(a)) : [],
        accomplices: Array.isArray(scammer.accomplices) ? scammer.accomplices.map(a => String(a)) : [],
        official_response: scammer.officialResponse || '',
        bounty_amount: scammer.bountyAmount || 0,
        wallet_address: scammer.walletAddress || '',
        date_added: scammer.dateAdded || new Date().toISOString(),
        added_by: scammer.addedBy || '',
        comments: Array.isArray(scammer.comments) ? scammer.comments.map(c => String(c)) : [],
        likes: scammer.likes || 0,
        dislikes: scammer.dislikes || 0,
        views: scammer.views || 0,
        shares: scammer.shares || 0,
        deleted_at: scammer.deletedAt || null
      };
      
      // Insert/upsert the scammer record
      const { error } = await this.supabase
        .from('scammers')
        .upsert(scammerToSave);
      
      if (error) {
        console.error("[ScammerDataService] Error saving scammer:", error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      console.log(`[ScammerDataService] Scammer saved successfully: ID=${scammer.id}`);
      return true;
    } catch (error) {
      console.error("Error in ScammerDataService.saveScammer:", error);
      throw error;
    }
  }

  /**
   * Get a scammer listing by ID
   */
  async getScammer(id: string): Promise<ScammerListing | null> {
    try {
      console.log(`[ScammerDataService] Getting scammer by ID: ${id}`);
      
      // Fetch from database
      const { data, error } = await this.supabase
        .from('scammers')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("[ScammerDataService] Error fetching scammer:", error);
        
        // Fall back to local storage
        const localScammer = this.getLocalScammer(id);
        if (localScammer) {
          console.log(`[ScammerDataService] Found scammer in local storage with ID: ${id}`);
          return localScammer;
        }
        
        return null;
      }
      
      if (!data) {
        console.log(`[ScammerDataService] No scammer found in database with ID: ${id}`);
        
        // Fall back to local storage
        const localScammer = this.getLocalScammer(id);
        if (localScammer) {
          console.log(`[ScammerDataService] Found scammer in local storage with ID: ${id}`);
          return localScammer;
        }
        
        return null;
      }
      
      console.log(`[ScammerDataService] Retrieved scammer from database with ID: ${id}`);
      
      // Convert database record to ScammerListing object
      return this.convertFromDbRecord(data);
    } catch (error) {
      console.error("[ScammerDataService] Error fetching scammer:", error);
      
      // Fall back to local storage in case of error
      const localScammer = this.getLocalScammer(id);
      return localScammer || null;
    }
  }

  /**
   * Get all scammer listings
   */
  async getAllScammers(): Promise<ScammerListing[]> {
    try {
      console.log("[ScammerDataService] Getting all scammers");
      
      // Fetch from database
      const { data, error } = await this.supabase
        .from('scammers')
        .select('*')
        .is('deleted_at', null);
      
      if (error) {
        console.error("[ScammerDataService] Error fetching all scammers:", error);
        
        // Fall back to local storage
        const localScammers = this.getLocalScammers();
        console.log(`[ScammerDataService] Found ${localScammers.length} scammers in local storage`);
        return localScammers;
      }
      
      if (!data || data.length === 0) {
        console.log("[ScammerDataService] No scammers found in database");
        
        // Fall back to local storage
        const localScammers = this.getLocalScammers();
        console.log(`[ScammerDataService] Found ${localScammers.length} scammers in local storage`);
        return localScammers;
      }
      
      console.log(`[ScammerDataService] Retrieved ${data.length} scammers from database`);
      
      // Convert database records to ScammerListing objects
      const scammers = data.map(this.convertFromDbRecord);
      
      // Merge with local storage scammers
      const localScammers = this.getLocalScammers();
      const allIds = new Set(scammers.map(s => s.id));
      
      // Add local scammers that aren't in the database results
      localScammers.forEach(localScammer => {
        if (!allIds.has(localScammer.id)) {
          scammers.push(localScammer);
        }
      });
      
      return scammers;
    } catch (error) {
      console.error("[ScammerDataService] Error fetching all scammers:", error);
      
      // Fall back to local storage in case of error
      const localScammers = this.getLocalScammers();
      return localScammers;
    }
  }

  /**
   * Convert a database record to a ScammerListing object
   */
  private convertFromDbRecord(record: any): ScammerListing {
    return {
      id: record.id,
      name: record.name,
      photoUrl: record.photo_url || '',
      accusedOf: record.accused_of || '',
      links: Array.isArray(record.links) ? record.links.map(l => String(l)) : [],
      aliases: Array.isArray(record.aliases) ? record.aliases.map(a => String(a)) : [],
      accomplices: Array.isArray(record.accomplices) ? record.accomplices.map(a => String(a)) : [],
      officialResponse: record.official_response || '',
      bountyAmount: record.bounty_amount || 0,
      walletAddress: record.wallet_address || '',
      dateAdded: record.date_added || new Date().toISOString(),
      addedBy: record.added_by || '',
      comments: Array.isArray(record.comments) ? record.comments.map(c => String(c)) : [],
      likes: record.likes || 0,
      dislikes: record.dislikes || 0,
      views: record.views || 0,
      shares: record.shares || 0,
      deletedAt: record.deleted_at || null
    };
  }

  /**
   * Get a scammer from local storage by ID
   */
  private getLocalScammer(id: string): ScammerListing | null {
    const localScammers = this.getLocalScammers();
    return localScammers.find(scammer => scammer.id === id) || null;
  }

  /**
   * Get all scammers from local storage
   */
  private getLocalScammers(): ScammerListing[] {
    try {
      const localStorageService = (await import('@/services/storage/localStorage/scammerService')).scammerService;
      return localStorageService.getAllScammers();
    } catch (error) {
      console.error("Error getting local scammers:", error);
      return [];
    }
  }

  /**
   * Get all scammers reported by a specific user
   */
  async getScammersByUser(userWalletAddress: string): Promise<ScammerListing[]> {
    try {
      console.log(`[ScammerDataService] Fetching scammers for user: ${userWalletAddress}`);
      
      // Fetch from database
      const { data, error } = await this.supabase
        .from('scammers')
        .select('*')
        .eq('added_by', userWalletAddress)
        .is('deleted_at', null);
      
      if (error) {
        console.error("[ScammerDataService] Error fetching user's scammers:", error);
        
        // Fall back to local storage
        const localScammers = this.getLocalScammers();
        const userLocalScammers = localScammers.filter(s => s.addedBy === userWalletAddress);
        
        console.log(`[ScammerDataService] Found ${userLocalScammers.length} scammers in local storage for user`);
        return userLocalScammers;
      }
      
      if (!data || data.length === 0) {
        console.log(`[ScammerDataService] No scammers found in database for user ${userWalletAddress}`);
        
        // Fall back to local storage
        const localScammers = this.getLocalScammers();
        const userLocalScammers = localScammers.filter(s => s.addedBy === userWalletAddress);
        
        console.log(`[ScammerDataService] Found ${userLocalScammers.length} scammers in local storage for user`);
        return userLocalScammers;
      }
      
      console.log(`[ScammerDataService] Retrieved ${data.length} scammers for user ${userWalletAddress}`);
      
      // Convert database records to ScammerListing objects
      const scammers = data.map(this.convertFromDbRecord);
      
      // Merge with local storage scammers
      const localScammers = this.getLocalScammers().filter(s => s.addedBy === userWalletAddress);
      const allIds = new Set(scammers.map(s => s.id));
      
      // Add local scammers that aren't in the database results
      localScammers.forEach(localScammer => {
        if (!allIds.has(localScammer.id)) {
          scammers.push(localScammer);
        }
      });
      
      return scammers;
    } catch (error) {
      console.error("[ScammerDataService] Error fetching user's scammers:", error);
      
      // Fall back to local storage in case of error
      const localScammers = this.getLocalScammers();
      const userLocalScammers = localScammers.filter(s => s.addedBy === userWalletAddress);
      
      return userLocalScammers;
    }
  }
}

// Export a singleton instance
export const scammerDataService = new ScammerDataService();
