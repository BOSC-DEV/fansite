
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface WalletContextProps {
  address: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<string | null>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize wallet state from localStorage on mount
  useEffect(() => {
    const storedAddress = localStorage.getItem('walletAddress');
    if (storedAddress) {
      setAddress(storedAddress);
      setIsConnected(true);
    }
  }, []);

  // Connect wallet function
  const connectWallet = async (): Promise<string | null> => {
    setIsLoading(true);
    
    try {
      // Check if Phantom wallet is available
      if (!window.phantom?.solana) {
        console.error("Phantom wallet not found. Please install the extension.");
        toast.error("Phantom wallet not found. Please install the extension.");
        return null;
      }

      // Connect to the wallet
      const { publicKey } = await window.phantom.solana.connect();
      const walletAddress = publicKey.toString();
      
      console.log("Connected to wallet:", walletAddress);
      
      // Store in state and localStorage
      setAddress(walletAddress);
      setIsConnected(true);
      localStorage.setItem('walletAddress', walletAddress);
      
      return walletAddress;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = () => {
    try {
      if (window.phantom?.solana) {
        window.phantom.solana.disconnect();
      }
      
      // Clear state and localStorage
      setAddress(null);
      setIsConnected(false);
      localStorage.removeItem('walletAddress');
      
      console.log("Disconnected from wallet");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
    }
  };

  const contextValue: WalletContextProps = {
    address,
    isConnected,
    connectWallet,
    disconnectWallet,
    isLoading
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

// Custom hook to use the wallet context
export function useWallet(): WalletContextProps {
  const context = useContext(WalletContext);
  
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  
  return context;
}
