import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from 'sonner';

export class ContractService {
  private connection: Connection;
  
  constructor() {
    // Use Solana devnet for testing
    this.connection = new Connection("https://api.devnet.solana.com", "confirmed");
  }
  
  // Get the balance of the current wallet
  async getBalance(walletAddress?: string): Promise<number | null> {
    try {
      let publicKey: PublicKey;
      
      if (walletAddress) {
        // If a wallet address is provided, use it
        publicKey = new PublicKey(walletAddress);
      } else if (window.phantom?.solana?.publicKey) {
        // Otherwise try to use the connected wallet
        publicKey = new PublicKey(window.phantom.solana.publicKey.toString());
      } else {
        return null;
      }
      
      const balance = await this.connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL;
    } catch (error) {
      console.error("Error getting balance:", error);
      return null;
    }
  }
  
  // Airdrop SOL to the connected wallet (only works on devnet)
  async requestAirdrop(): Promise<boolean> {
    try {
      if (!window.phantom?.solana?.publicKey) {
        return false;
      }
      
      console.log("Balance too low, requesting airdrop on devnet");
      // Convert the string public key to a Solana PublicKey object
      const publicKey = new PublicKey(window.phantom.solana.publicKey.toString());
      const signature = await this.connection.requestAirdrop(
        publicKey,
        2 * LAMPORTS_PER_SOL
      );
      
      await this.connection.confirmTransaction(signature);
      console.log("Airdrop successful for", publicKey.toString());
      return true;
    } catch (error) {
      console.error("Error requesting airdrop:", error);
      return false;
    }
  }
  
  // Send a SOL transaction
  async sendSolTransaction(
    receiverAddress: string, 
    solAmount: number
  ): Promise<{ success: boolean; message?: string; signature?: string }> {
    try {
      if (!window.phantom?.solana?.publicKey) {
        return { success: false, message: "Wallet not connected" };
      }
      
      // Check balance
      const balance = await this.getBalance();
      if (balance === null || balance < solAmount) {
        // On devnet, we can request an airdrop
        const airdropSuccess = await this.requestAirdrop();
        if (!airdropSuccess) {
          return { success: false, message: "Insufficient balance" };
        }
      }
      
      // Create the transaction
      const toPublicKey = new PublicKey(receiverAddress);
      // Convert the phantom wallet publicKey to a proper Solana PublicKey object
      const fromPublicKey = new PublicKey(window.phantom.solana.publicKey.toString());
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports: solAmount * LAMPORTS_PER_SOL
        })
      );
      
      // Set the recent blockhash and fee payer
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;
      
      // Sign and send the transaction
      const { signature } = await window.phantom.solana.signAndSendTransaction(transaction);
      
      // Wait for confirmation
      await this.connection.confirmTransaction(signature);
      
      return { success: true, signature };
    } catch (error) {
      console.error("Error sending SOL transaction:", error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Transaction failed" 
      };
    }
  }
}
