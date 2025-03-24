
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/context/WalletContext";
import { Wallet, AlertCircle } from "lucide-react";

interface ConnectWalletProps {
  message?: string;
  redirectPath?: string;
  className?: string;
}

export function ConnectWallet({ 
  message = "You need to connect your wallet to access this feature", 
  redirectPath, 
  className 
}: ConnectWalletProps) {
  const { connectWallet, connecting } = useWallet();
  
  const handleConnect = async () => {
    try {
      await connectWallet();
      if (redirectPath) {
        window.location.href = redirectPath;
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };
  
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Connect Your Wallet
        </CardTitle>
        <CardDescription>
          {message}
        </CardDescription>
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
          
          <div className="bg-muted/50 p-3 rounded-lg flex items-start gap-2 max-w-md mt-2">
            <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground text-left">
              The Book of Scams only uses wallet connection to verify your identity and process token transactions. We never have access to your private keys or funds.
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleConnect} className="w-full" disabled={connecting}>
          {connecting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <span className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Phantom Wallet
            </span>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default ConnectWallet;
