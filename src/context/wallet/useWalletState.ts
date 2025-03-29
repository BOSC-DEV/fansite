
import { useState } from 'react';

export interface WalletState {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: number | null;
  smartWalletAddress: string | null;
  smartWalletLoading: boolean;
  chainId: number | null;
  setConnected: (connected: boolean) => void;
  setConnecting: (connecting: boolean) => void;
  setAddress: (address: string | null) => void;
  setBalance: (balance: number | null) => void;
  setSmartWalletAddress: (address: string | null) => void;
  setSmartWalletLoading: (loading: boolean) => void;
  setChainId: (chainId: number | null) => void;
}

export function useWalletState(): WalletState {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);
  const [smartWalletAddress, setSmartWalletAddress] = useState<string | null>(null);
  const [smartWalletLoading, setSmartWalletLoading] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);

  return {
    connected,
    connecting,
    address,
    balance,
    smartWalletAddress,
    smartWalletLoading,
    chainId,
    setConnected,
    setConnecting,
    setAddress,
    setBalance,
    setSmartWalletAddress,
    setSmartWalletLoading,
    setChainId
  };
}
