
import React from "react";
import { SolAmount } from "@/components/SolAmount";

interface WalletInfoProps {
  address: string;
  balance: number | null;
}

export const WalletInfo = ({ address, balance }: WalletInfoProps) => {
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="flex flex-col items-end">
      <span className="text-xs text-western-parchment/70">
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
