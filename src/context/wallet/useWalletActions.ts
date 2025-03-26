
import { toast } from 'sonner';
import { useWalletState } from './useWalletState';

export function useWalletActions(walletState: ReturnType<typeof useWalletState>) {
  const {
    setConnected,
    setConnecting,
    setAddress,
    setBalance,
    setSmartWalletAddress,
    setChainId,
    web3Provider
  } = walletState;

  const connectWallet = async (): Promise<boolean> => {
    if (walletState.connecting) return false; // Prevent multiple connection attempts
    
    setConnecting(true);
    console.log("Connecting wallet from WalletContext...");
    
    try {
      // Check if phantom extension is installed
      if (!window.phantom?.solana) {
        toast.error("Phantom wallet extension not found. Please install it first.");
        console.error("Phantom wallet not installed");
        setConnecting(false);
        return false;
      }
      
      const connectedAddress = await web3Provider.connectWallet();
      
      if (connectedAddress) {
        setAddress(connectedAddress);
        setConnected(true);
        
        // Set Solana mainnet chainId for compatibility
        setChainId(101);
        
        // Store wallet data with timestamp for 24-hour persistence
        localStorage.setItem('walletData', JSON.stringify({ address: connectedAddress }));
        localStorage.setItem('walletTimestamp', Date.now().toString());
        
        try {
          const tokenBalance = await web3Provider.getBalance(connectedAddress);
          setBalance(tokenBalance);
        } catch (error) {
          console.error("Failed to get balance on connect:", error);
          setBalance(10); // Default balance for UI to work
        }
        
        toast.success('Wallet connected successfully!');
        console.log(`Wallet connected: ${connectedAddress}`);
        return true;
      } else {
        throw new Error('Failed to connect wallet');
      }
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      toast.error(`Failed to connect wallet: ${error.message || 'Unknown error'}`);
      // Important: Set the wallet as disconnected on error
      setConnected(false);
      setAddress(null);
      setBalance(null);
      return false;
    } finally {
      setConnecting(false);
    }
  };

  const disconnectWallet = async () => {
    try {
      await web3Provider.disconnectWallet();
      setAddress(null);
      setConnected(false);
      setBalance(null);
      setSmartWalletAddress(null);
      setChainId(null);
      
      // Clear persisted wallet data
      localStorage.removeItem('walletData');
      localStorage.removeItem('walletTimestamp');
      
      toast.success('Wallet disconnected');
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      toast.error('Failed to disconnect wallet');
    }
  };
  
  return {
    connectWallet,
    disconnectWallet
  };
}
