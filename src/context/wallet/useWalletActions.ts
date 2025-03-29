
import { useState } from 'react';
import { toast } from 'sonner';
import Web3Provider from '@/services/web3Provider';
import { WalletState } from './useWalletState';

export function useWalletActions(walletState: WalletState) {
  const [web3Provider] = useState(() => new Web3Provider());
  const { setConnected, setConnecting, setAddress, setBalance, setSmartWalletAddress, setSmartWalletLoading } = walletState;

  // Connect wallet function that handles the wallet connection process
  const connectWallet = async (): Promise<boolean> => {
    if (walletState.connected) {
      console.log("Wallet already connected");
      return true;
    }

    // Check if Phantom wallet is installed
    if (!window.phantom?.solana) {
      console.error("Phantom wallet extension not found");
      toast.error("Phantom wallet extension not found. Please install it first.");
      return false;
    }

    setConnecting(true);

    try {
      console.log("Connecting wallet...");
      const address = await web3Provider.connectWallet();
      
      if (!address) {
        throw new Error("Failed to connect wallet");
      }
      
      console.log("Connected to wallet:", address);
      setAddress(address);
      setConnected(true);
      
      // Get wallet balance
      try {
        const balance = await web3Provider.getBalance(address);
        setBalance(balance);
        console.log("Wallet balance:", balance);
      } catch (balanceError) {
        console.error("Error fetching balance:", balanceError);
        // Don't fail the whole connection process if balance fetch fails
      }

      // Show success notification
      toast.success("Wallet connected successfully");
      return true;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
      return false;
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet function
  const disconnectWallet = async () => {
    try {
      await web3Provider.disconnectWallet();
      
      // Clear all wallet-related state
      setConnected(false);
      setAddress(null);
      setBalance(null);
      setSmartWalletAddress(null);
      
      // Show notification
      toast.success("Wallet disconnected successfully");
      
      // Clear any persisted wallet data
      localStorage.removeItem('walletData');
      localStorage.removeItem('walletTimestamp');
      
      console.log("Wallet disconnected successfully");
    } catch (error) {
      console.error("Error disconnecting wallet:", error);
      toast.error("Failed to disconnect wallet");
    }
  };

  return {
    connectWallet,
    disconnectWallet
  };
}
