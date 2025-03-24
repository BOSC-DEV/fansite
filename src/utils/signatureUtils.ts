
import { toast } from "sonner";

/**
 * Requests a signature from a Phantom wallet to verify ownership
 * @param walletAddress The address to verify
 * @param message The message to sign
 * @returns Promise<boolean> True if signature is valid
 */
export async function requestSignature(
  walletAddress: string | null,
  message: string = "Verify wallet ownership to edit profile"
): Promise<boolean> {
  if (!walletAddress) {
    toast.error("Wallet address not available");
    return false;
  }
  
  if (!window.phantom?.solana) {
    toast.error("Phantom wallet not detected");
    return false;
  }
  
  try {
    console.log(`[SignatureUtils] Requesting signature for address: ${walletAddress}`);
    // Encode the message as bytes
    const encodedMessage = new TextEncoder().encode(message);
    
    // Request signature from Phantom wallet
    const signResult = await window.phantom.solana.signMessage(encodedMessage, "utf8");
    
    if (!signResult.signature) {
      toast.error("Signature request was rejected");
      return false;
    }
    
    console.log("[SignatureUtils] Signature successful:", signResult.signature);
    toast.success("Identity verified successfully");
    return true;
  } catch (error) {
    console.error("[SignatureUtils] Error requesting signature:", error);
    toast.error("Failed to verify wallet ownership");
    return false;
  }
}
