
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { storageService, UserProfile } from "@/services/storage";
import { isSupabaseConfigured } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";

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
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
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
          setIsFetchingProfile(true);
          console.log("[useProfileForm] Fetching profile for address:", address);
          const profile = await storageService.getProfile(address);
          
          if (profile) {
            console.log("[useProfileForm] Profile found:", profile);
            setProfileId(profile.id);
            setDisplayName(profile.displayName || "");
            setUsername(profile.username || "");
            setProfilePicUrl(profile.profilePicUrl || "");
            setXLink(profile.xLink || "");
            setWebsiteLink(profile.websiteLink || "");
            setBio(profile.bio || "");
            setBioCharCount(profile.bio ? profile.bio.length : 0);
            setHasProfile(true);
          } else {
            console.log("[useProfileForm] No profile found for address:", address);
            setHasProfile(false);
          }
        } catch (error) {
          console.error("[useProfileForm] Error fetching profile:", error);
          toast.error("Failed to load profile data");
        } finally {
          setIsFetchingProfile(false);
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
      console.log("[useProfileForm] Checking username availability:", usernameToCheck);
      const isAvailable = await storageService.isUsernameAvailable(usernameToCheck, address);
      setUsernameAvailable(isAvailable);
    } catch (error) {
      console.error("[useProfileForm] Error checking username:", error);
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
    console.log("[useProfileForm] Starting profile save for address:", address);
    
    try {
      // Use the wallet address as the unique ID
      const uniqueId = address;
      console.log("[useProfileForm] Using ID:", uniqueId);
      
      // Direct database insert/update to eliminate potential issues with the service layer
      if (address && supabaseReady) {
        // Check if profile exists
        const { data: existingProfile, error: checkError } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', address)
          .maybeSingle();
        
        if (checkError) {
          console.error('[useProfileForm] Error checking profile existence:', checkError);
          toast.error("Error checking if profile exists");
          return false;
        }
        
        // Convert to database format
        const dbProfile = {
          id: uniqueId,
          display_name: displayName,
          username: username,
          profile_pic_url: profilePicUrl,
          wallet_address: address,
          created_at: new Date().toISOString(),
          x_link: xLink || null,
          website_link: websiteLink || null,
          bio: bio || null
        };
        
        console.log("[useProfileForm] Prepared profile data:", dbProfile);
        
        let result;
        
        if (existingProfile) {
          console.log("[useProfileForm] Updating existing profile");
          result = await supabase
            .from('profiles')
            .update(dbProfile)
            .eq('wallet_address', address);
        } else {
          console.log("[useProfileForm] Creating new profile");
          result = await supabase
            .from('profiles')
            .insert(dbProfile);
        }
        
        if (result.error) {
          console.error('[useProfileForm] Error saving profile:', result.error);
          toast.error(`Failed to save profile: ${result.error.message}`);
          return false;
        }
        
        console.log("[useProfileForm] Profile saved successfully");
        toast.success("Profile saved successfully");
        setHasProfile(true);
        setProfileId(uniqueId);
        return true;
      }
      return false;
    } catch (error) {
      console.error("[useProfileForm] Error saving profile:", error);
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
    isFetchingProfile,
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
