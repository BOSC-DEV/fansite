
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase";

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
    if (!validateForm(formData, usernameAvailable, urlValidation)) return false;
    if (!address) {
      toast.error("Wallet not connected");
      return false;
    }

    setIsSubmitting(true);
    console.log("[useProfileFormSubmit] Starting profile save for address:", address);
    
    try {
      // Use the wallet address as the unique ID
      const uniqueId = address;
      console.log("[useProfileFormSubmit] Using ID:", uniqueId);
      
      // Direct database insert/update to eliminate potential issues with the service layer
      if (address && supabaseReady) {
        // Check if profile exists
        const { data: existingProfile, error: checkError } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', address)
          .maybeSingle();
        
        if (checkError) {
          console.error('[useProfileFormSubmit] Error checking profile existence:', checkError);
          toast.error("Error checking if profile exists");
          return false;
        }
        
        // Convert to database format
        const dbProfile = {
          id: uniqueId,
          display_name: formData.displayName,
          username: formData.username,
          profile_pic_url: formData.profilePicUrl,
          wallet_address: address,
          created_at: new Date().toISOString(),
          x_link: formData.xLink || null,
          website_link: formData.websiteLink || null,
          bio: formData.bio || null
        };
        
        console.log("[useProfileFormSubmit] Prepared profile data:", dbProfile);
        
        let result;
        
        if (existingProfile) {
          console.log("[useProfileFormSubmit] Updating existing profile");
          result = await supabase
            .from('profiles')
            .update(dbProfile)
            .eq('wallet_address', address);
        } else {
          console.log("[useProfileFormSubmit] Creating new profile");
          result = await supabase
            .from('profiles')
            .insert(dbProfile);
        }
        
        if (result.error) {
          console.error('[useProfileFormSubmit] Error saving profile:', result.error);
          toast.error(`Failed to save profile: ${result.error.message}`);
          return false;
        }
        
        console.log("[useProfileFormSubmit] Profile saved successfully");
        toast.success("Profile saved successfully");
        setHasProfile(true);
        setProfileId(uniqueId);
        return true;
      }
      return false;
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
