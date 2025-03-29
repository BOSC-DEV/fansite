
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useWallet } from './WalletContext';

export function useWalletEvents() {
  const { connectWallet } = useWallet();

  useEffect(() => {
    const handleDisconnect = () => {
      console.log("External wallet disconnect detected");
      
      // Clear any persisted wallet data
      localStorage.removeItem('walletData');
      localStorage.removeItem('walletTimestamp');
      localStorage.removeItem('lastSignatureTime');
      
      // Force page reload to clear the app state
      window.location.reload();
    };
    
    const handleConnect = async (publicKey: string) => {
      console.log("External wallet connect detected:", publicKey);
      
      // Try to reconnect through our flow to establish auth
      try {
        await connectWallet();
        console.log("Successfully established auth after external connect");
      } catch (error) {
        console.error("Failed to establish auth after external connect:", error);
      }
    };
    
    const handleAccountChange = (publicKey: string) => {
      console.log("Wallet account changed:", publicKey);
      
      // Try to reconnect through our flow to establish auth with new account
      try {
        connectWallet().catch(err => {
          console.error("Failed to reconnect after account change:", err);
        });
      } catch (error) {
        console.error("Error during reconnect after account change:", error);
      }
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
  }, [connectWallet]);
}
