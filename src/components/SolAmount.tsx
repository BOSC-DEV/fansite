
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
  
  const formattedSol = `${amount.toLocaleString()} SOL`;
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
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iMTAwIj48cGF0aCBmaWxsPSIjQTY2N0Y4IiBkPSJNOTAuODA3IDUuNDRBNDAuOTM3IDQwLjkzNyAwIDAgMCA5Ny42MDcuODAzYTQyLjQ1NyA0Mi40NTcgMCAwIDEgOC4xMjggMTEuMDQgMTYuOTYzIDE2Ljk2MyAwIDAgMS0xNC45MjgtNi40MDNtLTU5LjU5MyAwYTE2Ljk2OCAxNi45NjggMCAwIDEtMTQuOTMgNi40MDNBNDI0OTUgNDIuNDk1IDAgMCAxIDI0LjQxMy44MDNhNDA5MzcgNDAuOTM3IDAgMCAwIDYuODAxIDQuNjM3TTEzLjI3NiA3MC4xNjJhNDAgNDAgMCAwIDAgMi4zMjggOC4wMTggMzguMjYyIDM4LjI2MiAwIDAgMS05LjEwMSAxLjAyNmMyLjczOC03LjYzIDE0LjcyNS04LjE5MSAxNC43MjUtOC4xOTFhMzguODgyIDM4Ljg4MiAwIDAgMC03Ljk1Mi0uODUzbTk1LjQ2OSAwYTM4LjI5NSAzOC4yOTUgMCAwIDAtNy45NTMuODUzcy4xOTkuMDEgMTQuNzI2IDguMTkxYTM4Ljc0IDM4Ljc0IDAgMCAxLTkuMTAxLTEuMDI2YzEuMTQtMi41ODUgMS45MTctNS4yNjQgMi4zMjgtOC4wMW0tODcuMzI1LTQwYTQxLjMxIDQxLjMxIDAgMCAwLTIuOTEzIDguMzk5IDM3Ljk5NiAzNy45OTYgMCAwIDEtNi4wNDQtNi44NjQgNDQuNTExIDQ0LjUxMSAwIDAgMSA2LjAyNC02LjM0OGMuNjQ0IDEuNTczIDEuNjMyIDMuMzUxIDIuOTMzIDQuODEzbTIuMTMzIDMyLjQxM2E0My43NDcgNDMuNzQ3IDAgMCAxLTkuOTktMS40MDhjLjQzNS0xLjcxOSAxLjIwNS0zLjQxNSAyLjI5LTUuMDlBNDQuNjAyIDQ0LjYwMiAwIDAgMSAxOS41IDYwYzEuNjM3LjgyOCAzLjI1MiAxLjAyIDQuMDUzIDEuMDU4bTQwLjQ0Ny00OC40Yy0xMC40MzggMC0xMi45MDQuNjI0LTE2LjggMy45LTQuMjEyIDMuNTQ5LTUuNjE5IDguMDgxLTYuMzk4IDEwLjc2NmEzNS43MjMgMzUuNzIzIDAgMCAwLS43NTUgMy4xNGg0Ny45MDZjLS4xODYtMS4wODItLjQ0LTIuMTUzLS43NTUtMy4xNC0uNzc5LTIuNjg1LTIuMTg2LTcuMjE3LTYuMzk4LTEwLjc2Ni0zLjg5Ni0zLjI3Ni02LjM2Mi0zLjktMTYuOC0zLjltMCA1NS4wNzRjMTAuNDM4IDAgMTIuOTA0LS42MjMgMTYuOC0zLjkgMy41MDctMi45NTMgNC45MzQtNi40OTYgNS44NTMtOS4wOTIuOTgtMi43NjcgMS4zMDEtNC44NjIgMS4zLTQuODU4SDI5LjA0N2MwIDAgLjMyMSAyLjA5MSAxLjMgNC44NTguOTIgMi41OTYgMi4zNDYgNi4xMzkgNS44NTMgOS4wOTIgMy44OTYgMy4yNzcgNi4zNjIgMy45IDE2LjggMy45TTQzLjI5NiA0My4xNzVINzguNzA0djEzLjYxM0g0My4yOTZWNDMuMTc1bTU4LjI2NSAxOS40MDJjLjguMDM3IDIuNDE2LjIzIDQuMDUyIDEuMDU3YTQ0LjYwMiA0NC42MDIgMCAwIDEgMy42NDgtNC4xNGMxLjA5NyAxLjY3NSAxLjg3NCAzLjM4NCAyLjMxNiA1LjEyMmwtLjAyNS0uMDMyYTQzLjc0NyA0My43NDcgMCAwIDEtOS45OSAxLjQwN202Ljk4Ni0yNC4xNDdjMC0xLjQ2NiAyLjI4OS0zLjQ2IDIuOTMzLTQuODEzYTQ0LjUxMSA0NC41MTEgMCAwIDEgNi4wMjQgNi4zNDhjLTEuOCAyLjM2NS0zLjgxNCA0LjczLTYuMDQ0IDYuODY0QTQxLjMxIDQxLjMxIDAgMCAwIDEwOC41NDcgNDIuNDN6Ii8+PC9zdmc+" 
          alt="SOL"
          className="h-4 w-4 mr-1 inline-block" 
        />
      )}
      {showUsd ? usdValue : formattedSol}
    </span>
  );
}
