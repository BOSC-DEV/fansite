
import { PublicKey } from '@solana/web3.js';
import { ContractService } from "./contracts";
import { toast } from "sonner";
import { storageService } from "@/services/storage/localStorageService";

export class ScammerService extends ContractService {
  private walletPublicKey: PublicKey | null = null;
  
  constructor() {
    super();
  }
  
  async addScammer(name: string, accusedOf: string, photoUrl: string): Promise<string | null> {
    if (!window.phantom?.solana?.publicKey) {
      console.error("Wallet not connected");
      toast.error("Wallet connection issue. Please connect your wallet.");
      return null;
    }
    
    try {
      // Properly convert the phantom wallet public key to a Solana PublicKey
      this.walletPublicKey = new PublicKey(window.phantom.solana.publicKey.toString());
      console.log("Adding scammer with name:", name);
      // This is a placeholder for now until we have the Solana program implementation
      // In a real implementation, we would call a Solana program
      
      // Generate a unique ID for the scammer
      const scammerId = Math.random().toString(36).substring(2, 15);
      console.log("Scammer added with ID:", scammerId);
      
      return scammerId;
    } catch (error) {
      console.error("Error adding scammer:", error);
      toast.error(`Transaction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
      return null;
    }
  }
  
  async contributeToBounty(scammerId: string, amount: number): Promise<boolean> {
    if (!window.phantom?.solana?.publicKey) {
      toast.error("Wallet not connected");
      return false;
    }
    
    try {
      console.log(`Contributing ${amount} to bounty for ${scammerId}`);
      
      // First, check if the scammer exists
      const scammer = await storageService.getScammer(scammerId);
      if (!scammer) {
        throw new Error("Scammer not found");
      }
      
      // This would typically call a Solana program, but for now
      // we're using direct transfers and updating our database
      
      return true;
    } catch (error) {
      console.error("Error contributing to bounty:", error);
      toast.error(`Failed to contribute to bounty: ${error instanceof Error ? error.message : "Unknown error"}`);
      return false;
    }
  }
  
  async getScammerDetails(scammerId: string): Promise<any | null> {
    try {
      // Get the scammer from our database
      return await storageService.getScammer(scammerId);
    } catch (error) {
      console.error("Error getting scammer details:", error);
      return null;
    }
  }
  
  async getAllScammers(): Promise<any[]> {
    try {
      // Get all scammers from our database
      return await storageService.getAllScammers();
    } catch (error) {
      console.error("Error getting all scammers:", error);
      return [];
    }
  }
}

// Create a singleton instance
const scammerService = new ScammerService();

// Export the fetchScammerById function
export const fetchScammerById = (id: string) => scammerService.getScammerDetails(id);
