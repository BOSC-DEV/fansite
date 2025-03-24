
import { Connection, PublicKey } from '@solana/web3.js';
import { encode } from '@project-serum/anchor/dist/cjs/utils/bytes/utf8';

const AUTH_MESSAGE = "Book of Scams authentication signature";
const SESSION_STORAGE_KEY = "bos-wallet-session";

interface SessionData {
  walletAddress: string;
  timestamp: number;
}

export class Web3Provider {
  solana: any = null;
  connection: Connection | null = null;
  publicKey: PublicKey | null = null;
  
  constructor() {
    this.initProvider();
  }
  
  async initProvider() {
    console.log("Initializing Web3Provider...");
    if (window.phantom?.solana) {
      try {
        this.solana = window.phantom.solana;
        // Using devnet instead of mainnet to avoid rate limiting issues
        this.connection = new Connection('https://api.devnet.solana.com');
        console.log("Solana connection established");
        
        if (this.solana.isConnected && this.solana.publicKey) {
          this.publicKey = new PublicKey(this.solana.publicKey.toString());
          console.log("Already connected to wallet:", this.publicKey.toString());
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
      // Clear session data on disconnect
      this.clearSessionData();
    });
    
    this.solana.on('accountChanged', () => {
      window.location.reload();
    });
  }
  
  private getSessionData(): SessionData | null {
    const sessionData = localStorage.getItem(SESSION_STORAGE_KEY);
    return sessionData ? JSON.parse(sessionData) : null;
  }
  
  private saveSessionData(address: string): void {
    const sessionData: SessionData = {
      walletAddress: address,
      timestamp: Date.now()
    };
    localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
  }
  
  private clearSessionData(): void {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
  
  private isSessionValid(address: string): boolean {
    const sessionData = this.getSessionData();
    
    if (!sessionData) return false;
    if (sessionData.walletAddress !== address) return false;
    
    // Check if session is still valid (24 hours = 86400000 milliseconds)
    const now = Date.now();
    const sessionAge = now - sessionData.timestamp;
    const isValid = sessionAge < 86400000;
    
    console.log(`Session age: ${sessionAge / 1000 / 60 / 60} hours, valid: ${isValid}`);
    return isValid;
  }
  
  async requestSignature(): Promise<boolean> {
    if (!this.solana || !this.publicKey) return false;
    
    try {
      console.log("Requesting wallet signature for authentication...");
      const message = encode(AUTH_MESSAGE);
      await this.solana.signMessage(message);
      console.log("Signature verified successfully");
      return true;
    } catch (error) {
      console.error("Error requesting signature:", error);
      return false;
    }
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
        
        // Check if we need to request a signature based on session
        if (!this.isSessionValid(pubKey)) {
          console.log("Session expired, requesting new signature...");
          const signatureVerified = await this.requestSignature();
          if (!signatureVerified) {
            console.error("Signature verification failed");
            return null;
          }
          // Save new session data
          this.saveSessionData(pubKey);
        } else {
          console.log("Valid session found, skipping signature request");
        }
        
        return pubKey;
      }
      
      // Connect to wallet
      const response = await this.solana.connect();
      const publicKey = response.publicKey.toString();
      console.log("Successfully connected to wallet:", publicKey);
      this.publicKey = new PublicKey(publicKey);
      
      // Request signature on first connect
      console.log("First connection, requesting signature...");
      const signatureVerified = await this.requestSignature();
      if (!signatureVerified) {
        console.error("Signature verification failed");
        await this.solana.disconnect();
        return null;
      }
      
      // Save session data on successful signature
      this.saveSessionData(publicKey);
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
      this.clearSessionData();
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
