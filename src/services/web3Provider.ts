import { ethers } from "ethers";
import { BOSC_TOKEN_ABI, BOOK_OF_SCAMS_ABI, CONTRACT_ADDRESSES } from "../contracts/contract-abis";

export class Web3Provider {
  provider: ethers.BrowserProvider | null = null;
  signer: ethers.Signer | null = null;
  chainId: number | null = null;
  
  boscTokenContract: ethers.Contract | null = null;
  bookOfScamsContract: ethers.Contract | null = null;
  
  constructor() {
    this.initProvider();
  }
  
  async initProvider() {
    if (window.ethereum) {
      try {
        this.provider = new ethers.BrowserProvider(window.ethereum);
        this.chainId = Number(await window.ethereum.request({ method: 'eth_chainId' }));
        this.setupEventListeners();
      } catch (error) {
        console.error("Error initializing provider:", error);
      }
    } else {
      console.log("Ethereum provider not found");
    }
  }
  
  setupEventListeners() {
    if (!window.ethereum) return;
    
    window.ethereum.on('chainChanged', (chainId: string) => {
      window.location.reload();
    });
    
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      window.location.reload();
    });
  }
  
  async connectWallet(): Promise<string | null> {
    if (!this.provider) {
      await this.initProvider();
      if (!this.provider) return null;
    }
    
    try {
      const accounts = await this.provider.send("eth_requestAccounts", []);
      this.signer = await this.provider.getSigner();
      this.initContracts();
      return accounts[0];
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
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

export const web3Provider = new Web3Provider();
export default web3Provider;
