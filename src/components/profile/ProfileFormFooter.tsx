
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProfileFormFooterProps {
  isSubmitting: boolean;
  hasProfile: boolean;
  usernameAvailable: boolean;
  emailVerified?: boolean;
}

export function ProfileFormFooter({
  isSubmitting,
  hasProfile,
  usernameAvailable
}: ProfileFormFooterProps) {
  return (
    <div className="p-6 flex flex-row justify-end items-center space-x-3">
      <Button 
        variant="outline" 
        type="button" 
        onClick={() => window.history.back()} 
        className="w-auto"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Button 
        type="submit" 
        className="w-auto" 
        disabled={isSubmitting || !usernameAvailable}
      >
        {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Save Profile"}
      </Button>
    </div>
  );
}
