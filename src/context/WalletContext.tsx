
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import web3Provider from '../services/web3Provider';
import { DEVELOPER_WALLET_ADDRESS } from '../contracts/contract-abis';
import { ethers } from 'ethers';

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
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(null);
  const [smartWalletLoading, setSmartWalletLoading] = useState(false);

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        const connectedAddress = window.ethereum.selectedAddress;
        setAddress(connectedAddress);
        setConnected(true);
        
        await web3Provider.connectWallet();
        if (connectedAddress) {
          const tokenBalance = await web3Provider.getBalance(connectedAddress);
          setBalance(tokenBalance);
          
          await initializeSmartWallet(connectedAddress);
        }
      }
    };

    checkConnection();
  }, []);

  const initializeSmartWallet = async (ownerAddress: string) => {
    if (!ownerAddress) return;
    
    setSmartWalletLoading(true);
    try {
      if (!window.ethereum) throw new Error("No Ethereum provider found");
      
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Instead of using SmartWallet or createSmartAccountClient, use direct EIP1193 provider
      // This is a simpler approach that still allows us to get the account address
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts.length > 0) {
        // We'll use the connected EOA address as the "smart wallet" for now
        setSmartWalletAddress(accounts[0]);
        console.log("Smart wallet address:", accounts[0]);
        
        toast.success("Wallet connected successfully");
      } else {
        throw new Error("No accounts found");
      }
    } catch (error: any) {
      console.error("Failed to initialize smart wallet:", error);
      toast.error(`Smart wallet initialization failed: ${error.message || 'Unknown error'}`);
    } finally {
      setSmartWalletLoading(false);
    }
  };

  const connectWallet = async () => {
    setConnecting(true);
    try {
      const connectedAddress = await web3Provider.connectWallet();
      
      if (connectedAddress) {
        setAddress(connectedAddress);
        setConnected(true);
        
        const tokenBalance = await web3Provider.getBalance(connectedAddress);
        setBalance(tokenBalance);
        
        await initializeSmartWallet(connectedAddress);
        
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

  const disconnectWallet = () => {
    setAddress(null);
    setConnected(false);
    setBalance(null);
    setSmartWalletAddress(null);
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
    smartWalletAddress,
    smartWalletLoading
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
