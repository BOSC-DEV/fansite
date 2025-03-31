
import { useQuery } from "@tanstack/react-query";

// Fetch current Solana price from CoinGecko API
export const fetchSolanaPrice = async (): Promise<number> => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch Solana price");
    }
    
    const data = await response.json();
    return data.solana.usd;
  } catch (error) {
    console.error("Error fetching Solana price:", error);
    throw error; // Let React Query handle the error
  }
};

// Custom hook to use Solana price with caching
export const useSolanaPrice = () => {
  return useQuery({
    queryKey: ["solanaPrice"],
    queryFn: fetchSolanaPrice,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 2, // Retry twice if the request fails
  });
};

// Format SOL amount with USD value
export const formatSolWithUsd = (solAmount: number, solPrice: number | undefined) => {
  if (!solPrice) return `${solAmount.toLocaleString()} SOL`;
  
  const usdValue = solAmount * solPrice;
  return `${solAmount.toLocaleString()} SOL ($${usdValue.toLocaleString(undefined, { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })} USD)`;
};
