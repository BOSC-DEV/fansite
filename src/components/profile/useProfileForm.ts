
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { storageService, UserProfile } from "@/services/storage/supabaseService";
import { isSupabaseConfigured } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

export interface ProfileFormData {
  displayName: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

export function useProfileForm() {
  const { isConnected, address } = useWallet();
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const [displayName, setDisplayName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [xLink, setXLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [bio, setBio] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    // Check if user already has a profile using the storageService
    const fetchProfile = async () => {
      if (isConnected && address && supabaseReady) {
        try {
          const profile = await storageService.getProfile(address);
          if (profile) {
            setProfileId(profile.id);
            setDisplayName(profile.displayName || "");
            setProfilePicUrl(profile.profilePicUrl || "");
            // The following fields might not exist in older profile objects
            setXLink(profile.xLink || "");
            setWebsiteLink(profile.websiteLink || "");
            setBio(profile.bio || "");
            setBioCharCount(profile.bio ? profile.bio.length : 0);
            setHasProfile(true);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          toast.error("Failed to load profile data");
        }
      }
    };

    fetchProfile();
  }, [isConnected, address, supabaseReady]);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 142) {
      setBio(text);
      setBioCharCount(text.length);
    }
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateForm = () => {
    if (!supabaseReady) {
      toast.error("Supabase is not configured properly. Please check your environment variables.");
      return false;
    }

    if (!displayName.trim()) {
      toast.error("Please enter a display name");
      return false;
    }

    // Validate URLs if provided
    if (xLink && !isValidUrl(xLink)) {
      toast.error("Please enter a valid X (Twitter) URL");
      return false;
    }

    if (websiteLink && !isValidUrl(websiteLink)) {
      toast.error("Please enter a valid website URL");
      return false;
    }

    return true;
  };

  const saveProfile = async () => {
    if (!validateForm()) return false;

    setIsSubmitting(true);
    
    try {
      // Store profile using storageService
      if (address && supabaseReady) {
        const profile: UserProfile = {
          id: profileId || uuidv4(), // Use existing ID or generate a new one
          displayName,
          profilePicUrl,
          walletAddress: address,
          createdAt: new Date().toISOString(),
          xLink,
          websiteLink,
          bio
        };
        
        const success = await storageService.saveProfile(profile);
        if (success) {
          toast.success("Profile saved successfully");
          setHasProfile(true);
          if (!profileId) {
            setProfileId(profile.id); // Save the new ID
          }
          return true;
        } else {
          toast.error("Failed to save profile");
          return false;
        }
      }
      return false;
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData: {
      displayName,
      profilePicUrl,
      xLink,
      websiteLink,
      bio,
      bioCharCount,
    },
    setDisplayName,
    setProfilePicUrl,
    setXLink,
    setWebsiteLink,
    handleBioChange,
    isSubmitting,
    hasProfile,
    saveProfile,
    address,
    isConnected,
    supabaseReady,
  };
}
