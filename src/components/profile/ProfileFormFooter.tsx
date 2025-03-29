
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
    <div className="px-6 py-4 border-t border-western-sand/20 flex items-center justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => navigate(-1)}
        className="min-w-[100px] border-western-wood/30 text-western-wood"
      >
        Cancel
      </Button>
      
      <div className="flex items-center gap-4">
        {emailVerified === false && (
          <span className="text-amber-500 text-sm">Email not verified</span>
        )}
        {emailVerified === true && (
          <span className="text-green-500 text-sm">Email verified</span>
        )}
        <Button 
          type="submit" 
          disabled={isSubmitting || !usernameAvailable}
          className="min-w-[140px] bg-western-accent hover:bg-western-accent/80 text-western-parchment"
        >
          {buttonText()}
        </Button>
      </div>
    </div>
  );
}
