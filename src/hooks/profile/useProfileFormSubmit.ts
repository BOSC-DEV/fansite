
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
        // Use the Supabase function for more reliable profile updates
        const { data, error } = await supabase.rpc('upsert_profile', {
          profile_id: currentProfileId,
          profile_display_name: profileData.displayName,
          profile_username: profileData.username,
          profile_pic_url: profileData.profilePicUrl,
          profile_wallet_address: profileData.walletAddress,
          profile_created_at: profileData.createdAt,
          profile_x_link: profileData.xLink,
          profile_website_link: profileData.websiteLink,
          profile_bio: profileData.bio
        });
        
        if (error) {
          console.error("[useProfileFormSubmit] Error with upsert_profile function:", error);
          throw new Error(error.message);
        }
        
        success = true;
        console.log("[useProfileFormSubmit] Profile upserted via function successfully");
      } catch (rpcError) {
        console.error("[useProfileFormSubmit] RPC function failed:", rpcError);
        
        // Fall back to direct updates
        if (hasProfile && currentProfileId) {
          console.log("[useProfileFormSubmit] Falling back to direct update for existing profile with ID:", currentProfileId);
          
          // First try with direct update
          const { error } = await supabase
            .from('profiles')
            .update({
              display_name: profileData.displayName,
              username: profileData.username,
              profile_pic_url: profileData.profilePicUrl,
              x_link: profileData.xLink,
              website_link: profileData.websiteLink,
              bio: profileData.bio
            })
            .eq('id', currentProfileId);
            
          if (error) {
            console.error("[useProfileFormSubmit] Error updating profile with Supabase direct update:", error);
            
            // Try with the upsert method as fallback
            const { error: upsertError } = await supabase
              .from('profiles')
              .upsert({
                id: currentProfileId,
                display_name: profileData.displayName,
                username: profileData.username,
                profile_pic_url: profileData.profilePicUrl,
                wallet_address: address,
                x_link: profileData.xLink,
                website_link: profileData.websiteLink,
                bio: profileData.bio
              }, { onConflict: 'id' });
              
            if (upsertError) {
              console.error("[useProfileFormSubmit] Error updating profile with Supabase upsert:", upsertError);
              // As last resort, try the storage service
              success = await storageService.saveProfile(profileData);
            } else {
              success = true;
            }
          } else {
            success = true;
          }
        } else {
          // For new profiles, try direct insert first
          console.log("[useProfileFormSubmit] Creating new profile");
          
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
            console.error("[useProfileFormSubmit] Error creating profile with direct insert:", insertError);
            // Fallback to storage service
            success = await storageService.saveProfile(profileData);
          } else {
            success = true;
          }
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
