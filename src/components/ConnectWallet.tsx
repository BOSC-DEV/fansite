
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { Wallet, AlertCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { WalletDisconnect } from "@/components/wallet/WalletDisconnect";

interface ConnectWalletProps {
  redirectPath?: string;
  className?: string;
}

export function ConnectWallet({
  redirectPath,
  className
}: ConnectWalletProps) {
  const {
    isConnected,
    connectWallet
  } = useWallet();
  
  const [showPhantomError, setShowPhantomError] = useState(false);
  
  useEffect(() => {
    // If the user is already connected and there's a redirect path, redirect them
    if (isConnected && redirectPath) {
      window.location.href = redirectPath;
    }
    
    // Check if Phantom is installed
    setShowPhantomError(!window.phantom?.solana);
  }, [isConnected, redirectPath]);
  
  const handleConnectClick = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <Card className={className}>
      <CardContent>
        {isConnected ? (
          <div className="my-4">
            <WalletDisconnect />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center space-y-4 my-[20px]">
            {showPhantomError && (
              <Alert variant="destructive" className="mb-4 relative">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Phantom wallet extension not found. Please install it first.
                </AlertDescription>
                <button 
                  onClick={() => setShowPhantomError(false)}
                  className="absolute right-2 top-2 rounded-full p-1 hover:bg-red-800/20"
                >
                  <X className="h-4 w-4" />
                </button>
              </Alert>
            )}
            
            <button 
              onClick={handleConnectClick}
              className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-2 hover:bg-muted/70 transition-colors cursor-pointer"
              aria-label="Connect Wallet"
            >
              <Wallet className="h-8 w-8 text-muted-foreground" />
            </button>
            <div className="space-y-2 max-w-md mb-4">
              <h3 className="text-xl font-semibold">Profile Required</h3>
              <p className="text-sm text-muted-foreground">Book of Scams uses your Phantom wallet for secure transactions and identity verification. Create a profile to post a bounty today!</p>
            </div>
            
            <div className="bg-muted/50 p-3 rounded-lg flex items-start gap-2 w-full max-w-md">
              <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground text-left">
                The Book of Scams only uses wallet connection to verify your identity and process token transactions. We never have access to your private keys or funds.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default ConnectWallet;
