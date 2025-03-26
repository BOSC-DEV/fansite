
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { storageService } from "@/services/storage/localStorageService";
import { ContractService } from "@/services/web3/contracts";

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

  const handleContribute = async () => {
    console.log("Current wallet connection state:", { isConnected, address });
    
    // Double-check wallet connection status
    const isWalletConnected = isConnected && !!address && !!window.phantom?.solana?.isConnected;
    
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first", {
        description: "Your wallet is not currently connected"
      });
      
      // Try to reconnect the wallet
      try {
        await connectWallet();
        toast.success("Wallet reconnected, please try again");
        return;
      } catch (error) {
        console.error("Failed to reconnect wallet:", error);
        return;
      }
    }

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
      
      // Create the Solana transaction
      const result = await contractService.sendSolTransaction(DEVELOPER_WALLET_ADDRESS, solAmount);
      
      if (!result.success) {
        throw new Error(result.message || "Transaction failed");
      }
      
      // Get the current scammer data
      const scammer = storageService.getScammer(scammerId);
      if (!scammer) {
        throw new Error("Scammer not found");
      }
      
      // Update the bounty amount - for now we increment by the same amount in BOSC tokens
      const newBounty = (scammer.bountyAmount || 0) + solAmount;
      scammer.bountyAmount = newBounty;
      
      // Save the updated scammer
      storageService.saveScammer(scammer);
      
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
