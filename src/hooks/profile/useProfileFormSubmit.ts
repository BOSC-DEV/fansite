
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";
import { storageService } from "@/services/storage";

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
      toast.error("Supabase is not configured properly. Please check your environment variables.");
      return false;
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
    formData: ProfileFormData, 
    usernameAvailable: boolean,
    urlValidation: FormValidation
  ) => {
    // Security check: Only allow save if wallet is connected
    if (!isConnected || !address) {
      toast.error("Wallet not connected. Authentication required to save profile.");
      return false;
    }

    if (!validateForm(formData, usernameAvailable, urlValidation)) return false;

    setIsSubmitting(true);
    console.log("[useProfileFormSubmit] Starting profile save for address:", address);
    
    try {
      // Try direct database insert/update if we're having issues with RLS
      const { data: existingProfile, error: lookupError } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', address)
        .maybeSingle();
        
      if (lookupError) {
        console.error("[useProfileFormSubmit] Error checking if profile exists:", lookupError);
      }
      
      // Prepare the profile data
      const profileData = {
        display_name: formData.displayName,
        username: formData.username,
        profile_pic_url: formData.profilePicUrl,
        wallet_address: address,
        created_at: new Date().toISOString(),
        x_link: formData.xLink || null,
        website_link: formData.websiteLink || null,
        bio: formData.bio || null
      };
      
      let result;
      
      if (existingProfile) {
        console.log("[useProfileFormSubmit] Updating existing profile with id:", existingProfile.id);
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', existingProfile.id);
      } else {
        console.log("[useProfileFormSubmit] Creating new profile for address:", address);
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert([{
            ...profileData,
            id: crypto.randomUUID() // Generate UUID on client side
          }]);
      }

      if (result.error) {
        console.error('[useProfileFormSubmit] Error saving profile:', result.error);
        
        // Try using the service as a fallback
        console.log("[useProfileFormSubmit] Attempting to save profile through service as fallback");
        
        const serviceProfileData = {
          displayName: formData.displayName,
          username: formData.username,
          profilePicUrl: formData.profilePicUrl,
          walletAddress: address,
          createdAt: new Date().toISOString(),
          xLink: formData.xLink || '',
          websiteLink: formData.websiteLink || '',
          bio: formData.bio || ''
        };
        
        const success = await storageService.saveProfile(serviceProfileData);
        
        if (!success) {
          console.error('[useProfileFormSubmit] Error saving profile through service');
          toast.error("Failed to save profile");
          return false;
        }
      }
      
      console.log("[useProfileFormSubmit] Profile saved successfully");
      setHasProfile(true);
      setProfileId(address);
      return true;
    } catch (error) {
      console.error("[useProfileFormSubmit] Error saving profile:", error);
      toast.error("Failed to save profile");
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
