
import { 
  Connection, 
  PublicKey, 
  LAMPORTS_PER_SOL, 
  Transaction, 
  SystemProgram 
} from "@solana/web3.js";
import { toast } from "sonner";

/**
 * Handles the SOL transfer with proper error handling
 */
export const transferSol = async (
  receiverAddress: string, 
  solAmount: number
): Promise<{ success: boolean; signature?: string }> => {
  try {
    // Ensure we have a valid receiver address
    const toPublicKey = new PublicKey(receiverAddress);
    
    if (!window.phantom?.solana?.publicKey) {
      throw new Error("Wallet public key not available");
    }
    
    // Convert the phantom wallet publicKey to a proper Solana PublicKey object
    const fromPublicKey = new PublicKey(window.phantom.solana.publicKey.toString());
    
    // Create a connection to Solana - using mainnet-beta
    const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
    
    // Check balance before transfer
    const balance = await connection.getBalance(fromPublicKey);
    const requiredLamports = solAmount * LAMPORTS_PER_SOL;
    
    if (balance < requiredLamports) {
      throw new Error(`Insufficient balance. You need at least ${solAmount} SOL.`);
    }
    
    // Create a transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromPublicKey,
        toPubkey: toPublicKey,
        lamports: requiredLamports
      })
    );
    
    // Get the latest blockhash with more specific commitment
    const { blockhash } = await connection.getLatestBlockhash('finalized');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPublicKey;
    
    console.log("Sending transaction with params:", {
      fromAddress: fromPublicKey.toString(),
      toAddress: toPublicKey.toString(),
      amount: solAmount,
      lamports: requiredLamports
    });
    
    // Request signature from the user with proper error handling
    try {
      const { signature } = await window.phantom.solana.signAndSendTransaction(transaction);
      console.log("Transaction sent with signature:", signature);
      
      // Wait for transaction confirmation
      const status = await connection.confirmTransaction(signature, 'confirmed');
      
      if (status.value.err) {
        console.error("Transaction confirmed but failed:", status.value.err);
        throw new Error(`Transaction error: ${status.value.err}`);
      }
      
      console.log("Transaction confirmed successfully:", signature);
      return { success: true, signature };
    } catch (signError: any) {
      // Handle user rejection or signing errors
      if (signError.code === 4001) {
        throw new Error("Transaction rejected by user");
      }
      throw signError;
    }
  } catch (error) {
    console.error("Error during SOL transfer:", error);
    throw error;
  }
};
