
import { createContext, useContext } from 'react';

// Define the shape of the wallet context
interface WalletContextType {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

// Create the context with a default value
export const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnecting: false,
  error: null,
  connectWallet: async () => {},
  disconnectWallet: () => {}
});

// Create a hook to use the wallet context
export const useWallet = () => useContext(WalletContext);
