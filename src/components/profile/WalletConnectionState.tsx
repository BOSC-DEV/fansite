
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WalletConnectionStateProps {
  address: string | null;
}

export function WalletConnectionState({ address }: WalletConnectionStateProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Connect Your Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Please connect your wallet to create or update your profile.
        </p>
      </CardContent>
    </Card>
  );
}
