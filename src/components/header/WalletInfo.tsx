
import React from "react";
import { SolAmount } from "@/components/SolAmount";
import { toast } from "sonner";

interface WalletInfoProps {
  address: string;
  balance: number | null;
}

export const WalletInfo = ({ address, balance }: WalletInfoProps) => {
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const copyAddressToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(address);
      toast.success("Address copied to clipboard", {
        duration: 2000,
        dismissible: true,
      });
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="flex flex-col items-end">
      <span 
        className="text-xs text-western-parchment/70 cursor-pointer hover:text-western-parchment"
        onClick={copyAddressToClipboard}
        title="Click to copy address"
      >
        {formatAddress(address)}
      </span>
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
