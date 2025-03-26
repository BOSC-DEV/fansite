
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BountyFooterProps {
  isConnected: boolean;
  isSubmitting: boolean;
  amount: string;
  onContribute: () => Promise<void>;
}

export function BountyFooter({ 
  isConnected, 
  isSubmitting, 
  amount, 
  onContribute 
}: BountyFooterProps) {
  return (
    <div className="border-t border-western-wood/20 bg-western-sand/10 p-6 pt-4">
      {isConnected ? (
        <Button 
          onClick={onContribute}
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
    </div>
  );
}
