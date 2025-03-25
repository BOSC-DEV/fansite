
import React from "react";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { BasicInfoForm } from "./BasicInfoForm";
import { SocialLinksForm } from "./SocialLinksForm";
import { ProfileFormHeader } from "./ProfileFormHeader";
import { ProfileFormFooter } from "./ProfileFormFooter";
import { UsernameInput } from "./UsernameInput";
import { ProfileFormData } from "@/hooks/profile/useProfileForm";

interface UserProfileFormProps {
  formData: ProfileFormData;
  setDisplayName: (name: string) => void;
  setUsername: (username: string) => void;
  setProfilePicUrl: (url: string) => void;
  setXLink: (link: string) => void;
  setWebsiteLink: (link: string) => void;
  handleBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isSubmitting: boolean;
  hasProfile: boolean;
  saveProfile: () => Promise<boolean>;
  address: string | null;
  usernameAvailable: boolean;
  checkingUsername: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
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
  address,
  usernameAvailable,
  checkingUsername,
  handleSubmit
}: UserProfileFormProps) {
  // Prevent default form submission on image upload
  const onSubmit = (e: React.FormEvent) => {
    handleSubmit(e);
  };

  // Handler for profile picture change
  const handleProfilePicChange = (url: string) => {
    console.log("[UserProfileForm] Profile picture changed to:", url);
    setProfilePicUrl(url);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto">
      <div className="bg-background border border-western-sand/20 rounded-lg shadow-sm overflow-hidden">
        <ProfileFormHeader hasProfile={hasProfile} address={address} />
        
        <div className="p-6 space-y-4">
          <ProfilePictureUpload 
            displayName={formData.displayName} 
            profilePicUrl={formData.profilePicUrl} 
            onProfilePicChange={handleProfilePicChange}
            userId={address || ""}
          />
          
          <div className="space-y-4">
            <UsernameInput 
              username={formData.username}
              setUsername={setUsername}
              usernameAvailable={usernameAvailable}
              checkingUsername={checkingUsername}
            />

            <BasicInfoForm
              displayName={formData.displayName}
              bio={formData.bio}
              bioCharCount={formData.bioCharCount}
              walletAddress={address}
              onDisplayNameChange={setDisplayName}
              onBioChange={handleBioChange}
            />

            <SocialLinksForm
              xLink={formData.xLink}
              websiteLink={formData.websiteLink}
              onXLinkChange={setXLink}
              onWebsiteLinkChange={setWebsiteLink}
            />
          </div>
        </div>
        
        <ProfileFormFooter 
          isSubmitting={isSubmitting} 
          hasProfile={hasProfile}
          usernameAvailable={usernameAvailable}
        />
      </div>
    </form>
  );
}
