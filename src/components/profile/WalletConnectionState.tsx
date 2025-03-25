import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
interface WalletConnectionStateProps {
  address: string | null;
}
export function WalletConnectionState({
  address
}: WalletConnectionStateProps) {
  return <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Connect Your Wallet</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-center"> Connect wallet to create or update profile.</p>
      </CardContent>
    </Card>;
}