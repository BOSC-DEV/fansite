
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { ArrowRight, Coins } from "lucide-react";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { storageService } from "@/services/storage/localStorageService";

interface BountyContributionProps {
  scammerId: string;
  currentBounty: number;
  scammerName: string;
}

export function BountyContribution({ 
  scammerId, 
  currentBounty, 
  scammerName 
}: BountyContributionProps) {
  const { isConnected, address } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and decimals
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleContribute = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would call a smart contract
      // For now, we'll just update the local storage
      
      // Get the current scammer data
      const scammer = storageService.getScammer(scammerId);
      if (!scammer) {
        throw new Error("Scammer not found");
      }
      
      // Update the bounty amount
      const newBounty = (scammer.bountyAmount || 0) + parseFloat(amount);
      scammer.bountyAmount = newBounty;
      
      // Save the updated scammer
      storageService.saveScammer(scammer);
      
      toast.success(`Successfully contributed ${amount} $BOSC to the bounty!`);
      
      // Reset the form
      setAmount("");
      
      // Reload the page to show the updated bounty
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error contributing to bounty:", error);
      toast.error("Failed to contribute to bounty. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-western-wood bg-western-parchment/70">
      <CardHeader className="border-b border-western-wood/20">
        <CardTitle className="text-western-accent font-wanted">Contribute to Bounty</CardTitle>
        <CardDescription className="text-western-wood">
          Add $BOSC tokens to increase the bounty for {scammerName}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="current-bounty" className="text-western-wood">Current Bounty</Label>
            <div className="flex items-center mt-1.5 bg-western-sand/10 border border-western-wood/30 rounded-sm p-2">
              <Coins className="h-4 w-4 text-western-accent mr-2" />
              <span className="font-medium text-western-accent">
                {currentBounty.toLocaleString()} $BOSC
              </span>
            </div>
          </div>
          
          <div>
            <Label htmlFor="developer-wallet" className="text-western-wood">Developer Wallet</Label>
            <div className="flex items-center mt-1.5 bg-western-sand/10 border border-western-wood/30 rounded-sm p-2">
              <span className="text-xs font-mono text-western-wood/80 truncate">
                {DEVELOPER_WALLET_ADDRESS}
              </span>
            </div>
          </div>
          
          <Separator className="my-4 bg-western-wood/20" />
          
          <div>
            <Label htmlFor="amount" className="text-western-wood">Contribution Amount</Label>
            <div className="flex mt-1.5">
              <Input
                id="amount"
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                className="bg-western-parchment border-western-wood/50 text-western-wood"
              />
              <div className="flex items-center justify-center bg-western-sand/20 border border-western-wood/30 border-l-0 px-3 rounded-r-sm">
                <span className="text-sm font-medium text-western-wood">$BOSC</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-western-wood/20 bg-western-sand/10 flex justify-between">
        {isConnected ? (
          <Button 
            onClick={handleContribute}
            disabled={isSubmitting || !amount || parseFloat(amount) <= 0}
            className="w-full bg-western-accent hover:bg-western-accent/90 text-western-parchment"
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Contribute to Bounty
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <div className="w-full text-center text-western-wood">
            Connect your wallet to contribute
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
