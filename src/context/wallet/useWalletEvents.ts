
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
        // Using off instead of removeListener as specified in Phantom documentation
        window.phantom.solana.off('accountChanged', handleAccountChanged);
      }
    };
  }, []);
}
