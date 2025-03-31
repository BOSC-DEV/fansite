
export interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  balance: number | null;
  connectWallet: () => Promise<boolean>;
  disconnectWallet: () => Promise<void>;
  isConnected: boolean;
  smartWalletAddress: string | null;
  smartWalletLoading: boolean;
  chainId: number | null;
}

export interface WalletProviderProps {
  children: React.ReactNode;
}
