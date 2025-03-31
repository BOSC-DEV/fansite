
interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    isConnected: () => boolean;
    enable: () => Promise<string[]>;
    selectedAddress: string | null;
    chainId: string;
  };
  phantom?: {
    solana?: {
      connect: () => Promise<{ publicKey: any }>;
      disconnect: () => Promise<void>;
      signMessage: (message: Uint8Array) => Promise<{ signature: Uint8Array }>;
      signTransaction: (transaction: any) => Promise<any>;
      signAndSendTransaction: (transaction: any) => Promise<{ signature: string }>;
      isConnected: boolean;
      publicKey: { toString: () => string };
      on: (event: string, callback: Function) => void;
      off: (event: string, callback: Function) => void;
    };
  };
}
