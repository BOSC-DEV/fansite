
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { UserProfile } from "@/services/storage";
import { ProfileLinks } from "./ProfileLinks";
import { EditProfileButton } from "./EditProfileButton";

interface ProfileHeaderProps {
  profile: UserProfile;
  scammersCount: number;
}

export function ProfileHeader({ profile, scammersCount }: ProfileHeaderProps) {
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
      
      {/* Add profile editing button - only appears for the profile owner */}
      <EditProfileButton profileAddress={profile.walletAddress} />
    </div>
  );
}
