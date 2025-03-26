
import { useState } from "react";
import { useWallet } from "@/context/wallet";
import { toast } from "sonner";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { storageService } from "@/services/storage/localStorageService";
import { ContractService } from "@/services/web3/contracts";
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from "@solana/web3.js";

export function useBountyContribution(scammerId: string, scammerName: string, currentBounty: number) {
  const { isConnected, address, connectWallet } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const contractService = new ContractService();

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
      
      // Request the user to send a transaction
      const connection = new Connection("https://api.devnet.solana.com", "confirmed");
      
      // Create a transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: window.phantom.solana.publicKey,
          toPubkey: toPublicKey,
          lamports: solAmount * LAMPORTS_PER_SOL
        })
      );
      
      // Get the latest blockhash
      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = window.phantom.solana.publicKey;
      
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
      
      // First, check if the scammer exists in our database
      const scammer = await storageService.getScammer(scammerId);
      if (!scammer) {
        throw new Error("Scammer not found in our database");
      }
      
      console.log("Found scammer:", scammer.name, "with ID:", scammerId);
      
      // Transfer SOL to the developer wallet
      const result = await transferSol(DEVELOPER_WALLET_ADDRESS, solAmount);
      
      if (!result.success) {
        throw new Error("Transaction failed to complete");
      }
      
      // Update the bounty amount - for now we increment by the amount in SOL tokens
      const newBounty = (scammer.bountyAmount || 0) + solAmount;
      scammer.bountyAmount = newBounty;
      
      // Save the updated scammer
      const saveResult = await storageService.saveScammer(scammer);
      
      if (!saveResult) {
        throw new Error("Failed to update scammer bounty");
      }
      
      toast.success(`Successfully contributed ${amount} SOL to the bounty!`);
      
      // Reset the form
      setAmount("");
      
      // Reload the page to show the updated bounty
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
