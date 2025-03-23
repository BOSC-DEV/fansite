
import { useState, useEffect } from "react";
import { useProfileBasicInfo } from "@/hooks/profile/useProfileBasicInfo";
import { useProfileUsername } from "@/hooks/profile/useProfileUsername";
import { useProfileSocialLinks } from "@/hooks/profile/useProfileSocialLinks";
import { useProfileImage } from "@/hooks/profile/useProfileImage";
import { useProfileFormSubmit } from "@/hooks/profile/useProfileFormSubmit";
import { useProfileFetch } from "@/hooks/profile/useProfileFetch";
import { storageService } from "@/services/storage";
import { UserProfile } from "@/services/storage";

export interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
  bioCharCount: number;
}

export function useProfileForm() {
  const { basicInfo, setDisplayName, handleBioChange, address, isConnected } = useProfileBasicInfo();
  const { username, setUsername, usernameAvailable, checkingUsername } = useProfileUsername();
  const { socialLinks, setXLink, setWebsiteLink, validateUrls } = useProfileSocialLinks();
  const { profilePicUrl, setProfilePicUrl } = useProfileImage();
  const { isSubmitting, hasProfile: submissionHasProfile, profileId: submissionProfileId, supabaseReady, saveProfile: submitProfile } = useProfileFormSubmit();
  const { isFetchingProfile, hasProfile: fetchedHasProfile, profileId: fetchedProfileId } = useProfileFetch();

  // Combined states from different hooks
  const [combinedHasProfile, setCombinedHasProfile] = useState(false);
  const [combinedProfileId, setCombinedProfileId] = useState<string | undefined>(undefined);

  // Fetch profile data and populate form
  useEffect(() => {
    // Determine if the user has a profile based on fetch and submission results
    const profileExists = fetchedHasProfile || submissionHasProfile;
    setCombinedHasProfile(profileExists);
    setCombinedProfileId(fetchedProfileId || submissionProfileId);

    // Populate form data when profile is fetched
    const fetchProfileData = async () => {
      if (isConnected && address && supabaseReady && !isFetchingProfile) {
        try {
          console.log("[useProfileForm] Loading profile data for address:", address);
          const profile = await storageService.getProfile(address);
          
          if (profile) {
            console.log("[useProfileForm] Loaded profile data:", profile);
            setDisplayName(profile.displayName || "");
            setUsername(profile.username || "");
            setProfilePicUrl(profile.profilePicUrl || "");
            setXLink(profile.xLink || "");
            setWebsiteLink(profile.websiteLink || "");
            handleBioChange({ target: { value: profile.bio || "" } } as React.ChangeEvent<HTMLTextAreaElement>);
          }
        } catch (error) {
          console.error("[useProfileForm] Error fetching profile data:", error);
        }
      }
    };

    fetchProfileData();
  }, [
    isConnected, 
    address, 
    supabaseReady, 
    isFetchingProfile, 
    fetchedHasProfile, 
    submissionHasProfile, 
    fetchedProfileId, 
    submissionProfileId, 
    setDisplayName, 
    setUsername, 
    setProfilePicUrl, 
    setXLink, 
    setWebsiteLink, 
    handleBioChange
  ]);

  const saveProfile = async () => {
    const formData = {
      displayName: basicInfo.displayName,
      username,
      profilePicUrl,
      xLink: socialLinks.xLink,
      websiteLink: socialLinks.websiteLink,
      bio: basicInfo.bio,
      bioCharCount: basicInfo.bioCharCount,
    };

    const urlValidation = validateUrls();
    return await submitProfile(formData, usernameAvailable, urlValidation);
  };

  return {
    formData: {
      displayName: basicInfo.displayName,
      username,
      profilePicUrl,
      xLink: socialLinks.xLink,
      websiteLink: socialLinks.websiteLink,
      bio: basicInfo.bio,
      bioCharCount: basicInfo.bioCharCount,
    },
    setDisplayName,
    setUsername,
    setProfilePicUrl,
    setXLink,
    setWebsiteLink,
    handleBioChange,
    isSubmitting,
    hasProfile: combinedHasProfile,
    saveProfile,
    address,
    isConnected,
    profileId: combinedProfileId,
    usernameAvailable,
    checkingUsername,
    isFetchingProfile,
    supabaseReady,
  };
}
