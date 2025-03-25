
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
  const { connectWallet, connecting, isConnected } = useWallet();
  
  useEffect(() => {
    // If the user is already connected and there's a redirect path, redirect them
    if (isConnected && redirectPath) {
      window.location.href = redirectPath;
    }
  }, [isConnected, redirectPath]);
  
  const handleConnect = async (e: React.MouseEvent) => {
    // Prevent default to avoid page refresh
    e.preventDefault();
    
    try {
      console.log("Attempting to connect wallet from ConnectWallet component");
      const connected = await connectWallet();
      console.log("Wallet connection result:", connected);
      
      if (connected && redirectPath) {
        // Short delay before redirect to ensure wallet state is updated
        setTimeout(() => {
          window.location.href = redirectPath;
        }, 500);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        {/* No header content */}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-2">
            <Wallet className="h-8 w-8 text-muted-foreground" />
          </div>
          <div className="space-y-2 max-w-md">
            <h3 className="text-xl font-semibold">Wallet Connection</h3>
            <p className="text-sm text-muted-foreground">
              Book of Scams uses your Phantom wallet for secure transactions and identity verification.
            </p>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-lg flex items-start gap-2 w-full max-w-md mt-2">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground text-left">
              The Book of Scams only uses wallet connection to verify your identity and process token transactions. We never have access to your private keys or funds.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConnectWallet;
