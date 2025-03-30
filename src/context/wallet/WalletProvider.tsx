
import React, { useState, useEffect } from 'react';
import { WalletContext } from './WalletContext';

// Define the props for the WalletProvider component
interface WalletProviderProps {
  children: React.ReactNode;
}

// Create the WalletProvider component
const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to connect wallet
  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      // Check if window.ethereum is available
      if (window.ethereum) {
        console.log("Connecting to wallet...");
        
        try {
          // Request account access
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          
          if (accounts && accounts.length > 0) {
            console.log(`Connected to wallet: ${accounts[0]}`);
            setAddress(accounts[0]);
            localStorage.setItem('walletAddress', accounts[0]);
          } else {
            throw new Error("No accounts found");
          }
        } catch (error) {
          console.error("Error connecting to wallet:", error);
          setError("Failed to connect wallet. Please try again.");
        }
      } else {
        setError("No Ethereum wallet detected. Please install MetaMask or another wallet.");
      }
    } finally {
      setIsConnecting(false);
    }
  };

  // Function to disconnect wallet
  const disconnectWallet = () => {
    setAddress(null);
    localStorage.removeItem('walletAddress');
  };

  // Check for saved wallet on mount
  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setAddress(savedAddress);
    }
  }, []);

  // Add event listener for account changes
  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      console.log("Accounts changed:", accounts);
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else {
        // User switched accounts
        setAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
      }
    };

    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  // Provide the wallet context
  return (
    <WalletContext.Provider 
      value={{ 
        address, 
        isConnecting,
        error,
        connectWallet, 
        disconnectWallet 
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletProvider;
