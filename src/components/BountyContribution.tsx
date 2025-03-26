
import { Card, CardContent } from "@/components/ui/card";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { BountyHeader } from "./bounty/BountyHeader";
import { BountyWalletInfo } from "./bounty/BountyWalletInfo";
import { BountyAmountInput } from "./bounty/BountyAmountInput";
import { BountyFooter } from "./bounty/BountyFooter";
import { useBountyContribution } from "./bounty/useBountyContribution";

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
  const {
    amount,
    handleAmountChange,
    isSubmitting,
    copied,
    copyToClipboard,
    handleContribute,
    isConnected
  } = useBountyContribution(scammerId, scammerName, currentBounty);

  return (
    <Card className="border-western-wood bg-western-parchment/70">
      <BountyHeader scammerName={scammerName} />
      
      <CardContent className="pt-6">
        <BountyWalletInfo 
          currentBounty={currentBounty}
          developerWalletAddress={"TBC"}
          copied={copied}
          onCopyClick={copyToClipboard}
        />
        
        <BountyAmountInput 
          amount={amount}
          onChange={handleAmountChange}
        />
      </CardContent>
      
      <BountyFooter 
        isConnected={isConnected}
        isSubmitting={isSubmitting}
        amount={amount}
        onContribute={handleContribute}
      />
    </Card>
  );
}
