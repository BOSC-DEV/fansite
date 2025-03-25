
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { UserCircle2 } from "lucide-react";
import { storageService, UserProfile } from "@/services/storage";

export function ProfileButton() {
  const { isConnected, address } = useWallet();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch user profile if wallet is connected
    const fetchProfile = async () => {
      if (isConnected && address) {
        try {
          const userProfile = await storageService.getProfile(address);
          setProfile(userProfile);
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      } else {
        setProfile(null);
      }
    };

    fetchProfile();
  }, [isConnected, address]);

  const handleProfileClick = () => {
    if (profile && profile.username) {
      navigate(`/${profile.username}`);
    } else if (address) {
      navigate(`/user/${address}`);
    }
  };

  if (!isConnected) {
    return null;
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="relative h-9 w-9 rounded-full"
      onClick={handleProfileClick}
    >
      <Avatar className="h-9 w-9 border border-western-sand/30">
        <AvatarImage src={profile?.profilePicUrl} alt={profile?.displayName || "Profile"} />
        <AvatarFallback className="bg-western-sand/20">
          <UserCircle2 className="h-5 w-5 text-western-parchment" />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}
