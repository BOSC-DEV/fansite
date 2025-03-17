
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CONTRACT_ADDRESSES } from "@/contracts/contract-abis";
import { useWallet } from "@/context/WalletContext";

export function DeployContracts() {
  const { isConnected, connectWallet, chainId } = useWallet();
  
  // Get the current network's contract addresses
  const currentNetworkAddresses = chainId ? CONTRACT_ADDRESSES[chainId as keyof typeof CONTRACT_ADDRESSES] : null;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Contract Information</CardTitle>
        <CardDescription>
          View the BOSC token and Book of Scams contract addresses for your connected network.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            Connect your wallet to view contract addresses for your current network.
          </AlertDescription>
        </Alert>

        {isConnected && chainId && currentNetworkAddresses ? (
          <div className="p-4 border rounded-md bg-green-50 space-y-2">
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Network ID:</span> {chainId}</p>
              <p className="break-all">
                <span className="font-medium">BOSC Token:</span> {currentNetworkAddresses.boscToken || "Not deployed on this network"}
              </p>
              <p className="break-all">
                <span className="font-medium">Book of Scams:</span> {currentNetworkAddresses.bookOfScams || "Not deployed on this network"}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 border rounded-md bg-gray-50">
            <h3 className="font-medium mb-2">Available Contract Addresses</h3>
            {Object.entries(CONTRACT_ADDRESSES).map(([chainId, addresses]) => (
              <div key={chainId} className="mb-2 text-sm">
                <p className="font-medium">Chain ID: {chainId}</p>
                <p className="break-all text-xs">BOSC Token: {addresses.boscToken || "Not deployed"}</p>
                <p className="break-all text-xs">Book of Scams: {addresses.bookOfScams || "Not deployed"}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        {isConnected ? (
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => window.open(`https://etherscan.io/address/${currentNetworkAddresses?.bookOfScams}`, '_blank')}
          >
            View on Etherscan
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={connectWallet}
            className="w-full"
          >
            Connect Wallet to View Details
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
