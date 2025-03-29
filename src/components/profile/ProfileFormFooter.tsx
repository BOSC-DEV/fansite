
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { LogOut } from "lucide-react";

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
  const navigate = useNavigate();
  const { disconnectWallet } = useWallet();
  
  const buttonText = () => {
    if (isSubmitting) return "Saving...";
    if (!hasProfile) return "Create Profile";
    return "Update Profile";
  };
  
  const handleDisconnect = async () => {
    await disconnectWallet();
    navigate('/');
  };
  
  return (
    <div className="px-6 py-4 border-t border-western-sand/20 flex items-center justify-between">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleDisconnect}
        className="border-western-wood/30 text-western-wood flex items-center gap-2"
      >
        <LogOut className="h-4 w-4" />
        Disconnect Wallet
      </Button>
      
      <div className="flex items-center gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="min-w-[100px] border-western-wood/30 text-western-wood"
        >
          Cancel
        </Button>
        
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
