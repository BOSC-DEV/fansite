
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
    <div className="px-6 py-4 bg-muted/20 border-t border-western-sand/10 flex justify-between shadow-md">
      <Button type="button" variant="outline" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <div className="flex items-center gap-2">
        {emailVerified === false && (
          <span className="text-amber-500 text-xs">Email not verified</span>
        )}
        {emailVerified === true && (
          <span className="text-green-500 text-xs">Email verified</span>
        )}
        <Button type="submit" disabled={isSubmitting || !usernameAvailable}>
          {buttonText()}
        </Button>
      </div>
    </div>
  );
}
