
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { ProfileFormHeader } from "./ProfileFormHeader";
import { ProfileFormFooter } from "./ProfileFormFooter";
import { UsernameInput } from "./UsernameInput";
import { ProfileLinks } from "./ProfileLinks";

// Update the interface to include our new props
interface UserProfileFormProps {
  formData: {
    displayName: string;
    username: string;
    profilePicUrl: string;
    xLink: string;
    websiteLink: string;
    bio: string;
  };
  setDisplayName: (name: string) => void;
  setUsername: (username: string) => void;
  setProfilePicUrl: (url: string) => void;
  setXLink: (link: string) => void;
  setWebsiteLink: (link: string) => void;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  hasProfile: boolean;
  saveProfile: () => Promise<boolean>;
  address: string | undefined;
  usernameAvailable: boolean;
  checkingUsername: boolean;
  handleSubmit: (e: React.FormEvent) => void;
}
export function UserProfileForm({
  formData,
  setDisplayName,
  setUsername,
  setProfilePicUrl,
  setXLink,
  setWebsiteLink,
  handleBioChange,
  isSubmitting,
  hasProfile,
  saveProfile,
  address,
  usernameAvailable,
  checkingUsername,
  handleSubmit
}: UserProfileFormProps) {
  return <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <ProfileFormHeader hasProfile={hasProfile} address={address} />
      
      <div className="p-6 space-y-6 py-0">
        <ProfilePictureUpload displayName={formData.displayName} profilePicUrl={formData.profilePicUrl} onProfilePicChange={setProfilePicUrl} userId={address || ""} />
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="displayName">Display Name</Label>
              <Input id="displayName" placeholder="Enter your display name" value={formData.displayName} onChange={e => setDisplayName(e.target.value)} className="mt-1" />
            </div>
            
            <UsernameInput username={formData.username} setUsername={setUsername} isAvailable={usernameAvailable} checkingUsername={checkingUsername} />
          </div>
          
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself" value={formData.bio} onChange={handleBioChange} className="mt-1 h-32" />
          </div>
          
          <ProfileLinks xLink={formData.xLink} websiteLink={formData.websiteLink} onXLinkChange={setXLink} onWebsiteLinkChange={setWebsiteLink} />
        </div>
      </div>
      
      <ProfileFormFooter isSubmitting={isSubmitting} hasProfile={hasProfile} usernameAvailable={usernameAvailable} />
    </form>;
}
