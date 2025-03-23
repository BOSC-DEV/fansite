
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import web3Provider from '../services/web3Provider';
import { DEVELOPER_WALLET_ADDRESS } from '../contracts/contract-abis';

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: number | null;
  connectWallet: () => Promise<void>;
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

  useEffect(() => {
    const checkConnection = async () => {
      if (window.phantom?.solana && window.phantom.solana.isConnected && window.phantom.solana.publicKey) {
        const connectedAddress = window.phantom.solana.publicKey.toString();
        setAddress(connectedAddress);
        setConnected(true);
        
        // We don't have chainId in Solana, but we can set a default value for compatibility
        setChainId(101); // 101 is Solana mainnet
        
        if (connectedAddress) {
          const tokenBalance = await web3Provider.getBalance(connectedAddress);
          setBalance(tokenBalance);
        }
      }
    };

    checkConnection();
  }, []);

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

  const connectWallet = async () => {
    setConnecting(true);
    try {
      const connectedAddress = await web3Provider.connectWallet();
      
      if (connectedAddress) {
        setAddress(connectedAddress);
        setConnected(true);
        
        // Set Solana mainnet chainId for compatibility
        setChainId(101);
        
        const tokenBalance = await web3Provider.getBalance(connectedAddress);
        setBalance(tokenBalance);
        
        toast.success('Wallet connected successfully!');
        console.log(`Funds will flow to developer wallet: ${DEVELOPER_WALLET_ADDRESS}`);
      } else {
        throw new Error('Failed to connect wallet');
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast.error(`Failed to connect wallet: ${error.message || 'Unknown error'}`);
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
