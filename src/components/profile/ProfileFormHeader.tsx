
import React from "react";

interface ProfileFormHeaderProps {
  hasProfile: boolean;
  address?: string | null; // Make address optional
}

export function ProfileFormHeader({
  hasProfile,
  address
}: ProfileFormHeaderProps) {
  return (
    <div className="px-6 py-4 bg-western-parchment/5 border-b border-western-sand/10 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-western-accent">
          {hasProfile ? "Update Your Profile" : "Create Your Profile"}
        </h2>
        {address && (
          <p className="text-sm text-muted-foreground mt-1">
            Wallet: {address.substring(0, 6)}...{address.substring(address.length - 4)}
          </p>
        )}
      </div>
    </div>
  );
}
