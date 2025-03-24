
import { Connection, PublicKey } from '@solana/web3.js';

export class Web3Provider {
  solana: any = null;
  connection: Connection | null = null;
  publicKey: PublicKey | null = null;
  
  constructor() {
    this.initProvider();
  }
  
  async initProvider() {
    if (window.phantom?.solana) {
      try {
        this.solana = window.phantom.solana;
        // Using devnet instead of mainnet to avoid rate limiting issues
        this.connection = new Connection('https://api.devnet.solana.com');
        
        if (this.solana.isConnected && this.solana.publicKey) {
          this.publicKey = new PublicKey(this.solana.publicKey.toString());
        }
        
        this.setupEventListeners();
      } catch (error) {
        console.error("Error initializing Phantom provider:", error);
      }
    } else {
      console.log("Phantom wallet not installed");
    }
  }
  
  setupEventListeners() {
    if (!this.solana) return;
    
    this.solana.on('connect', () => {
      if (this.solana?.publicKey) {
        this.publicKey = new PublicKey(this.solana.publicKey.toString());
      }
      console.log("Connected to Phantom wallet");
    });
    
    this.solana.on('disconnect', () => {
      this.publicKey = null;
      console.log("Disconnected from Phantom wallet");
    });
    
    this.solana.on('accountChanged', () => {
      window.location.reload();
    });
  }
  
  async connectWallet(): Promise<string | null> {
    console.log("Web3Provider: connectWallet called");
    
    if (!this.solana) {
      console.log("No Phantom wallet detected, initializing...");
      await this.initProvider();
      if (!this.solana) {
        console.error("Phantom wallet not available even after initialization");
        return null;
      }
    }
    
    try {
      console.log("Attempting to connect to Phantom wallet...");
      // Check if already connected
      if (this.solana.isConnected && this.solana.publicKey) {
        const pubKey = this.solana.publicKey.toString();
        console.log("Already connected to wallet:", pubKey);
        this.publicKey = new PublicKey(pubKey);
        return pubKey;
      }
      
      // Connect to wallet
      const response = await this.solana.connect();
      const publicKey = response.publicKey.toString();
      console.log("Successfully connected to wallet:", publicKey);
      this.publicKey = new PublicKey(publicKey);
      return publicKey;
    } catch (error) {
      console.error("Error connecting Phantom wallet:", error);
      return null;
    }
  }

  async disconnectWallet(): Promise<boolean> {
    if (!this.solana) return false;
    
    try {
      await this.solana.disconnect();
      this.publicKey = null;
      return true;
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      return false;
    }
  }
  
  async getBalance(address: string): Promise<number> {
    // Mock implementation - in a real app, this would query the actual balance
    console.log("Getting balance for address:", address);
    return 10; // Default balance for UI testing
  }
}
