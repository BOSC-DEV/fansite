
import React, { createContext, useContext, ReactNode } from 'react';
import { useWalletState } from './wallet/useWalletState';
import { useWalletActions } from './wallet/useWalletActions';
import { useWalletEvents } from './wallet/useWalletEvents';

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
  // Get wallet state
  const walletState = useWalletState();
  
  // Set up wallet event listeners
  useWalletEvents();
  
  // Get wallet actions
  const { connectWallet, disconnectWallet } = useWalletActions(walletState);

  // Create context value
  const value: WalletContextType = {
    connected: walletState.connected,
    connecting: walletState.connecting,
    address: walletState.address,
    balance: walletState.balance,
    connectWallet,
    disconnectWallet,
    isConnected: walletState.connected && !!walletState.address,
    smartWalletAddress: walletState.smartWalletAddress,
    smartWalletLoading: walletState.smartWalletLoading,
    chainId: walletState.chainId,
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
