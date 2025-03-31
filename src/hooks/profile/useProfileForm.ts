
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useProfileFormSubmit } from "./useProfileFormSubmit";
import { useProfileFetch } from "./useProfileFetch";
import { useProfileUsername } from "./useProfileUsername";
import { storageService } from "@/services/storage";
import { toast } from "sonner";

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
          console.log("[useProfileForm] Loading existing profile for address:", address);
          const profile = await storageService.getProfile(address);
          if (profile) {
            console.log("[useProfileForm] Loaded profile data:", profile);
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
          } else {
            console.log("[useProfileForm] No profile found despite hasProfile being true");
          }
        } catch (error) {
          console.error("[useProfileForm] Error loading profile data:", error);
          toast.error("Error loading profile data");
        }
      }
    };

    loadProfile();
  }, [isConnected, address, hasProfile]);

  // Update form handlers
  const setDisplayName = (name: string) => {
    console.log("[useProfileForm] Setting display name:", name);
    setFormData(prev => ({ ...prev, displayName: name }));
  };

  const setUsername = (username: string) => {
    const sanitizedUsername = username.trim().toLowerCase().replace(/[^a-z0-9_]/g, '');
    console.log("[useProfileForm] Setting username:", sanitizedUsername);
    setFormData(prev => ({ ...prev, username: sanitizedUsername }));
    if (sanitizedUsername && checkUsername) {
      checkUsername(sanitizedUsername, address);
    }
  };

  const setProfilePicUrl = (url: string) => {
    console.log("[useProfileForm] Setting profile pic URL:", url);
    setFormData(prev => ({ ...prev, profilePicUrl: url }));
  };

  const setXLink = (link: string) => {
    console.log("[useProfileForm] Setting X link:", link);
    setFormData(prev => ({ ...prev, xLink: link }));
    validateUrls(link, formData.websiteLink);
  };

  const setWebsiteLink = (link: string) => {
    console.log("[useProfileForm] Setting website link:", link);
    setFormData(prev => ({ ...prev, websiteLink: link }));
    validateUrls(formData.xLink, link);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log("[useProfileForm] Setting bio:", e.target.value);
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
      console.error("[useProfileForm] Cannot save profile: wallet not connected");
      toast.error("Wallet not connected");
      return false;
    }
    
    console.log("[useProfileForm] Saving profile with data:", formData);
    
    try {
      const result = await submitProfileChanges(formData, usernameAvailable, urlValidation);
      console.log("[useProfileForm] Profile save result:", result);
      return result;
    } catch (error) {
      console.error("[useProfileForm] Error in saveProfile:", error);
      toast.error("Failed to save profile");
      return false;
    }
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
