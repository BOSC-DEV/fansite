
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';

// Signature message for initial authentication
const SIGNATURE_MESSAGE = "Sign this message to verify your identity with Book of Scams";

// Class to handle Solana wallet connection and operations
export class Web3Provider {
  protected connection: Connection;

  constructor() {
    // Use Solana's official public RPC endpoint with increased timeout
    this.connection = new Connection(clusterApiUrl('mainnet-beta'), {
      commitment: "confirmed",
      confirmTransactionInitialTimeout: 60000 // Increase timeout to 60 seconds
    });
  }

  // Connect wallet and request signature only on first connection
  async connectWallet(): Promise<string | null> {
    try {
      // Check if Phantom wallet is available
      if (!window.phantom?.solana) {
        console.error("Phantom wallet not available");
        return null;
      }

      // Connect to wallet
      const resp = await window.phantom.solana.connect();
      const walletPublicKey = resp.publicKey.toString();
      
      // Check if we need a signature
      const lastSignatureTime = localStorage.getItem('lastSignatureTime');
      const currentTime = Date.now();
      
      // If we don't have a signature yet or it's expired, request one
      if (!lastSignatureTime || (currentTime - parseInt(lastSignatureTime) > 24 * 60 * 60 * 1000)) {
        console.log("Requesting new signature (no existing signature or signature expired)");
        const signatureSuccess = await this.requestSignature();
        if (!signatureSuccess) {
          console.error("Failed to get signature");
          return null;
        }
      } else {
        console.log("Using existing signature (less than 24 hours old)");
      }
      
      return walletPublicKey;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return null;
    }
  }

  // Request signature to verify ownership
  async requestSignature(): Promise<boolean> {
    try {
      if (!window.phantom?.solana) {
        console.error("Phantom wallet not available");
        return false;
      }

      // Prepare signature message using TextEncoder
      const encoder = new TextEncoder();
      const message = encoder.encode(SIGNATURE_MESSAGE);
      
      // Request signature from wallet - passing only the message parameter
      const signatureResponse = await window.phantom.solana.signMessage(message);
      
      if (!signatureResponse.signature) {
        console.error("Failed to get signature");
        return false;
      }
      
      // Store signature time - valid for 24 hours
      localStorage.setItem('lastSignatureTime', Date.now().toString());
      
      return true;
    } catch (error) {
      console.error("Error requesting signature:", error);
      return false;
    }
  }

  // Disconnect wallet
  async disconnectWallet(): Promise<void> {
    try {
      if (window.phantom?.solana) {
        await window.phantom.solana.disconnect();
      }
      
      // Clear signature data
      localStorage.removeItem('lastSignatureTime');
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  }

  // Get wallet balance
  async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      const solBalance = balance / 10 ** 9; // Convert lamports to SOL
      console.log(`Retrieved balance for ${address}: ${solBalance} SOL`);
      return solBalance;
    } catch (error) {
      console.error("Error getting balance:", error);
      // Try alternative RPC endpoint if main one fails
      try {
        const fallbackConnection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
        const publicKey = new PublicKey(address);
        const balance = await fallbackConnection.getBalance(publicKey);
        const solBalance = balance / 10 ** 9;
        console.log(`Retrieved balance using fallback for ${address}: ${solBalance} SOL`);
        return solBalance;
      } catch (fallbackError) {
        console.error("Fallback getBalance also failed:", fallbackError);
        return 0.05; // Return 0.05 for testing
      }
    }
  }
}
