
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

interface EditProfileButtonProps {
  profileAddress?: string;
}

export function EditProfileButton({ profileAddress }: EditProfileButtonProps) {
  const { address, isConnected } = useWallet();
  
  // Only show edit button if the profile belongs to the current user
  const isOwnProfile = address && profileAddress && address.toLowerCase() === profileAddress.toLowerCase();
  
  const handleClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first to edit your profile");
      return;
    }
  };
  
  if (!isOwnProfile) return null;
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      asChild
      className="bg-western-sand/40 border-western-sand/20 text-western-wood hover:bg-western-wood hover:text-western-parchment transition-colors"
    >
      <Link to="/profile" onClick={handleClick}>
        <Pencil className="h-4 w-4 mr-2" />
        Edit Profile
      </Link>
    </Button>
  );
}
