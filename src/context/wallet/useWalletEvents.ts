
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useWalletEvents() {
  useEffect(() => {
    const handleDisconnect = () => {
      console.log("External wallet disconnect detected");
      
      // Clear any persisted wallet data
      localStorage.removeItem('walletData');
      localStorage.removeItem('walletTimestamp');
      
      // We won't show a toast here because the user triggered this disconnect
    };
    
    const handleConnect = async (publicKey: string) => {
      console.log("External wallet connect detected:", publicKey);
    };
    
    const handleAccountChange = (publicKey: string) => {
      console.log("Wallet account changed:", publicKey);
      
      // We'll reload the page to ensure the app state is updated properly
      window.location.reload();
    };
    
    // Set up event listeners
    if (window.phantom?.solana) {
      window.phantom.solana.on('connect', handleConnect);
      window.phantom.solana.on('disconnect', handleDisconnect);
      window.phantom.solana.on('accountChanged', handleAccountChange);
    }
    
    // Clean up event listeners when component unmounts
    return () => {
      if (window.phantom?.solana) {
        window.phantom.solana.off('connect', handleConnect);
        window.phantom.solana.off('disconnect', handleDisconnect);
        window.phantom.solana.off('accountChanged', handleAccountChange);
      }
    };
  }, []);
}
