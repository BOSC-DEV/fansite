
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
      // Listen for wallet connect events
      window.phantom.solana.on('connect', (publicKey: any) => {
        console.log('Wallet connected with public key:', publicKey.toString());
        toast.success('Wallet connected successfully');

        // Create necessary storage buckets when wallet connects
        ensureStorageBucketExists('profile-images').catch(error => {
          console.error('Error ensuring profile-images bucket exists:', error);
        });
      });
      
      // Listen for wallet disconnect events
      window.phantom.solana.on('disconnect', () => {
        console.log('Wallet disconnected');
        toast.info('Wallet disconnected');
        
        // Clear local wallet state on disconnect
        localStorage.removeItem('walletData');
        localStorage.removeItem('walletTimestamp');
      });
      
      // Listen for account change events
      window.phantom.solana.on('accountChanged', (publicKey: any) => {
        if (publicKey) {
          console.log('Wallet account changed to:', publicKey.toString());
          toast.info('Wallet account changed');
        } else {
          console.log('Wallet account removed');
          toast.warning('Wallet account removed');
        }
      });
    }
    
    // Cleanup listeners on unmount
    return () => {
      if (window.phantom?.solana) {
        window.phantom.solana.removeAllListeners('connect');
        window.phantom.solana.removeAllListeners('disconnect');
        window.phantom.solana.removeAllListeners('accountChanged');
      }
    };
  }, []);
}
