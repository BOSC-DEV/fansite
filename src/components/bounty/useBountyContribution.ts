
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { scammerService as localScammerService } from "@/services/storage/localStorage/scammerService";
import { scammerService } from "@/services/storage/scammer/scammerService";
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";
import { ScammerListing as LocalScammerListing } from "@/services/storage/localStorage/scammerService";
import { ScammerListing as SupabaseScammerListing } from "@/services/storage/scammer/scammerTypes";

export function useBountyContribution(scammerId: string, scammerName: string, currentBounty: number) {
  const { isConnected, address, connectWallet } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimals
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(DEVELOPER_WALLET_ADDRESS)
      .then(() => {
        setCopied(true);
        toast.success("Address copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy address");
      });
  };

  // Check if Solana is available and connected
  const checkWallet = async () => {
    if (!window.phantom?.solana) {
      toast.error("Phantom wallet not installed", {
        description: "Please install Phantom wallet extension"
      });
      return false;
    }
    
    // Double-check wallet connection status
    const isWalletConnected = isConnected && !!address && window.phantom?.solana?.isConnected;
    
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first", {
        description: "Your wallet is not currently connected"
      });
      
      // Try to reconnect the wallet
      try {
        await connectWallet();
        return window.phantom?.solana?.isConnected || false;
      } catch (error) {
        console.error("Failed to reconnect wallet:", error);
        return false;
      }
    }
    
    return true;
  };

  // Handle the actual SOL transfer
  const transferSol = async (receiverAddress: string, solAmount: number) => {
    try {
      // Ensure we have a valid receiver address
      const toPublicKey = new PublicKey(receiverAddress);
      
      if (!window.phantom?.solana?.publicKey) {
        throw new Error("Wallet public key not available");
      }
      
      // Convert the phantom wallet publicKey to a proper Solana PublicKey object
      const fromPublicKey = new PublicKey(window.phantom.solana.publicKey.toString());
      
      // Create a connection to Solana
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      
      // Create a transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromPublicKey,
          toPubkey: toPublicKey,
          lamports: solAmount * LAMPORTS_PER_SOL
        })
      );
      
      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = fromPublicKey;
      
      // Request signature from the user
      const { signature } = await window.phantom.solana.signAndSendTransaction(transaction);
      
      // Wait for transaction confirmation
      await connection.confirmTransaction(signature);
      
      console.log("Transaction confirmed:", signature);
      return { success: true, signature };
    } catch (error) {
      console.error("Error during SOL transfer:", error);
      throw error;
    }
  };

  const handleContribute = async () => {
    console.log("Current wallet connection state:", { isConnected, address });
    
    // Validate wallet connection
    const walletReady = await checkWallet();
    if (!walletReady) {
      return;
    }

    // Validate amount
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    try {
      // Verify wallet connection again before proceeding
      if (!window.phantom?.solana?.isConnected) {
        throw new Error("Phantom wallet is not connected");
      }

      // Convert amount from string to number
      const solAmount = parseFloat(amount);
      
      // Try to get the scammer from the Supabase service first
      let scammer: SupabaseScammerListing | LocalScammerListing | null = 
        await scammerService.getScammer(scammerId);
      
      // If not found in Supabase, try the localStorage service
      if (!scammer) {
        scammer = await localScammerService.getScammer(scammerId);
      }
      
      // If still not found, create a basic record
      if (!scammer) {
        console.log("Creating new scammer record for bounty contribution");
        scammer = {
          id: scammerId,
          name: scammerName,
          photoUrl: "",
          accusedOf: "",
          links: [],
          aliases: [],
          accomplices: [],
          officialResponse: "",
          bountyAmount: currentBounty || 0,
          walletAddress: "",
          dateAdded: new Date().toISOString(),
          addedBy: address || "unknown",
          comments: [], // Ensure comments is always an array
          likes: 0,
          dislikes: 0,
          views: 0
        };
      } else if (!Array.isArray(scammer.comments)) {
        // Ensure comments is an array if it exists but isn't one
        scammer.comments = [];
      }
      
      console.log("Found/created scammer:", scammer.name, "with ID:", scammerId);
      
      // Transfer SOL to the developer wallet
      const result = await transferSol(DEVELOPER_WALLET_ADDRESS, solAmount);
      
      if (!result.success) {
        throw new Error("Transaction failed to complete");
      }
      
      // Update the bounty amount - increment by the amount in SOL tokens
      const newBounty = (scammer.bountyAmount || 0) + solAmount;
      scammer.bountyAmount = newBounty;
      
      // Save to both storage services to ensure consistency
      
      // Save to localStorage service first
      await localScammerService.saveScammer({
        ...scammer,
        comments: Array.isArray(scammer.comments) ? scammer.comments : []
      });
      
      // Try to save to Supabase service if it exists
      try {
        if (typeof scammerService.saveScammer === 'function') {
          // Create a version of the scammer object compatible with Supabase service
          const scammerForSupabase: SupabaseScammerListing = {
            ...scammer,
            comments: Array.isArray(scammer.comments) ? scammer.comments : []
          };
          await scammerService.saveScammer(scammerForSupabase);
        }
      } catch (err) {
        console.log("Note: Could not save to Supabase service, but localStorage succeeded");
      }
      
      toast.success(`Successfully contributed ${amount} SOL to the bounty!`);
      
      // Reset the form
      setAmount("");
      
      // Reload the page after a short delay to show the updated bounty
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error contributing to bounty:", error);
      toast.error(`Failed to contribute to bounty: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    amount,
    setAmount,
    handleAmountChange,
    isSubmitting,
    copied,
    copyToClipboard,
    handleContribute,
    isConnected
  };
}
