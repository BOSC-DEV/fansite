
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { UserProfile } from "@/services/storage";
import { EditProfileButton } from "./EditProfileButton";

interface ProfileHeaderProps {
  profile: UserProfile;
  scammersCount: number;
}

export function ProfileHeader({ profile, scammersCount }: ProfileHeaderProps) {
  return (
    <Card className="mb-6 relative">
      <EditProfileButton profileAddress={profile.walletAddress} />
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <Avatar className="h-24 w-24 border-2 border-western-sand/40">
            <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
            <AvatarFallback className="bg-western-sand/30">
              <User className="h-12 w-12 text-western-wood/70" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-2xl font-bold text-western-wood">{profile.displayName}</h1>
            
            {profile.username && (
              <p className="text-lg text-western-wood/70 mb-2">@{profile.username}</p>
            )}
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-1">
              <div className="bg-western-sand/30 px-3 py-1 rounded-full text-sm text-western-wood/80">
                <span className="font-bold">{scammersCount}</span> Reports
              </div>
            </div>
            
            {profile.bio && (
              <p className="mt-4 text-western-wood/80 max-w-2xl text-center sm:text-left">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
