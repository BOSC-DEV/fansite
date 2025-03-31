
/**
 * Type definitions for Wallet Context
 */

export interface WalletContextType {
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

export interface WalletProviderProps {
  children: React.ReactNode;
}
