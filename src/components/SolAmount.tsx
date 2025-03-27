
import React, { useState } from "react";
import { useSolanaPrice } from "@/utils/priceUtils";
import { Coins } from "lucide-react";

interface SolAmountProps {
  amount: number;
  className?: string;
  showIcon?: boolean;
}

export function SolAmount({ amount, className, showIcon = false }: SolAmountProps) {
  const [showUsd, setShowUsd] = useState(false);
  const { data: solPrice, isLoading, isError } = useSolanaPrice();
  
  // Format with 2 decimal places instead of whole numbers
  const formattedSol = `${amount.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} SOL`;
  
  let usdValue = "Loading...";
  
  if (!isLoading && !isError && solPrice) {
    const usdAmount = amount * solPrice;
    usdValue = `$${usdAmount.toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })} USD`;
  } else if (isError) {
    usdValue = "Price unavailable";
  }

  return (
    <span 
      className={className}
      onMouseEnter={() => setShowUsd(true)}
      onMouseLeave={() => setShowUsd(false)}
    >
      {showIcon && (
        <img 
          src="/lovable-uploads/8c729ed2-b786-45d8-98ec-782f58195d12.png" 
          alt="SOL"
          className="h-4 w-4 mr-1 inline-block" 
        />
      )}
      {showUsd ? usdValue : formattedSol}
    </span>
  );
}
