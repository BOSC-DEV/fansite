
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

interface ProfileFormFooterProps {
  isSubmitting: boolean;
  hasProfile: boolean;
  usernameAvailable: boolean;
}

export function ProfileFormFooter({ isSubmitting, hasProfile, usernameAvailable }: ProfileFormFooterProps) {
  return (
    <div className="bg-background/50 border-t border-western-sand/20 p-4 flex justify-end">
      <Button 
        type="submit" 
        className="western-btn gap-2 hover:animate-wiggle bg-western-leather hover:bg-western-accent text-western-parchment"
        disabled={isSubmitting || !usernameAvailable}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Waiting for signature...</span>
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            <span>{hasProfile ? "Update Profile" : "Create Profile"}</span>
          </>
        )}
      </Button>
    </div>
  );
}
