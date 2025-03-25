
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { Wallet, AlertCircle } from "lucide-react";
import { useEffect } from "react";
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
  
  useEffect(() => {
    // If the user is already connected and there's a redirect path, redirect them
    if (isConnected && redirectPath) {
      window.location.href = redirectPath;
    }
  }, [isConnected, redirectPath]);
  
  const handleConnectClick = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return <Card className={className}>
      
      <CardContent>
        <div className="flex flex-col items-center justify-center py-2 text-center space-y-4 my-[20px]">
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
      </CardContent>
    </Card>;
}
export default ConnectWallet;
