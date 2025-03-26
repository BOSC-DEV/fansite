
import { useEffect } from 'react';

export function useWalletEvents() {
  // Set up event listeners for wallet changes
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
}
