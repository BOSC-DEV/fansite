
import React from "react";
import { Card } from "@/components/ui/card";
import { UserProfile } from "@/services/storage";
import { Twitter, Globe } from "lucide-react";

interface InfoTabProps {
  profile: UserProfile;
}

export function InfoTab({ profile }: InfoTabProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Profile Information</h2>
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-western-sand">Display Name</h3>
            <p>{profile.displayName}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-western-sand">Username</h3>
            <p>@{profile.username}</p>
          </div>
          
          {profile.bio && (
            <div>
              <h3 className="text-sm font-medium text-western-sand">Bio</h3>
              <p>{profile.bio}</p>
            </div>
          )}
          
          <div>
            <h3 className="text-sm font-medium text-western-sand">Wallet Address</h3>
            <p className="text-xs overflow-hidden text-ellipsis">{profile.walletAddress}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-western-sand">Joined</h3>
            <p>{new Date(profile.createdAt).toLocaleDateString()}</p>
          </div>
          
          {(profile.xLink || profile.websiteLink) && (
            <div>
              <h3 className="text-sm font-medium text-western-sand">Links</h3>
              <div className="flex space-x-4 mt-2">
                {profile.xLink && (
                  <a href={profile.xLink} target="_blank" rel="noopener noreferrer" 
                     className="text-western-sand hover:text-western-accent transition-colors flex items-center gap-2">
                    <Twitter size={16} />
                    <span>X / Twitter</span>
                  </a>
                )}
                {profile.websiteLink && (
                  <a href={profile.websiteLink} target="_blank" rel="noopener noreferrer"
                     className="text-western-sand hover:text-western-accent transition-colors flex items-center gap-2">
                    <Globe size={16} />
                    <span>Website</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
