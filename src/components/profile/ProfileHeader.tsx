
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, LogOut, Pencil } from "lucide-react";
import { UserProfile } from "@/services/storage/index";
import { ProfileLinks } from "./ProfileLinks";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";

interface ProfileHeaderProps {
  profile: UserProfile;
  scammersCount: number;
}

export function ProfileHeader({ profile, scammersCount }: ProfileHeaderProps) {
  const { disconnectWallet, address } = useWallet();
  
  // Only show buttons if the profile belongs to the current user
  const isOwnProfile = address && profile.walletAddress && 
    address.toLowerCase() === profile.walletAddress.toLowerCase();

  const handleLogout = () => {
    disconnectWallet();
    toast.success("Wallet disconnected successfully");
  };

  return (
    <div className="relative mb-8 p-6 bg-western-parchment/5 rounded-lg border border-western-sand/20">
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        <Avatar className="w-24 h-24 md:w-32 md:h-32 border-2 border-western-sand">
          <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
          <AvatarFallback className="bg-western-sand/30 text-western-wood">
            <UserCircle2 className="w-16 h-16 md:w-20 md:h-20" />
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-wanted text-western-accent">{profile.displayName}</h1>
          <p className="text-sm text-western-accent/80 font-medium mb-2">@{profile.username}</p>
          
          {profile.bio && (
            <p className="text-sm mb-4 max-w-2xl text-western-wood">{profile.bio}</p>
          )}
          
          <ProfileLinks 
            xLink={profile.xLink} 
            websiteLink={profile.websiteLink}
            walletAddress={profile.walletAddress}
          />
        </div>
      </div>
      
      {/* Profile actions section */}
      {isOwnProfile && (
        <div className="absolute top-6 right-6 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            asChild
            className="flex items-center gap-1 bg-western-sand/40 border-western-sand/20 text-western-wood hover:bg-western-sand/60 transition-colors"
          >
            <Link to="/profile">
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Link>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="flex items-center gap-1 bg-western-sand/40 border-western-sand/20 text-western-wood hover:bg-western-sand/60 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
}
