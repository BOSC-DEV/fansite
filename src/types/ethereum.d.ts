
interface Window {
  phantom?: {
    solana?: {
      isPhantom?: boolean;
      connect: () => Promise<{ publicKey: { toString: () => string } }>;
      disconnect: () => Promise<void>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
      publicKey?: { toString: () => string };
      isConnected: boolean;
      signMessage: (message: Uint8Array, encoding: string) => Promise<{ 
        signature: Uint8Array;
        publicKey: { toString: () => string };
      }>;
    };
  };
  
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress?: string;
    chainId?: string;
  };
}
