
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check, Loader2 } from "lucide-react";
import { deployContracts } from "@/contracts/deploy-contracts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { CONTRACT_ADDRESSES } from "@/contracts/contract-abis";
import { useWallet } from "@/context/WalletContext";
import web3Provider from "@/services/web3Provider";

export function DeployContracts() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedAddresses, setDeployedAddresses] = useState<{
    boscTokenAddress: string;
    bookOfScamsAddress: string;
    chainId: number;
  } | null>(null);
  const { isConnected, connectWallet } = useWallet();

  const handleDeploy = async () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    setIsDeploying(true);
    
    try {
      const result = await deployContracts();
      setDeployedAddresses(result);
      
      toast.success("Contracts deployed successfully!");
      
      // Attempt to initialize with new contract addresses
      await web3Provider.initProvider();

    } catch (error: any) {
      console.error("Failed to deploy contracts:", error);
      toast.error(`Deployment failed: ${error.message || "Unknown error"}`);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Deploy Smart Contracts</CardTitle>
        <CardDescription>
          Deploy the BOSC token and Book of Scams contracts to your connected network.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            Deploying will create new instances of both contracts. Make sure you're connected to your preferred network.
          </AlertDescription>
        </Alert>

        {deployedAddresses && (
          <div className="p-4 border rounded-md bg-green-50 space-y-2">
            <div className="flex items-center text-green-700 mb-2">
              <Check className="h-4 w-4 mr-2" />
              <span className="font-medium">Contracts deployed successfully!</span>
            </div>
            
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Network ID:</span> {deployedAddresses.chainId}</p>
              <p className="break-all"><span className="font-medium">BOSC Token:</span> {deployedAddresses.boscTokenAddress}</p>
              <p className="break-all"><span className="font-medium">Book of Scams:</span> {deployedAddresses.bookOfScamsAddress}</p>
            </div>
            
            <p className="text-xs text-muted-foreground mt-2">
              Remember to update the contract-abis.ts file with these addresses to use them in your application.
            </p>
          </div>
        )}

        <div className="p-4 border rounded-md bg-gray-50">
          <h3 className="font-medium mb-2">Current Contract Addresses</h3>
          {Object.entries(CONTRACT_ADDRESSES).map(([chainId, addresses]) => (
            <div key={chainId} className="mb-2 text-sm">
              <p className="font-medium">Chain ID: {chainId}</p>
              <p className="break-all text-xs">BOSC Token: {addresses.boscToken || "Not deployed"}</p>
              <p className="break-all text-xs">Book of Scams: {addresses.bookOfScams || "Not deployed"}</p>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        {isConnected ? (
          <Button 
            onClick={handleDeploy} 
            disabled={isDeploying}
            className="w-full"
          >
            {isDeploying ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Deploying Contracts...
              </>
            ) : "Deploy Contracts"}
          </Button>
        ) : (
          <Button 
            onClick={connectWallet}
            className="w-full"
          >
            Connect Wallet to Deploy
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
