
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  // Check for existing connection
  useEffect(() => {
    const checkConnection = async () => {
      // This is a placeholder for actual wallet connection check
      // In a real implementation, you would check if the user has a wallet connected
      const savedAddress = localStorage.getItem('walletAddress');
      if (savedAddress) {
        setAddress(savedAddress);
        setConnected(true);
        // Simulate balance - in real app would query blockchain
        setBalance(125);
      }
    };

    checkConnection();
  }, []);

  const connectWallet = async () => {
    setConnecting(true);
    try {
      // Placeholder for actual wallet connection logic
      // In a real implementation, you would use Coinbase Wallet SDK or Web3Modal
      
      // Simulate successful connection
      setTimeout(() => {
        const mockAddress = '0x' + Array(40).fill(0).map(() => 
          Math.floor(Math.random() * 16).toString(16)).join('');
        setAddress(mockAddress);
        setConnected(true);
        setBalance(125); // Mock $BOSC balance
        localStorage.setItem('walletAddress', mockAddress);
        toast.success('Wallet connected successfully!');
      }, 1500);
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast.error('Failed to connect wallet. Please try again.');
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setConnected(false);
    setBalance(null);
    localStorage.removeItem('walletAddress');
    toast.success('Wallet disconnected');
  };

  const value = {
    connected,
    connecting,
    address,
    balance,
    connectWallet,
    disconnectWallet,
    isConnected: connected && !!address,
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
