
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useProfileFormSubmit } from "./useProfileFormSubmit";
import { useProfileFetch } from "./useProfileFetch";
import { useProfileUsername } from "./useProfileUsername";
import { storageService } from "@/services/storage";

export function useProfileForm() {
  const { isConnected, address } = useWallet();
  const [formData, setFormData] = useState({
    displayName: "",
    username: "",
    profilePicUrl: "",
    xLink: "",
    websiteLink: "",
    bio: ""
  });
  
  const [urlValidation, setUrlValidation] = useState({
    valid: true,
    message: ""
  });

  // Custom hooks for profile interactions
  const { 
    hasProfile,
    profileId, 
    supabaseReady 
  } = useProfileFetch();
  
  const {
    usernameAvailable,
    checkingUsername,
    checkUsername
  } = useProfileUsername();
  
  const { 
    isSubmitting,
    saveProfile: submitProfileChanges
  } = useProfileFormSubmit();

  // Load profile data if user has a profile
  useEffect(() => {
    const loadProfile = async () => {
      if (isConnected && address && hasProfile) {
        try {
          const profile = await storageService.getProfile(address);
          if (profile) {
            setFormData({
              displayName: profile.displayName || "",
              username: profile.username || "",
              profilePicUrl: profile.profilePicUrl || "",
              xLink: profile.xLink || "",
              websiteLink: profile.websiteLink || "",
              bio: profile.bio || ""
            });
            
            if (profile.username) {
              checkUsername(profile.username, address);
            }
          }
        } catch (error) {
          console.error("Error loading profile data:", error);
        }
      }
    };

    loadProfile();
  }, [isConnected, address, hasProfile]);

  // Update form handlers
  const setDisplayName = (name: string) => {
    setFormData(prev => ({ ...prev, displayName: name }));
  };

  const setUsername = (username: string) => {
    const sanitizedUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    setFormData(prev => ({ ...prev, username: sanitizedUsername }));
    checkUsername(sanitizedUsername, address);
  };

  const setProfilePicUrl = (url: string) => {
    setFormData(prev => ({ ...prev, profilePicUrl: url }));
  };

  const setXLink = (link: string) => {
    setFormData(prev => ({ ...prev, xLink: link }));
    validateUrls(link, formData.websiteLink);
  };

  const setWebsiteLink = (link: string) => {
    setFormData(prev => ({ ...prev, websiteLink: link }));
    validateUrls(formData.xLink, link);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, bio: e.target.value }));
  };

  // URL validation
  const validateUrls = (xLink: string, websiteLink: string) => {
    const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
    
    if (xLink && !xLink.startsWith('https://twitter.com/') && !xLink.startsWith('https://x.com/')) {
      if (xLink.includes('twitter.com') || xLink.includes('x.com')) {
        setUrlValidation({
          valid: false,
          message: "X link should start with https://twitter.com/ or https://x.com/"
        });
        return;
      }
      
      if (!urlRegex.test(xLink)) {
        setUrlValidation({
          valid: false,
          message: "X link should be a valid URL"
        });
        return;
      }
    }
    
    if (websiteLink && !urlRegex.test(websiteLink)) {
      setUrlValidation({
        valid: false,
        message: "Website link should be a valid URL"
      });
      return;
    }
    
    setUrlValidation({
      valid: true,
      message: ""
    });
  };

  // Save profile, utilizing the useProfileFormSubmit hook
  const saveProfile = async () => {
    if (!isConnected || !address) {
      console.error("Cannot save profile: wallet not connected");
      return false;
    }
    
    return await submitProfileChanges(formData, usernameAvailable, urlValidation);
  };

  return {
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
    isConnected,
    profileId,
    usernameAvailable,
    checkingUsername
  };
}
