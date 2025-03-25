
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
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
  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-md mx-auto">
        <ProfileFormHeader hasProfile={hasProfile} address={address} />
        
        <CardContent className="space-y-4">
          <ProfilePictureUpload 
            displayName={formData.displayName} 
            profilePicUrl={formData.profilePicUrl} 
            onProfilePicChange={setProfilePicUrl}
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
        </CardContent>
        
        <ProfileFormFooter 
          isSubmitting={isSubmitting} 
          hasProfile={hasProfile}
          usernameAvailable={usernameAvailable}
        />
      </Card>
    </form>
  );
}
