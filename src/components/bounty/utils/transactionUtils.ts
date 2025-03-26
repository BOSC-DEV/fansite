
import { 
  Connection, 
  PublicKey, 
  LAMPORTS_PER_SOL, 
  Transaction, 
  SystemProgram,
  clusterApiUrl
} from "@solana/web3.js";
import { toast } from "sonner";

// Use Solana's mainnet beta RPC endpoint for reliability
const SOLANA_RPC_URL = clusterApiUrl('mainnet-beta');

/**
 * Handles the SOL transfer with proper error handling
 */
export const transferSol = async (
  receiverAddress: string, 
  solAmount: number
): Promise<{ success: boolean; signature?: string }> => {
  try {
    // Validate input parameters
    if (!receiverAddress || !solAmount || solAmount <= 0) {
      throw new Error("Invalid parameters for transfer");
    }
    
    // Check if wallet is connected
    if (!window.phantom?.solana?.isConnected || !window.phantom?.solana?.publicKey) {
      throw new Error("Wallet not connected");
    }
    
    // Ensure we have a valid receiver address
    const toPublicKey = new PublicKey(receiverAddress);
    
    // Convert the phantom wallet publicKey to a proper Solana PublicKey object
    const fromPublicKey = new PublicKey(window.phantom.solana.publicKey.toString());
    
    // Create a connection to Solana
    const connection = new Connection(SOLANA_RPC_URL, "confirmed");
    
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
    
    // Get the latest blockhash
    const { blockhash } = await connection.getLatestBlockhash('confirmed');
    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromPublicKey;
    
    console.log("Sending transaction with params:", {
      fromAddress: fromPublicKey.toString(),
      toAddress: toPublicKey.toString(),
      amount: solAmount,
      lamports: requiredLamports
    });
    
    // Request signature from the user
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
    
  } catch (error) {
    console.error("Error during SOL transfer:", error);
    throw error;
  }
};
