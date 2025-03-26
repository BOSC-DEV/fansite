
import React, { useState } from "react";
import { useSolanaPrice } from "@/utils/priceUtils";

interface SolAmountProps {
  amount: number;
  className?: string;
}

export function SolAmount({ amount, className }: SolAmountProps) {
  const [showUsd, setShowUsd] = useState(false);
  const { data: solPrice, isLoading, isError } = useSolanaPrice();
  
  const formattedSol = `${amount.toLocaleString()} SOL`;
  let usdValue = "Loading...";
  
  if (!isLoading && !isError && solPrice) {
    const usdAmount = amount * solPrice;
    usdValue = `$${usdAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
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
      {showUsd ? usdValue : formattedSol}
    </span>
  );
}
