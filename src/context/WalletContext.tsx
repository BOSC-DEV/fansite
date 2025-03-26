
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { Web3Provider } from '../services/web3/provider';

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: number | null;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => void;
  isConnected: boolean;
  smartWalletAddress: string | null;
  smartWalletLoading: boolean;
  chainId: number | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(null);
  const [smartWalletLoading, setSmartWalletLoading] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [web3Provider] = useState(() => new Web3Provider());

  // Check for locally stored wallet data on component mount
  useEffect(() => {
    const storedWalletData = localStorage.getItem('walletData');
    const storedTimestamp = localStorage.getItem('walletTimestamp');
    
    if (storedWalletData && storedTimestamp) {
      const parsedData = JSON.parse(storedWalletData);
      const timestamp = parseInt(storedTimestamp);
      const currentTime = Date.now();
      
      // Check if stored data is less than 24 hours old (24h * 60m * 60s * 1000ms)
      if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
        console.log("Found valid stored wallet data, restoring session");
        setAddress(parsedData.address);
        setConnected(true);
        setChainId(101); // Solana mainnet
        
        // Try to get balance
        if (parsedData.address) {
          web3Provider.getBalance(parsedData.address)
            .then(balance => setBalance(balance))
            .catch(error => {
              console.error("Failed to get balance on restore:", error);
              setBalance(10); // Default balance
            });
        }
      } else {
        console.log("Stored wallet data expired, removing");
        localStorage.removeItem('walletData');
        localStorage.removeItem('walletTimestamp');
      }
    }
    
    const checkConnection = async () => {
      console.log("Checking wallet connection status...");
      if (window.phantom?.solana && window.phantom.solana.isConnected && window.phantom.solana.publicKey) {
        // Even if already connected, we need to try to re-connect to trigger signature check
        try {
          const connectedAddress = await web3Provider.connectWallet();
          if (connectedAddress) {
            setAddress(connectedAddress);
            setConnected(true);
            // 101 is Solana mainnet
            setChainId(101);
            
            // Store wallet data with timestamp for 24-hour persistence
            localStorage.setItem('walletData', JSON.stringify({ address: connectedAddress }));
            localStorage.setItem('walletTimestamp', Date.now().toString());
            
            try {
              const tokenBalance = await web3Provider.getBalance(connectedAddress);
              setBalance(tokenBalance);
            } catch (error) {
              console.error("Failed to get balance on initial load:", error);
              setBalance(10); // Default balance for UI to work
            }
          } else {
            console.log("Signature verification failed during initial check");
            setAddress(null);
            setConnected(false);
          }
        } catch (error) {
          console.error("Failed to re-connect during initial check:", error);
        }
      } else {
        console.log("No wallet connected during initial check");
      }
    };

    checkConnection();
  }, [web3Provider]);

  useEffect(() => {
    const handleAccountChanged = () => {
      window.location.reload();
    };

    if (window.phantom?.solana) {
      window.phantom.solana.on('accountChanged', handleAccountChanged);
    }

    return () => {
      if (window.phantom?.solana) {
        window.phantom.solana.removeListener('accountChanged', handleAccountChanged);
      }
    };
  }, []);

  const connectWallet = async (): Promise<boolean> => {
    if (connecting) return false; // Prevent multiple connection attempts
    
    setConnecting(true);
    console.log("Connecting wallet from WalletContext...");
    
    try {
      // Check if phantom extension is installed
      if (!window.phantom?.solana) {
        toast.error("Phantom wallet extension not found. Please install it first.");
        console.error("Phantom wallet not installed");
        setConnecting(false);
        return false;
      }
      
      const connectedAddress = await web3Provider.connectWallet();
      
      if (connectedAddress) {
        setAddress(connectedAddress);
        setConnected(true);
        
        // Set Solana mainnet chainId for compatibility
        setChainId(101);
        
        // Store wallet data with timestamp for 24-hour persistence
        localStorage.setItem('walletData', JSON.stringify({ address: connectedAddress }));
        localStorage.setItem('walletTimestamp', Date.now().toString());
        
        try {
          const tokenBalance = await web3Provider.getBalance(connectedAddress);
          setBalance(tokenBalance);
        } catch (error) {
          console.error("Failed to get balance on connect:", error);
          setBalance(10); // Default balance for UI to work
        }
        
        toast.success('Wallet connected successfully!');
        console.log(`Wallet connected: ${connectedAddress}`);
        return true;
      } else {
        throw new Error('Failed to connect wallet');
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast.error(`Failed to connect wallet: ${error.message || 'Unknown error'}`);
      // Important: Set the wallet as disconnected on error
      setConnected(false);
      setAddress(null);
      setBalance(null);
      return false;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await web3Provider.disconnectWallet();
      setAddress(null);
      setConnected(false);
      setBalance(null);
      setSmartWalletAddress(null);
      setChainId(null);
      
      // Clear persisted wallet data
      localStorage.removeItem('walletData');
      localStorage.removeItem('walletTimestamp');
      
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };

  const value = {
    connected,
    connecting,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    isConnected: connected && !!address,
    smartWalletAddress,
    smartWalletLoading,
    chainId,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
