
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";
import { ArrowRightIcon, WalletIcon, BadgeInfo } from "lucide-react";

interface BountyContributionProps {
  scammerId: string;
  scammerName: string;
  currentBounty: number;
  walletAddress: string;
  onContribute?: (amount: number) => void;
}

// Developer controlled wallet address - this would typically be stored more securely
const DEVELOPER_WALLET_ADDRESS = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";

export function BountyContribution({
  scammerId,
  scammerName,
  currentBounty,
  walletAddress,
  onContribute,
}: BountyContributionProps) {
  const [amount, setAmount] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, balance, connectWallet } = useWallet();

  const handleContribute = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (balance !== null && numAmount > balance) {
      toast.error("Insufficient $BOSC balance");
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate transaction delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Log to console - in a real app this would be an API call
      console.log(`Contributing ${numAmount} $BOSC tokens to bounty for ${scammerName}`);
      console.log(`Funds are sent to developer-controlled wallet: ${DEVELOPER_WALLET_ADDRESS}`);
      console.log(`Original scammer wallet address for reference: ${walletAddress}`);
      
      toast.success(`Successfully contributed ${numAmount} $BOSC tokens to the bounty`);
      if (onContribute) {
        onContribute(numAmount);
      }
      setAmount("");
    } catch (error) {
      toast.error("Failed to contribute to bounty. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAmounts = [10, 50, 100, 500];

  return (
    <Card className="border border-border/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Contribute to Bounty</CardTitle>
        <CardDescription>
          Add $BOSC tokens to increase the bounty for {scammerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($BOSC Tokens)</Label>
          <div className="flex space-x-2">
            <Input
              id="amount"
              placeholder="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              min="0"
              step="1"
              className="flex-1"
            />
            <span className="flex items-center font-medium text-sm px-3 border rounded-md bg-muted/50">
              $BOSC
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {presetAmounts.map((presetAmount) => (
            <Button
              key={presetAmount}
              variant="outline"
              size="sm"
              onClick={() => setAmount(presetAmount.toString())}
              className="flex-1 min-w-[60px]"
            >
              {presetAmount}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-between py-2 px-3 bg-muted/50 rounded-md">
          <span className="text-sm text-muted-foreground">Current Bounty</span>
          <span className="font-medium">{currentBounty} $BOSC</span>
        </div>

        <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-md text-xs text-muted-foreground">
          <BadgeInfo className="h-4 w-4 text-blue-500 flex-shrink-0" />
          <p>All bounty wallets are controlled by the developer for security. Funds contribute to the token count displayed on the listing.</p>
        </div>

        <div className="text-xs text-muted-foreground pt-2">
          <p>Developer controlled wallet address:</p>
          <code className="block mt-1 font-mono text-xs bg-muted/50 p-2 rounded overflow-x-auto">
            {DEVELOPER_WALLET_ADDRESS}
          </code>
        </div>
      </CardContent>
      <CardFooter>
        {isConnected ? (
          <Button 
            onClick={handleContribute} 
            className="w-full" 
            disabled={isSubmitting || !amount || Number(amount) <= 0}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                Contribute {amount ? `${amount} $BOSC` : "Bounty"}
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        ) : (
          <Button onClick={connectWallet} className="w-full">
            <WalletIcon className="mr-2 h-4 w-4" />
            Connect Wallet to Contribute
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default BountyContribution;
