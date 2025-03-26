
import React from "react";
import { useSolanaPrice } from "@/utils/priceUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SolAmountProps {
  amount: number;
  className?: string;
}

export function SolAmount({ amount, className }: SolAmountProps) {
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className={className}>{formattedSol}</span>
        </TooltipTrigger>
        <TooltipContent>
          <p>{usdValue}</p>
          <p className="text-xs text-muted-foreground">Estimated Value</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
