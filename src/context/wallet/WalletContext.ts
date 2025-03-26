
import { createContext, useContext } from 'react';
import { WalletContextType } from './types';

// Create the context with undefined as initial value
const WalletContext = createContext<WalletContextType | undefined>(undefined);

/**
 * Custom hook to use the wallet context
 * @returns Wallet context value
 */
export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

export default WalletContext;
