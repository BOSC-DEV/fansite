
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User, Twitter, Globe, Wallet } from "lucide-react";
import { UserProfile } from "@/services/storage";
import { EditProfileButton } from "./EditProfileButton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ProfileHeaderProps {
  profile: UserProfile;
  scammersCount: number;
}

export function ProfileHeader({ profile, scammersCount }: ProfileHeaderProps) {
  const copyAddressToClipboard = () => {
    navigator.clipboard.writeText(profile.walletAddress);
    toast.success("Address copied to clipboard");
  };

  return (
    <Card className="mb-6 relative">
      <EditProfileButton profileAddress={profile.walletAddress} />
      <CardContent className="pt-6">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-western-sand/40">
            <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
            <AvatarFallback className="bg-western-sand/30">
              <User className="h-12 w-12 text-western-wood/70" />
            </AvatarFallback>
          </Avatar>
          
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold text-western-wood">{profile.displayName}</h1>
            
            {profile.username && (
              <p className="text-lg text-western-wood/70 mb-2">@{profile.username}</p>
            )}
            
            <div className="flex flex-wrap gap-3 justify-center mt-1">
              <div className="bg-western-sand/30 px-3 py-1 rounded-full text-sm text-western-wood/80">
                <span className="font-bold">{scammersCount}</span> Reports
              </div>
            </div>
            
            {profile.bio && (
              <p className="mt-4 text-western-wood/80 max-w-2xl text-center">
                {profile.bio}
              </p>
            )}
            
            <div className="mt-4 flex items-center justify-center space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-western-sand/20 border-western-wood/20 hover:bg-western-sand/40 flex items-center gap-2"
                onClick={copyAddressToClipboard}
              >
                <Wallet size={16} className="text-western-wood" />
                <span className="truncate max-w-[120px]">{profile.walletAddress.substring(0, 6)}...{profile.walletAddress.substring(profile.walletAddress.length - 4)}</span>
              </Button>
              
              {profile.xLink && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-western-sand/20 border-western-wood/20 hover:bg-western-sand/40"
                  asChild
                >
                  <a href={profile.xLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Twitter size={16} className="text-western-wood" />
                  </a>
                </Button>
              )}
              
              {profile.websiteLink && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-western-sand/20 border-western-wood/20 hover:bg-western-sand/40"
                  asChild
                >
                  <a href={profile.websiteLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Globe size={16} className="text-western-wood" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
