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
  return <div className="pt-6 pb-2 px-[24px] py-0"></div>;
}