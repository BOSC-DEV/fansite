
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, CheckCircle } from "lucide-react";

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
  return (
    <div className="border-t p-6 flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
      <Button 
        variant="outline" 
        type="button" 
        onClick={() => window.history.back()} 
        className="w-full sm:w-auto"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <div className="flex w-full sm:w-auto space-x-2">
        <Button 
          type="submit" 
          className="w-full sm:w-auto" 
          disabled={isSubmitting || !usernameAvailable}
        >
          {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Save Profile"}
        </Button>
      </div>
    </div>
  );
}
