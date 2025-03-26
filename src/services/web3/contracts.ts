
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';
import { toast } from 'sonner';

export class ContractService {
  private connection: Connection;
  
  constructor() {
    // Use Solana devnet for testing
    this.connection = new Connection("https://api.devnet.solana.com", "confirmed");
  }
  
  // Get the balance of the current wallet
  async getBalance(): Promise<number | null> {
    try {
      if (!window.phantom?.solana?.publicKey) {
        return null;
      }
      
      const balance = await this.connection.getBalance(window.phantom.solana.publicKey);
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
      const signature = await this.connection.requestAirdrop(
        window.phantom.solana.publicKey,
        2 * LAMPORTS_PER_SOL
      );
      
      await this.connection.confirmTransaction(signature);
      console.log("Airdrop successful for", window.phantom.solana.publicKey.toString());
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
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: window.phantom.solana.publicKey,
          toPubkey: toPublicKey,
          lamports: solAmount * LAMPORTS_PER_SOL
        })
      );
      
      // Set the recent blockhash and fee payer
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = window.phantom.solana.publicKey;
      
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
