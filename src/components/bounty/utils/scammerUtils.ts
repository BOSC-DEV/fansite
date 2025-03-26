
import { scammerService as supabaseScammerService } from "@/services/storage/scammer/scammerService";
import { scammerService as localScammerService } from "@/services/storage/localStorage/scammerService";
import { ScammerListing as LocalScammerListing } from "@/services/storage/localStorage/scammerService";
import { ScammerListing as SupabaseScammerListing } from "@/services/storage/scammer/scammerTypes";

/**
 * Gets or creates a scammer record for bounty contribution
 */
export const getOrCreateScammer = async (
  scammerId: string,
  scammerName: string,
  currentBounty: number,
  walletAddress?: string
): Promise<LocalScammerListing | SupabaseScammerListing> => {
  try {
    // Try to get the scammer from the Supabase service first
    let scammer: SupabaseScammerListing | LocalScammerListing | null = 
      await supabaseScammerService.getScammer(scammerId);
    
    // If not found in Supabase, try the localStorage service
    if (!scammer) {
      scammer = await localScammerService.getScammer(scammerId);
    }
    
    // If still not found, create a basic record
    if (!scammer) {
      console.log("Creating new scammer record for bounty contribution");
      scammer = {
        id: scammerId,
        name: scammerName,
        photoUrl: "",
        accusedOf: "",
        links: [],
        aliases: [],
        accomplices: [],
        officialResponse: "",
        bountyAmount: currentBounty || 0,
        walletAddress: "",
        dateAdded: new Date().toISOString(),
        addedBy: walletAddress || "unknown",
        comments: [],
        likes: 0,
        dislikes: 0,
        views: 0,
        shares: 0
      };
    } else if (!Array.isArray(scammer.comments)) {
      // Ensure comments is an array if it exists but isn't one
      scammer.comments = [];
    }
    
    return scammer;
  } catch (error) {
    console.error("Error getting or creating scammer:", error);
    // Return a fallback scammer object
    return {
      id: scammerId,
      name: scammerName,
      photoUrl: "",
      accusedOf: "",
      links: [],
      aliases: [],
      accomplices: [],
      officialResponse: "",
      bountyAmount: currentBounty || 0,
      walletAddress: "",
      dateAdded: new Date().toISOString(),
      addedBy: walletAddress || "unknown",
      comments: [],
      likes: 0,
      dislikes: 0,
      views: 0,
      shares: 0
    };
  }
};

/**
 * Updates a scammer record with new bounty amount
 */
export const updateScammerBounty = async (
  scammer: LocalScammerListing | SupabaseScammerListing,
  solAmount: number
): Promise<void> => {
  try {
    // Update the bounty amount - increment by the amount in SOL tokens
    const newBounty = (scammer.bountyAmount || 0) + solAmount;
    scammer.bountyAmount = newBounty;
    
    // Save to localStorage service first
    await localScammerService.saveScammer({
      ...scammer,
      comments: Array.isArray(scammer.comments) ? scammer.comments : []
    });
    
    // Try to save to Supabase service if it exists
    try {
      if (typeof supabaseScammerService.saveScammer === 'function') {
        // Create a version of the scammer object compatible with Supabase service
        const scammerForSupabase: SupabaseScammerListing = {
          ...scammer,
          comments: Array.isArray(scammer.comments) ? scammer.comments : []
        };
        await supabaseScammerService.saveScammer(scammerForSupabase);
      }
    } catch (err) {
      console.log("Note: Could not save to Supabase service, but localStorage succeeded");
    }
  } catch (error) {
    console.error("Error updating scammer bounty:", error);
    throw error;
  }
};
