
import React, { useState } from "react";
import { SolAmount } from "@/components/SolAmount";
import { Copy, Check } from "lucide-react";
import { copyAddressToClipboard } from "@/components/bounty/utils/walletUtils";

interface WalletInfoProps {
  address: string;
  balance: number | null;
}

export const WalletInfo = ({ address, balance }: WalletInfoProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleCopyAddress = async () => {
    const success = await copyAddressToClipboard(address);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center">
        <span 
          className="text-xs text-western-parchment/70 cursor-pointer hover:text-western-parchment"
          onClick={handleCopyAddress}
          title="Click to copy address"
        >
          {formatAddress(address)}
        </span>
        <button
          onClick={handleCopyAddress}
          className="ml-1 text-western-parchment/50 hover:text-western-parchment focus:outline-none"
          aria-label="Copy address to clipboard"
        >
          {isCopied ? 
            <Check className="h-3 w-3" /> : 
            <Copy className="h-3 w-3" />
          }
        </button>
      </div>
      <div className="flex items-center text-xs font-bold text-western-sand">
        <img 
          src="/lovable-uploads/b56ce7fa-4bb2-4920-b10e-4b0c6907f0ec.png" 
          alt="SOL"
          className="h-4 w-4 mr-1" 
          style={{ objectFit: "contain" }}
        />
        {balance !== null ? (
          <span><SolAmount amount={balance} /></span>
        ) : (
          <span>0.00 SOL</span>
        )}
      </div>
    </div>
  );
};

export default WalletInfo;
