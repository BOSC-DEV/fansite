
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ensureStorageBucketExists } from '@/utils/supabaseHelpers';

/**
 * Hook to set up wallet event listeners
 */
export function useWalletEvents() {
  // Set up wallet event listeners on mount
  useEffect(() => {
    if (window.phantom?.solana) {
      // Store references to event handlers so we can remove them later
      const connectHandler = (publicKey: any) => {
        console.log('Wallet connected with public key:', publicKey.toString());
        toast.success('Wallet connected successfully');

        // Create necessary storage buckets when wallet connects
        ensureStorageBucketExists('profile-images').catch(error => {
          console.error('Error ensuring profile-images bucket exists:', error);
        });
      };
      
      const disconnectHandler = () => {
        console.log('Wallet disconnected');
        toast.info('Wallet disconnected');
        
        // Clear local wallet state on disconnect
        localStorage.removeItem('walletData');
        localStorage.removeItem('walletTimestamp');
      };
      
      const accountChangeHandler = (publicKey: any) => {
        if (publicKey) {
          console.log('Wallet account changed to:', publicKey.toString());
          toast.info('Wallet account changed');
        } else {
          console.log('Wallet account removed');
          toast.warning('Wallet account removed');
        }
      };
      
      // Add event listeners
      window.phantom.solana.on('connect', connectHandler);
      window.phantom.solana.on('disconnect', disconnectHandler);
      window.phantom.solana.on('accountChanged', accountChangeHandler);
    
      // Cleanup listeners on unmount using the off() method instead of removeAllListeners
      return () => {
        if (window.phantom?.solana) {
          window.phantom.solana.off('connect', connectHandler);
          window.phantom.solana.off('disconnect', disconnectHandler);
          window.phantom.solana.off('accountChanged', accountChangeHandler);
        }
      };
    }
    
    // Return empty cleanup function if phantom is not available
    return () => {};
  }, []);
}
