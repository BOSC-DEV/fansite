
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProfileFormFooterProps {
  isSubmitting: boolean;
  hasProfile: boolean;
  usernameAvailable: boolean;
  emailVerified?: boolean;
}

export function ProfileFormFooter({ 
  isSubmitting, 
  hasProfile, 
  usernameAvailable,
  emailVerified
}: ProfileFormFooterProps) {
  const navigate = useNavigate();
  
  const buttonText = () => {
    if (isSubmitting) return "Saving...";
    if (!hasProfile) return "Create Profile";
    return "Update Profile";
  };
  
  return (
    <div className="px-6 py-4 flex justify-end">
      <div className="flex items-center gap-3">
        {emailVerified === false && (
          <span className="text-amber-500 text-xs mr-auto">Email not verified</span>
        )}
        {emailVerified === true && (
          <span className="text-green-500 text-xs mr-auto">Email verified</span>
        )}
        <Button type="button" variant="outline" onClick={() => navigate(-1)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !usernameAvailable}>
          {buttonText()}
        </Button>
      </div>
    </div>
  );
}
