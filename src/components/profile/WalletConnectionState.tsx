
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/wallet";

interface WalletConnectionStateProps {
  address: string | null;
}

export function WalletConnectionState({
  address
}: WalletConnectionStateProps) {
  const { connectWallet } = useWallet();

  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Connect Your Wallet</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-muted-foreground text-center mb-4">Connect wallet to create or update profile.</p>
        <Button onClick={handleConnect} className="w-full max-w-[200px] bg-western-accent hover:bg-western-accent/80">
          Connect Wallet
        </Button>
      </CardContent>
    </Card>
  );
}
