
import { ethers } from "ethers";
import { ContractService } from "./contracts";

export class ScammerService extends ContractService {
  constructor() {
    super();
  }
  
  async addScammer(name: string, accusedOf: string, photoUrl: string): Promise<string | null> {
    if (!this.bookOfScamsContract || !this.signer) return null;
    
    try {
      // First approve the tokens
      const bookOfScamsAddress = await this.bookOfScamsContract.getAddress();
      const approved = await this.approveTokens(bookOfScamsAddress, 1);
      
      if (!approved) {
        throw new Error("Failed to approve tokens");
      }
      
      // Add the scammer
      const tx = await this.bookOfScamsContract.addScammer(name, accusedOf, photoUrl);
      const receipt = await tx.wait();
      
      // Find the ScammerAdded event to get the scammer ID
      const event = receipt.logs
        .filter((log: any) => log.fragment && log.fragment.name === 'ScammerAdded')
        .map((log: any) => {
          const parsedLog = this.bookOfScamsContract?.interface.parseLog(log);
          return parsedLog?.args;
        })[0];
      
      if (event && event.scammerId) {
        return event.scammerId;
      }
      
      return null;
    } catch (error) {
      console.error("Error adding scammer:", error);
      return null;
    }
  }
  
  async contributeToBounty(scammerId: string, amount: number): Promise<boolean> {
    if (!this.bookOfScamsContract || !this.signer) return false;
    
    try {
      // First approve the tokens
      const bookOfScamsAddress = await this.bookOfScamsContract.getAddress();
      const decimals = await this.boscTokenContract?.decimals() || 18;
      const amountInWei = ethers.parseUnits(amount.toString(), decimals);
      
      const approved = await this.approveTokens(bookOfScamsAddress, amount);
      
      if (!approved) {
        throw new Error("Failed to approve tokens");
      }
      
      // Contribute to the bounty
      const tx = await this.bookOfScamsContract.contributeToBounty(scammerId, amountInWei);
      await tx.wait();
      
      return true;
    } catch (error) {
      console.error("Error contributing to bounty:", error);
      return false;
    }
  }
  
  async getScammerDetails(scammerId: string): Promise<any | null> {
    if (!this.bookOfScamsContract) return null;
    
    try {
      const details = await this.bookOfScamsContract.getScammerDetails(scammerId);
      const decimals = await this.boscTokenContract?.decimals() || 18;
      
      return {
        name: details.name,
        accusedOf: details.accusedOf,
        photoUrl: details.photoUrl,
        bountyAmount: Number(ethers.formatUnits(details.bountyAmount, decimals)),
        reporter: details.reporter,
        dateAdded: new Date(Number(details.dateAdded) * 1000)
      };
    } catch (error) {
      console.error("Error getting scammer details:", error);
      return null;
    }
  }
  
  async getAllScammers(): Promise<any[]> {
    if (!this.bookOfScamsContract) return [];
    
    try {
      const count = await this.bookOfScamsContract.getScammerCount();
      const scammers = [];
      
      for (let i = 0; i < count; i++) {
        const scammerId = await this.bookOfScamsContract.getScammerIdAtIndex(i);
        const details = await this.getScammerDetails(scammerId);
        
        if (details) {
          scammers.push({
            id: scammerId,
            ...details
          });
        }
      }
      
      return scammers;
    } catch (error) {
      console.error("Error getting all scammers:", error);
      return [];
    }
  }
}
