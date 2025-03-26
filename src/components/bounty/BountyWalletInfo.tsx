
import { Label } from "@/components/ui/label";
import { Coins } from "lucide-react";

interface BountyWalletInfoProps {
  currentBounty: number;
  developerWalletAddress: string;
  copied: boolean;
  onCopyClick: () => void;
}

export function BountyWalletInfo({ 
  currentBounty, 
  developerWalletAddress, 
  copied, 
  onCopyClick 
}: BountyWalletInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="current-bounty" className="text-western-wood">Current Bounty</Label>
        <div className="flex items-center mt-1.5 bg-western-sand/10 border border-western-wood/30 rounded-sm p-2">
          <Coins className="h-4 w-4 text-western-accent mr-2" />
          <span className="font-medium text-western-accent">
            {currentBounty.toLocaleString()} SOL
          </span>
        </div>
      </div>
    </div>
  );
}

