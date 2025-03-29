
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
          console.log("[useProfileFormSubmit] Checking if user has profile:", address);
          const exists = await storageService.hasProfile(address);
          setHasProfile(exists);
          if (exists) {
            // Get the profile to retrieve its ID
            const profile = await storageService.getProfile(address);
            if (profile && profile.id) {
              setProfileId(profile.id);
              console.log("[useProfileFormSubmit] Found existing profile with ID:", profile.id);
            }
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

    // Prevent multiple submissions
    if (isSubmitting) return false;
    
    setIsSubmitting(true);
    console.log("[useProfileFormSubmit] Starting profile save for address:", address);
    console.log("[useProfileFormSubmit] Form data being saved:", formData);
    
    try {
      // Generate a new ID if none exists or use existing one
      let currentProfileId = profileId || uuidv4();
      
      // Prepare the profile data
      const profileData = {
        id: currentProfileId,
        displayName: formData.displayName,
        username: formData.username,
        profilePicUrl: formData.profilePicUrl,
        walletAddress: address,
        createdAt: new Date().toISOString(),
        xLink: formData.xLink || '',
        websiteLink: formData.websiteLink || '',
        bio: formData.bio || ''
      };
      
      console.log("[useProfileFormSubmit] Prepared profile data:", profileData);
      
      let success = false;
      
      try {
        // Direct approach: Use insert, update, or upsert based on whether profile exists
        if (hasProfile && profileId) {
          console.log("[useProfileFormSubmit] Updating existing profile with ID:", profileId);
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              display_name: profileData.displayName,
              username: profileData.username,
              profile_pic_url: profileData.profilePicUrl,
              x_link: profileData.xLink,
              website_link: profileData.websiteLink,
              bio: profileData.bio
            })
            .eq('id', profileId);
          
          if (updateError) {
            console.error("[useProfileFormSubmit] Error updating profile:", updateError);
            throw new Error(updateError.message);
          }
          
          success = true;
          console.log("[useProfileFormSubmit] Profile updated successfully with direct update");
        } else {
          console.log("[useProfileFormSubmit] Creating new profile with ID:", currentProfileId);
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: currentProfileId,
              display_name: profileData.displayName,
              username: profileData.username,
              profile_pic_url: profileData.profilePicUrl,
              wallet_address: address,
              created_at: profileData.createdAt,
              x_link: profileData.xLink,
              website_link: profileData.websiteLink,
              bio: profileData.bio
            });
          
          if (insertError) {
            console.error("[useProfileFormSubmit] Error creating profile:", insertError);
            throw new Error(insertError.message);
          }
          
          success = true;
          console.log("[useProfileFormSubmit] Profile created successfully with direct insert");
        }
      } catch (directError) {
        console.error("[useProfileFormSubmit] Direct database operation failed:", directError);
        
        // Final fallback: Use the storage service's saveProfile method
        console.log("[useProfileFormSubmit] Attempting to save profile using storage service");
        success = await storageService.saveProfile(profileData);
        
        if (success) {
          console.log("[useProfileFormSubmit] Profile saved successfully via storage service");
        } else {
          console.error("[useProfileFormSubmit] Failed to save profile even with storage service");
          throw new Error("Failed to save profile with all methods");
        }
      }
      
      if (!success) {
        throw new Error("Failed to save profile");
      }
      
      console.log("[useProfileFormSubmit] Profile saved successfully");
      setHasProfile(true);
      setProfileId(currentProfileId);
      
      return true;
      
    } catch (error) {
      console.error("[useProfileFormSubmit] Error saving profile:", error);
      throw error;
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
