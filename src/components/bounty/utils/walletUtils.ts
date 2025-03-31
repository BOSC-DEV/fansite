
import { toast } from "sonner";

/**
 * Checks if the wallet is connected and ready for transactions
 */
export const checkWallet = async (): Promise<boolean> => {
  if (!window.phantom?.solana) {
    toast.error("Phantom wallet not installed", {
      description: "Please install Phantom wallet extension"
    });
    return false;
  }
  
  // Check wallet connection status
  const isWalletConnected = window.phantom?.solana?.isConnected;
  
  if (!isWalletConnected) {
    toast.error("Please connect your wallet first", {
      description: "Your wallet is not currently connected"
    });
    return false;
  }
  
  return true;
};

/**
 * Copies an address to clipboard
 */
export const copyAddressToClipboard = (address: string): Promise<boolean> => {
  return navigator.clipboard.writeText(address)
    .then(() => {
      toast.success("Address copied to clipboard");
      return true;
    })
    .catch(() => {
      toast.error("Failed to copy address");
      return false;
    });
};
