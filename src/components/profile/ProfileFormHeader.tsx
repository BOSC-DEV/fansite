import React from "react";
interface ProfileFormHeaderProps {
  hasProfile: boolean;
  address?: string | null; // Make address optional
}
export function ProfileFormHeader({
  hasProfile,
  address
}: ProfileFormHeaderProps) {
  // Return an empty div instead of the header content
  return;
}