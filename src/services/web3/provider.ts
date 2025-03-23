
import { Connection, PublicKey } from '@solana/web3.js';

export class Web3Provider {
  solana: any = null; // Using 'any' first, we'll properly type this with ethereum.d.ts
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
    if (!this.solana) {
      await this.initProvider();
      if (!this.solana) {
        console.error("Phantom wallet not available");
        return null;
      }
    }
    
    try {
      const response = await this.solana.connect();
      const publicKey = response.publicKey.toString();
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
}
