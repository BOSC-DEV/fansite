
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Pencil } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

interface EditProfileButtonProps {
  profileAddress?: string;
}

export function EditProfileButton({ profileAddress }: EditProfileButtonProps) {
  const { address } = useWallet();
  
  // Only show edit button if the profile belongs to the current user
  const isOwnProfile = address && profileAddress && address.toLowerCase() === profileAddress.toLowerCase();
  
  if (!isOwnProfile) return null;
  
  return (
    <Button 
      variant="outline" 
      size="sm" 
      asChild
      className="absolute top-4 right-4 bg-western-sand/40 border-western-sand/20 text-western-wood hover:bg-western-sand/60 hover:text-western-wood transition-colors"
    >
      <Link to="/profile">
        <Pencil className="h-4 w-4 mr-2" />
        Edit Profile
      </Link>
    </Button>
  );
}
