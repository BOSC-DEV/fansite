
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

export interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  bio: string;
  xLink: string;
  websiteLink: string;
}

export const useProfile = () => {
  const { address, isConnected } = useWallet();
  const [profile, setProfile] = useState<ProfileFormData>({
    displayName: "",
    username: "",
    profilePicUrl: "",
    bio: "",
    xLink: "",
    websiteLink: ""
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      if (!isConnected || !address) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        console.log("Loading profile for address:", address);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', address)
          .maybeSingle();

        if (error) throw error;
        
        if (data) {
          setProfile({
            displayName: data.display_name || "",
            username: data.username || "",
            profilePicUrl: data.profile_pic_url || "",
            bio: data.bio || "",
            xLink: data.x_link || "",
            websiteLink: data.website_link || ""
          });
          setHasProfile(true);
          
          // If we have a username, verify it's still available (it should be)
          if (data.username) {
            checkUsername(data.username);
          }
        } else {
          setHasProfile(false);
        }
      } catch (err) {
        console.error("Error loading profile:", err);
        setError("Failed to load profile data");
        toast.error("Failed to load profile data");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [address, isConnected]);

  // Check if username is available
  const checkUsername = async (username: string) => {
    if (!username || username.trim() === "") {
      setUsernameAvailable(false);
      return;
    }
    
    // Don't check usernames shorter than 3 characters
    if (username.length < 3) {
      setUsernameAvailable(false);
      return;
    }

    setCheckingUsername(true);
    try {
      // First, check if this username belongs to the current user
      if (hasProfile) {
        const { data: currentProfile } = await supabase
          .from('profiles')
          .select('username')
          .eq('wallet_address', address)
          .maybeSingle();
          
        if (currentProfile && currentProfile.username === username) {
          // User already owns this username
          setUsernameAvailable(true);
          setCheckingUsername(false);
          return;
        }
      }
      
      // Check if username exists for any other user
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .maybeSingle();

      if (error) throw error;
      
      // Username is available if no data is returned
      setUsernameAvailable(!data);
    } catch (err) {
      console.error("Error checking username:", err);
      // Assume username is not available on error
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  // Handle form field updates
  const updateProfile = (field: keyof ProfileFormData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    
    // Check username availability when username changes
    if (field === 'username') {
      checkUsername(value);
    }
  };

  // Validate profile data
  const validateProfile = (): boolean => {
    if (!profile.displayName.trim()) {
      toast.error("Display name is required");
      return false;
    }
    
    if (!profile.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    
    if (!usernameAvailable) {
      toast.error("Username is not available");
      return false;
    }
    
    return true;
  };

  // Save profile
  const saveProfile = async (): Promise<boolean> => {
    if (!isConnected || !address) {
      toast.error("You must connect your wallet to save your profile");
      return false;
    }
    
    if (!validateProfile()) {
      return false;
    }
    
    setSaving(true);
    setError(null);
    
    try {
      const profileData = {
        display_name: profile.displayName,
        username: profile.username,
        profile_pic_url: profile.profilePicUrl,
        wallet_address: address,
        bio: profile.bio,
        x_link: profile.xLink,
        website_link: profile.websiteLink,
        // Only set created_at for new profiles
        ...(hasProfile ? {} : { created_at: new Date().toISOString() })
      };
      
      let result;
      
      if (hasProfile) {
        // Update existing profile
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('wallet_address', address);
      } else {
        // Insert new profile
        result = await supabase
          .from('profiles')
          .insert(profileData);
      }
      
      if (result.error) throw result.error;
      
      setHasProfile(true);
      toast.success("Profile saved successfully!");
      return true;
    } catch (err) {
      console.error("Error saving profile:", err);
      setError("Failed to save profile");
      toast.error("Failed to save profile");
      return false;
    } finally {
      setSaving(false);
    }
  };

  return {
    profile,
    updateProfile,
    saveProfile,
    loading,
    saving,
    hasProfile,
    error,
    usernameAvailable,
    checkingUsername
  };
};
