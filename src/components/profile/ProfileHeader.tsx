
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { UserCircle2 } from "lucide-react";
import { UserProfile } from "@/services/storage";
import { ProfileLinks } from "@/components/profile/ProfileLinks";

interface ProfileHeaderProps {
  profile: UserProfile;
  scammersCount: number;
}

export function ProfileHeader({ profile, scammersCount }: ProfileHeaderProps) {
  return (
    <Card className="p-6 mb-8">
      <div className="flex flex-col items-center text-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
          <AvatarFallback className="bg-western-sand">
            <UserCircle2 className="w-12 h-12 text-western-wood" />
          </AvatarFallback>
        </Avatar>
        
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{profile.displayName}</h1>
            <p className="text-sm text-western-sand">@{profile.username}</p>
          </div>
          
          {profile.bio && (
            <p className="text-sm max-w-md mx-auto">{profile.bio}</p>
          )}
          
          {/* Centralized Social Links */}
          <div className="flex justify-center space-x-4">
            <ProfileLinks 
              xLink={profile.xLink} 
              websiteLink={profile.websiteLink} 
            />
          </div>
          
          <div className="flex justify-center space-x-6 text-sm">
            <div>
              <span className="font-bold">{scammersCount}</span> scammer reports
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
