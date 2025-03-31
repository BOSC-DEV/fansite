
import React from 'react';
import WalletContext from './WalletContext';
import { useWalletState } from './useWalletState';
import { useWalletActions } from './useWalletActions';
import { useWalletEvents } from './useWalletEvents';
import { WalletProviderProps } from './types';

/**
 * Provider component for wallet functionality
 */
export function WalletProvider({ children }: WalletProviderProps) {
  // Get wallet state
  const walletState = useWalletState();
  
  // Set up wallet event listeners
  useWalletEvents();
  
  // Get wallet actions
  const { connectWallet, disconnectWallet } = useWalletActions(walletState);

  // Create context value
  const value = {
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

export default WalletProvider;
