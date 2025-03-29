
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

export interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

export function UserProfile() {
  const navigate = useNavigate();
  const { isConnected, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [formData, setFormData] = useState<ProfileFormData>({
    displayName: "",
    username: "",
    profilePicUrl: "",
    xLink: "",
    websiteLink: "",
    bio: ""
  });
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Fetch existing profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isConnected || !address) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Try to fetch profile from Supabase
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', address)
          .maybeSingle();

        if (error) {
          console.error("Error fetching profile from Supabase:", error);
          throw error;
        }

        if (data) {
          // Profile exists, populate form data
          setFormData({
            displayName: data.display_name || "",
            username: data.username || "",
            profilePicUrl: data.profile_pic_url || "",
            xLink: data.x_link || "",
            websiteLink: data.website_link || "",
            bio: data.bio || ""
          });
          setHasProfile(true);
        } else {
          // Try localStorage as fallback
          try {
            const localData = localStorage.getItem(`profile_${address}`);
            if (localData) {
              const parsed = JSON.parse(localData);
              setFormData({
                displayName: parsed.displayName || "",
                username: parsed.username || "",
                profilePicUrl: parsed.profilePicUrl || "",
                xLink: parsed.xLink || "",
                websiteLink: parsed.websiteLink || "",
                bio: parsed.bio || ""
              });
              setHasProfile(true);
              
              // Migrate localStorage data to Supabase
              const migrationResult = await migrateProfileToSupabase(parsed);
              if (migrationResult) {
                localStorage.removeItem(`profile_${address}`);
                console.log("Profile migrated from localStorage to Supabase");
              }
            }
          } catch (localError) {
            console.error("Error checking localStorage:", localError);
          }
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [isConnected, address]);

  // Migrate profile from localStorage to Supabase
  const migrateProfileToSupabase = async (localProfile: any) => {
    try {
      const profileData = {
        id: localProfile.id || uuidv4(),
        display_name: localProfile.displayName,
        username: localProfile.username,
        profile_pic_url: localProfile.profilePicUrl,
        wallet_address: localProfile.walletAddress,
        created_at: localProfile.createdAt || new Date().toISOString(),
        x_link: localProfile.xLink || null,
        website_link: localProfile.websiteLink || null,
        bio: localProfile.bio || null
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'wallet_address' });
      
      if (error) {
        console.error("Error migrating profile to Supabase:", error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error("Exception during profile migration:", error);
      return false;
    }
  };

  // Check if username is available
  const checkUsername = async (username: string) => {
    if (!username || username.trim() === '') {
      setUsernameAvailable(false);
      return;
    }
    
    setCheckingUsername(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('wallet_address')
        .eq('username', username)
        .maybeSingle();
      
      if (error) {
        console.error("Error checking username:", error);
        setUsernameAvailable(true); // Assume available if error
      } else {
        // If no data, username is available
        // If data exists but belongs to current user, it's available
        setUsernameAvailable(!data || (data.wallet_address === address));
      }
    } catch (error) {
      console.error("Exception checking username:", error);
      setUsernameAvailable(true); // Assume available if exception
    } finally {
      setCheckingUsername(false);
    }
  };

  // Handlers for form fields
  const handleDisplayNameChange = (value: string) => {
    setFormData(prev => ({ ...prev, displayName: value }));
  };

  const handleUsernameChange = (value: string) => {
    setFormData(prev => ({ ...prev, username: value }));
    checkUsername(value);
  };

  const handleProfilePicChange = (value: string) => {
    setFormData(prev => ({ ...prev, profilePicUrl: value }));
  };

  const handleXLinkChange = (value: string) => {
    setFormData(prev => ({ ...prev, xLink: value }));
  };

  const handleWebsiteLinkChange = (value: string) => {
    setFormData(prev => ({ ...prev, websiteLink: value }));
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, bio: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.displayName.trim()) {
      toast.error("Please enter a display name");
      return false;
    }

    if (!formData.username.trim()) {
      toast.error("Please enter a username");
      return false;
    }

    if (!usernameAvailable) {
      toast.error("Username is not available");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    toast.loading("Saving your profile...");
    
    try {
      const profileId = uuidv4();
      const profileData = {
        id: profileId,
        display_name: formData.displayName,
        username: formData.username,
        profile_pic_url: formData.profilePicUrl,
        wallet_address: address,
        created_at: new Date().toISOString(),
        x_link: formData.xLink || null,
        website_link: formData.websiteLink || null,
        bio: formData.bio || null
      };
      
      // Save to Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'wallet_address' });
      
      if (error) {
        console.error("Error saving profile to Supabase:", error);
        throw error;
      }
      
      toast.dismiss();
      toast.success("Profile saved successfully!");
      setTimeout(() => navigate(`/${formData.username}`), 1000);
    } catch (error) {
      console.error("Exception during profile save:", error);
      toast.dismiss();
      toast.error("An error occurred while saving your profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return <WalletConnectionState address={address} />;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-western-accent"></div>
        <span className="ml-3 text-western-wood">Loading profile...</span>
      </div>
    );
  }

  return (
    <UserProfileForm
      formData={formData}
      setDisplayName={handleDisplayNameChange}
      setUsername={handleUsernameChange}
      setProfilePicUrl={handleProfilePicChange}
      setXLink={handleXLinkChange}
      setWebsiteLink={handleWebsiteLinkChange}
      handleBioChange={handleBioChange}
      isSubmitting={isSubmitting}
      hasProfile={hasProfile}
      saveProfile={async () => true}
      address={address}
      usernameAvailable={usernameAvailable}
      checkingUsername={checkingUsername}
      handleSubmit={handleSubmit}
      emailVerified={undefined}
      onRequestEmailVerification={() => {}}
    />
  );
}

export default UserProfile;
