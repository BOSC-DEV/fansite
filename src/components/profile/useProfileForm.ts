
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { storageService, UserProfile } from "@/services/storage";
import { isSupabaseConfigured } from "@/lib/supabase";
import { v4 as uuidv4 } from 'uuid';

export interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

export function useProfileForm() {
  const { isConnected, address } = useWallet();
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [xLink, setXLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [bio, setBio] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    // Reset states when address changes or disconnects
    if (!isConnected || !address) {
      setProfileId(undefined);
      setDisplayName("");
      setUsername("");
      setProfilePicUrl("");
      setXLink("");
      setWebsiteLink("");
      setBio("");
      setBioCharCount(0);
      setHasProfile(false);
      return;
    }

    // Check if user already has a profile using the storageService
    const fetchProfile = async () => {
      if (isConnected && address && supabaseReady) {
        try {
          const profile = await storageService.getProfile(address);
          if (profile) {
            setProfileId(profile.id);
            setDisplayName(profile.displayName || "");
            setUsername(profile.username || "");
            setProfilePicUrl(profile.profilePicUrl || "");
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

  useEffect(() => {
    // Validate username with debounce
    if (username) {
      const timer = setTimeout(() => {
        checkUsernameAvailability(username);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameAvailable(true);
    }
  }, [username]);

  const checkUsernameAvailability = async (usernameToCheck: string) => {
    if (!usernameToCheck) return;
    
    if (usernameToCheck.length < 3) {
      setUsernameAvailable(false);
      return;
    }
    
    // Only allow alphanumeric and underscore
    if (!/^[a-zA-Z0-9_]+$/.test(usernameToCheck)) {
      setUsernameAvailable(false);
      return;
    }
    
    setCheckingUsername(true);
    try {
      const isAvailable = await storageService.isUsernameAvailable(usernameToCheck, address);
      setUsernameAvailable(isAvailable);
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    // Lowercase and replace spaces with underscores
    const formattedValue = value.toLowerCase().replace(/\s+/g, '_');
    setUsername(formattedValue);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 142) {
      setBio(text);
      setBioCharCount(text.length);
    }
  };

  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty URLs are considered valid (optional field)
    
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

    if (!username.trim()) {
      toast.error("Please enter a username");
      return false;
    }

    if (!usernameAvailable) {
      toast.error("Username is not available or invalid");
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
    if (!address) {
      toast.error("Wallet not connected");
      return false;
    }

    setIsSubmitting(true);
    
    try {
      const uniqueId = profileId || uuidv4();
      
      // Store profile using storageService
      if (address && supabaseReady) {
        const profile: UserProfile = {
          id: uniqueId,
          displayName,
          username,
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
            setProfileId(uniqueId);
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
      username,
      profilePicUrl,
      xLink,
      websiteLink,
      bio,
      bioCharCount,
    },
    setDisplayName,
    setUsername: handleUsernameChange,
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
    profileId,
    usernameAvailable,
    checkingUsername,
  };
}
