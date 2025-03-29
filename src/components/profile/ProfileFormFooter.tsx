
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProfileFormFooterProps {
  isSubmitting: boolean;
  hasProfile: boolean;
  usernameAvailable: boolean;
}

export function ProfileFormFooter({ 
  isSubmitting, 
  hasProfile, 
  usernameAvailable
}: ProfileFormFooterProps) {
  const navigate = useNavigate();
  
  const buttonText = () => {
    if (isSubmitting) return "Saving...";
    if (!hasProfile) return "Create Profile";
    return "Update Profile";
  };
  
  return (
    <div className="flex justify-end gap-3 px-6 py-4">
      <Button type="button" variant="outline" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <Button 
        type="submit" 
        disabled={isSubmitting || !usernameAvailable}
        className="min-w-24"
      >
        {buttonText()}
      </Button>
    </div>
  );
}
