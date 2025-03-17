
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTRACT_ADDRESSES } from "@/contracts/contract-abis";
import { useWallet } from "@/context/WalletContext";
import { Skull, FileText, Circle } from "lucide-react";

interface NetworkMapItem {
  name: string;
  contractAddresses: {
    boscToken: string;
    bookOfScams: string;
  };
}

const NETWORKS: Record<number, NetworkMapItem> = {
  1: {
    name: "Ethereum Mainnet",
    contractAddresses: CONTRACT_ADDRESSES[1]
  },
  5: {
    name: "Goerli Testnet",
    contractAddresses: CONTRACT_ADDRESSES[5]
  },
  11155111: {
    name: "Sepolia Testnet",
    contractAddresses: CONTRACT_ADDRESSES[11155111]
  },
  137: {
    name: "Polygon",
    contractAddresses: CONTRACT_ADDRESSES[137]
  }
};

export const DeployContracts = () => {
  const { provider, account } = useWallet();
  const [networkId, setNetworkId] = useState<number | null>(null);
  
  useEffect(() => {
    const fetchNetworkId = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        setNetworkId(Number(network.chainId));
      }
    };
    
    fetchNetworkId();
  }, [provider]);

  const getNetworkInfo = () => {
    if (!networkId) return { name: "Unknown Network", contractAddresses: { boscToken: "", bookOfScams: "" } };
    return NETWORKS[networkId] || { name: `Network #${networkId}`, contractAddresses: { boscToken: "", bookOfScams: "" } };
  };

  const networkInfo = getNetworkInfo();

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-md wanted-poster-border paper-texture">
      <div className="flex items-center justify-center mb-4 gap-2">
        <Skull className="h-6 w-6 text-western-accent" />
        <h2 className="text-2xl font-wanted text-western-accent">Contract Information</h2>
        <Skull className="h-6 w-6 text-western-accent" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Circle className="h-3 w-3 text-western-leather" fill={networkId ? "#8B4513" : "none"} />
          <p className="font-western text-western-leather">
            Connected to: <span className="font-bold">{networkInfo.name}</span>
          </p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-western-accent mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold font-western">$BOSC Token</p>
              <p className="text-xs font-mono break-all bg-western-parchment/50 p-1 rounded border border-western-wood/30">
                {networkInfo.contractAddresses.boscToken || "Not deployed on this network"}
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <FileText className="h-5 w-5 text-western-accent mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm font-bold font-western">Book of Scams Registry</p>
              <p className="text-xs font-mono break-all bg-western-parchment/50 p-1 rounded border border-western-wood/30">
                {networkInfo.contractAddresses.bookOfScams || "Not deployed on this network"}
              </p>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full western-btn"
            disabled={!account}
          >
            View on Block Explorer
          </Button>
        </div>
      </div>
    </div>
  );
};

