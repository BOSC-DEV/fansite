
import React from "react";

interface ProfileFormHeaderProps {
  hasProfile: boolean;
  address: string | null;
}

export function ProfileFormHeader({ hasProfile, address }: ProfileFormHeaderProps) {
  return (
    <div className="px-6 pt-6 pb-2">
      <h2 className="text-2xl font-bold mb-1">{hasProfile ? "Update Your Profile" : "Create Your Profile"}</h2>
      {address && (
        <p className="text-sm text-muted-foreground">
          Wallet: {address}
        </p>
      )}
    </div>
  );
}
