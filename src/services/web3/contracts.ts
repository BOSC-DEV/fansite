
import { ethers } from "ethers";
import { CONTRACT_ADDRESSES, BOSC_TOKEN_ABI, BOOK_OF_SCAMS_ABI } from "../../contracts/contract-abis";
import { Web3Provider } from "./provider";

export class ContractService extends Web3Provider {
  boscTokenContract: ethers.Contract | null = null;
  bookOfScamsContract: ethers.Contract | null = null;
  
  constructor() {
    super();
  }
  
  async initContracts() {
    if (!this.provider || !this.signer || !this.chainId) return;
    
    const addresses = CONTRACT_ADDRESSES[this.chainId as keyof typeof CONTRACT_ADDRESSES];
    
    if (!addresses) {
      console.error("No contract addresses for this network");
      return;
    }
    
    if (addresses.boscToken) {
      this.boscTokenContract = new ethers.Contract(
        addresses.boscToken,
        BOSC_TOKEN_ABI,
        this.signer
      );
    }
    
    if (addresses.bookOfScams) {
      this.bookOfScamsContract = new ethers.Contract(
        addresses.bookOfScams,
        BOOK_OF_SCAMS_ABI,
        this.signer
      );
    }
  }
  
  async getBalance(address: string): Promise<number | null> {
    if (!this.boscTokenContract) return null;
    
    try {
      const balance = await this.boscTokenContract.balanceOf(address);
      const decimals = await this.boscTokenContract.decimals();
      return Number(ethers.formatUnits(balance, decimals));
    } catch (error) {
      console.error("Error getting token balance:", error);
      return null;
    }
  }
  
  async approveTokens(spender: string, amount: number): Promise<boolean> {
    if (!this.boscTokenContract || !this.signer) return false;
    
    try {
      const decimals = await this.boscTokenContract.decimals();
      const amountInWei = ethers.parseUnits(amount.toString(), decimals);
      
      const tx = await this.boscTokenContract.approve(spender, amountInWei);
      await tx.wait();
      return true;
    } catch (error) {
      console.error("Error approving tokens:", error);
      return false;
    }
  }
}
