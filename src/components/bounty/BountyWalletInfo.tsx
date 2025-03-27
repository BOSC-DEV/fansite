
import { Label } from "@/components/ui/label";
import { SolAmount } from "@/components/SolAmount";

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
          <span className="font-medium text-western-accent">
            <SolAmount amount={currentBounty} />
          </span>
        </div>
      </div>
    </div>
  );
}
