
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { checkWallet, copyAddressToClipboard } from "./utils/walletUtils";
import { transferSol } from "./utils/transactionUtils";
import { getOrCreateScammer, updateScammerBounty } from "./utils/scammerUtils";

export function useBountyContribution(
  scammerId: string, 
  scammerName: string, 
  currentBounty: number
) {
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
    copyAddressToClipboard(DEVELOPER_WALLET_ADDRESS)
      .then((success) => {
        if (success) {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      });
  };

  const handleContribute = async () => {
    try {
      console.log("Current wallet connection state:", { isConnected, address });
      
      // Validate wallet connection
      if (!isConnected) {
        toast.error("Please connect your wallet first");
        try {
          await connectWallet();
          // Check again after connection attempt
          if (!window.phantom?.solana?.isConnected) {
            return;
          }
        } catch (error) {
          console.error("Failed to connect wallet:", error);
          return;
        }
      }

      // Validate amount
      if (!amount || parseFloat(amount) <= 0) {
        toast.error("Please enter a valid amount");
        return;
      }

      setIsSubmitting(true);

      // Verify wallet connection again before proceeding
      if (!window.phantom?.solana?.isConnected) {
        throw new Error("Phantom wallet is not connected");
      }

      // Convert amount from string to number
      const solAmount = parseFloat(amount);
      
      // Get or create scammer record
      const scammer = await getOrCreateScammer(scammerId, scammerName, currentBounty, address);
      
      console.log("Found/created scammer:", scammer.name, "with ID:", scammerId);
      
      // Transfer SOL to the developer wallet
      toast.info("Please confirm the transaction in your wallet");
      
      const result = await transferSol(DEVELOPER_WALLET_ADDRESS, solAmount);
      
      if (!result.success) {
        throw new Error("Transaction failed to complete");
      }
      
      toast.success("Transaction confirmed!");
      
      // Update the scammer record with new bounty amount
      await updateScammerBounty(scammer, solAmount);
      
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
