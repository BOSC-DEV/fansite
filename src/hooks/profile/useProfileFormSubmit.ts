
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";
import { storageService } from "@/services/storage";
import { v4 as uuidv4 } from 'uuid';

interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

interface FormValidation {
  valid: boolean;
  message: string;
}

export function useProfileFormSubmit() {
  const { isConnected, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const supabaseReady = isSupabaseConfigured();

  // Check if user has a profile on mount
  useEffect(() => {
    const checkProfile = async () => {
      if (isConnected && address && supabaseReady) {
        try {
          const exists = await storageService.hasProfile(address);
          setHasProfile(exists);
          if (exists) {
            // Just store the address - we'll get the actual profile ID later
            setProfileId(address);
          }
        } catch (error) {
          console.error("[useProfileFormSubmit] Error checking profile:", error);
        }
      }
    };
    
    checkProfile();
  }, [isConnected, address, supabaseReady]);

  const validateForm = (
    formData: ProfileFormData, 
    usernameAvailable: boolean,
    urlValidation: FormValidation
  ) => {
    if (!supabaseReady) {
      console.warn("[useProfileFormSubmit] Supabase is not configured properly. Falling back to local storage.");
    }

    if (!formData.displayName.trim()) {
      toast.error("Please enter a display name");
      return false;
    }

    if (!formData.username.trim()) {
      toast.error("Please enter a username");
      return false;
    }

    if (!usernameAvailable) {
      toast.error("Username is not available or invalid");
      return false;
    }

    if (!urlValidation.valid) {
      toast.error(urlValidation.message);
      return false;
    }

    return true;
  };

  const saveProfile = async (
    formData?: ProfileFormData, 
    usernameAvailable?: boolean,
    urlValidation?: FormValidation
  ) => {
    // Security check: Only allow save if wallet is connected
    if (!isConnected || !address) {
      toast.error("Wallet not connected. Authentication required to save profile.");
      return false;
    }

    if (formData && usernameAvailable !== undefined && urlValidation) {
      if (!validateForm(formData, usernameAvailable, urlValidation)) return false;
    }

    setIsSubmitting(true);
    
    try {
      // Prepare the profile data
      const profileData = formData ? {
        displayName: formData.displayName,
        username: formData.username,
        profilePicUrl: formData.profilePicUrl,
        walletAddress: address,
        createdAt: new Date().toISOString(),
        xLink: formData.xLink || '',
        websiteLink: formData.websiteLink || '',
        bio: formData.bio || '',
        id: uuidv4() // Generate a UUID to avoid ID conflicts
      } : {
        displayName: "User", // Fallback if somehow no form data is provided
        username: address.slice(0, 8),
        profilePicUrl: '',
        walletAddress: address,
        createdAt: new Date().toISOString(),
        id: uuidv4()
      };
      
      // Try to save directly through service
      const success = await storageService.saveProfile(profileData);
      
      if (success) {
        console.log("[useProfileFormSubmit] Profile saved successfully");
        setHasProfile(true);
        setProfileId(address);
        return true;
      } else {
        // Fallback to localStorage if service fails
        try {
          localStorage.setItem(`profile_${address}`, JSON.stringify(profileData));
          console.log("[useProfileFormSubmit] Profile saved to localStorage as fallback");
          setHasProfile(true);
          setProfileId(address);
          return true;
        } catch (error) {
          console.error("[useProfileFormSubmit] Error during localStorage fallback:", error);
          return false;
        }
      }
    } catch (error) {
      console.error("[useProfileFormSubmit] Error saving profile:", error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    hasProfile,
    profileId,
    supabaseReady,
    saveProfile,
  };
}
