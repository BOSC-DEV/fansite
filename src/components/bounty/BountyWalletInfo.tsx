
import { Label } from "@/components/ui/label";
import { Coins, Copy, Check } from "lucide-react";
import { formatWalletAddress } from "@/utils/formatters";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";

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
      
      <div>
        <Label htmlFor="developer-wallet" className="text-western-wood">Developer Wallet</Label>
        <div className="flex items-center justify-between mt-1.5 bg-western-sand/10 border border-western-wood/30 rounded-sm p-2">
          <button 
            onClick={onCopyClick}
            className="flex items-center text-western-wood/80 hover:text-western-wood transition-colors"
          >
            <span className="font-mono text-xs">
              {formatWalletAddress(developerWalletAddress)}
            </span>
            {copied ? (
              <Check className="ml-2 h-4 w-4 text-green-600" />
            ) : (
              <Copy className="ml-2 h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
