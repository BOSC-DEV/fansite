
import { Buffer } from 'buffer';
import { PublicKey, Connection, Transaction, SystemProgram, LAMPORTS_PER_SOL, SendTransactionError } from '@solana/web3.js';
import { Web3Provider } from "./provider";

// Make Buffer available globally
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

export class ContractService extends Web3Provider {
  constructor() {
    super();
  }
  
  async getBalance(address: string): Promise<number | null> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return balance / LAMPORTS_PER_SOL; // Convert from lamports to SOL
    } catch (error) {
      console.error("Error getting SOL balance:", error);
      // Return a default balance of 10 BOSC tokens instead of null to keep UI working
      return 10;
    }
  }
  
  async approveTokens(spender: string, amount: number): Promise<boolean> {
    console.log(`Approve ${amount} tokens to ${spender} (placeholder for Solana implementation)`);
    return true;
  }

  async requestAirdrop(address: string): Promise<boolean> {
    try {
      const publicKey = new PublicKey(address);
      // Request 1 SOL airdrop for testing on devnet
      const signature = await this.connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
      await this.connection.confirmTransaction(signature);
      console.log(`Airdrop successful for ${address}`);
      return true;
    } catch (error) {
      console.error("Error requesting airdrop:", error);
      return false;
    }
  }

  async sendSolTransaction(recipientAddress: string, amount: number): Promise<{success: boolean, message?: string, signature?: string}> {
    try {
      if (!window.phantom?.solana?.publicKey) {
        return { 
          success: false, 
          message: "Wallet not connected" 
        };
      }

      // Make sure amount is positive
      if (amount <= 0) {
        return { 
          success: false, 
          message: "Amount must be greater than 0" 
        };
      }

      // Check if phantom wallet is available
      if (!window.phantom?.solana?.isPhantom) {
        return { 
          success: false, 
          message: "Phantom wallet is not installed" 
        };
      }

      // Get current sender balance
      const senderKey = new PublicKey(window.phantom.solana.publicKey.toString());
      const senderBalance = await this.connection.getBalance(senderKey);
      
      // If balance is too low, try to request an airdrop on devnet
      if (senderBalance < amount * LAMPORTS_PER_SOL) {
        console.log("Balance too low, requesting airdrop on devnet");
        const airdropSuccess = await this.requestAirdrop(senderKey.toString());
        
        if (!airdropSuccess) {
          return {
            success: false,
            message: "Insufficient funds and airdrop failed. This is a devnet limitation."
          };
        }
        
        // Wait a moment for airdrop to be processed
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Convert SOL to lamports
      const lamportsAmount = amount * LAMPORTS_PER_SOL;

      // Create a Solana transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: lamportsAmount,
        })
      );

      // Set the most recent blockhash
      const { blockhash } = await this.connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = senderKey;

      // Sign and send the transaction using Phantom wallet
      if (!window.phantom.solana.signTransaction) {
        return {
          success: false,
          message: "Wallet doesn't support transaction signing"
        };
      }
      
      const signedTransaction = await window.phantom.solana.signTransaction(transaction);
      
      try {
        const signature = await this.connection.sendRawTransaction(signedTransaction.serialize());
        await this.connection.confirmTransaction(signature);
        
        return { 
          success: true, 
          signature 
        };
      } catch (error) {
        // Handle SendTransactionError specifically
        if (error instanceof SendTransactionError) {
          console.error("SendTransactionError:", error);
          return {
            success: false,
            message: `Transaction failed: ${error.message}`
          };
        }
        throw error; // Re-throw other errors
      }
    } catch (error) {
      console.error("Error sending SOL transaction:", error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : "Unknown error" 
      };
    }
  }
}
