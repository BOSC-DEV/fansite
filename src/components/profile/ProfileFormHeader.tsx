
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileFormHeaderProps {
  hasProfile: boolean;
  address: string | null;
}

export function ProfileFormHeader({ hasProfile, address }: ProfileFormHeaderProps) {
  return (
    <CardHeader>
      <CardTitle>{hasProfile ? "Update Your Profile" : "Create Your Profile"}</CardTitle>
      {address && (
        <p className="text-sm text-muted-foreground">
          Wallet: {address}
        </p>
      )}
    </CardHeader>
  );
}
