
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
          <Avatar className="h-24 w-24 border-2 border-western-sand">
            <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
            <AvatarFallback className="bg-western-sand/20">
              <User className="h-12 w-12 text-western-parchment" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="text-2xl font-bold text-western-parchment">{profile.displayName}</h1>
            
            {profile.username && (
              <p className="text-lg text-western-sand mb-2">@{profile.username}</p>
            )}
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-1">
              <div className="bg-western-wood/40 px-3 py-1 rounded-full text-sm">
                <span className="font-bold">{scammersCount}</span> Reports
              </div>
              
              {profile.location && (
                <div className="bg-western-wood/40 px-3 py-1 rounded-full text-sm">
                  📍 {profile.location}
                </div>
              )}
            </div>
            
            {profile.bio && (
              <p className="mt-4 text-western-parchment/90 max-w-2xl text-center sm:text-left">
                {profile.bio}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
