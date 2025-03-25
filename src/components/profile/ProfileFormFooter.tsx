
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
  
  return (
    <div className="px-6 py-4 bg-muted/20 border-t border-western-sand/10 flex justify-between">
      <Button type="button" variant="outline" onClick={() => navigate(-1)}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting || !usernameAvailable}>
        {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Create Profile"}
      </Button>
    </div>
  );
}
