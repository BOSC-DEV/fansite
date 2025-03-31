
import { Card, CardContent } from "@/components/ui/card";
import { BountyHeader } from "./bounty/BountyHeader";
import { BountyWalletInfo } from "./bounty/BountyWalletInfo";
import { BountyAmountInput } from "./bounty/BountyAmountInput";
import { BountyFooter } from "./bounty/BountyFooter";
import { BountyContributorsList } from "./bounty/BountyContributorsList";
import { useBountyContribution } from "./bounty/useBountyContribution";
import { useBountyContributors } from "@/hooks/bounty/useBountyContributors";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { useIsMobile } from "@/hooks/use-mobile";

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
    message,
    handleAmountChange,
    handleMessageChange,
    isSubmitting,
    copied,
    copyToClipboard,
    handleContribute,
    isConnected
  } = useBountyContribution(scammerId, scammerName, currentBounty);

  const { contributors, isLoading: isLoadingContributors } = useBountyContributors(scammerId);
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      <Card className={`border-western-wood bg-western-parchment/70 ${isMobile ? 'pb-4' : ''}`}>
        <BountyHeader scammerName={scammerName} />
        
        <CardContent className="pt-6">
          <BountyWalletInfo 
            currentBounty={currentBounty}
            developerWalletAddress={DEVELOPER_WALLET_ADDRESS}
            copied={copied}
            onCopyClick={copyToClipboard}
          />
          
          <BountyAmountInput 
            amount={amount}
            message={message}
            onChange={handleAmountChange}
            onMessageChange={handleMessageChange}
          />
        </CardContent>
        
        <BountyFooter 
          isConnected={isConnected}
          isSubmitting={isSubmitting}
          amount={amount}
          onContribute={handleContribute}
        />
      </Card>
      
      <BountyContributorsList 
        scammerId={scammerId}
        contributors={contributors}
        isLoading={isLoadingContributors}
      />
    </div>
  );
}
