
import { safeJsonToStringArray } from '../baseSupabaseService';
import { ScammerDbRecord, ScammerListing } from './scammerTypes';
import { Json } from '@/integrations/supabase/types';

/**
 * Processes scammer data from the database format to client format
 */
export class ScammerDataProcessor {
  /**
   * Process JSON fields with robust error handling
   */
  static processJsonField(field: any, fieldName: string, scammerName: string): string[] {
    try {
      console.log(`Processing ${fieldName} for scammer ${scammerName}:`, field);
      const result = safeJsonToStringArray(field);
      console.log(`Processed ${fieldName} result:`, result);
      return result;
    } catch (e) {
      console.error(`Error processing ${fieldName} for scammer ${scammerName}:`, e, field);
      return [];
    }
  }

  /**
   * Convert database record to client ScammerListing
   */
  static dbRecordToListing(record: ScammerDbRecord): ScammerListing {
    // Process arrays with better error handling
    const processedAliases = this.processJsonField(record.aliases, 'aliases', record.name);
    const processedLinks = this.processJsonField(record.links, 'links', record.name);
    const processedAccomplices = this.processJsonField(record.accomplices, 'accomplices', record.name);
    
    return {
      id: record.id,
      name: record.name,
      photoUrl: record.photo_url || '',
      accusedOf: record.accused_of || '',
      links: processedLinks,
      aliases: processedAliases,
      accomplices: processedAccomplices,
      officialResponse: record.official_response || '',
      bountyAmount: Number(record.bounty_amount) || 0,
      walletAddress: record.wallet_address || '',
      dateAdded: record.date_added,
      addedBy: record.added_by || '',
      likes: record.likes || 0,
      dislikes: record.dislikes || 0,
      views: record.views || 0
    };
  }

  /**
   * Convert client ScammerListing to database record format
   * Note: This now returns a ScammerDbRecord with required id field
   */
  static listingToDbRecord(listing: ScammerListing): ScammerDbRecord {
    return {
      id: listing.id,
      name: listing.name,
      photo_url: listing.photoUrl,
      accused_of: listing.accusedOf,
      links: listing.links as Json,
      aliases: listing.aliases as Json,
      accomplices: listing.accomplices as Json,
      official_response: listing.officialResponse,
      bounty_amount: listing.bountyAmount,
      wallet_address: listing.walletAddress || "",
      date_added: listing.dateAdded,
      added_by: listing.addedBy,
      likes: listing.likes || 0,
      dislikes: listing.dislikes || 0,
      views: listing.views || 0,
      comments: null
    };
  }
}
