
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WalletConnectionStateProps {
  address: string | null;
}

export function WalletConnectionState({
  address
}: WalletConnectionStateProps) {
  const navigate = useNavigate();
  
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Your Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-center">
          You can create or update your profile without connecting a wallet.
        </p>
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate("/profile")}
            className="bg-western-accent hover:bg-western-accent/80 text-western-parchment"
          >
            Continue to Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
