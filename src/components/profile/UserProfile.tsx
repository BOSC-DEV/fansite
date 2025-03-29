
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProfileForm } from "./UserProfileForm";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { safeSupabaseQuery } from "@/utils/supabaseHelpers";

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
  const { address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
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
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(undefined);

  // Generate a unique identifier for anonymous profiles
  const getProfileIdentifier = () => {
    // Use wallet address if available, otherwise generate a unique ID and store it in localStorage
    if (address) return address;
    
    let localId = localStorage.getItem('anonymous_profile_id');
    if (!localId) {
      localId = uuidv4();
      localStorage.setItem('anonymous_profile_id', localId);
    }
    return localId;
  };

  const profileIdentifier = getProfileIdentifier();

  // Fetch existing profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching profile for identifier:", profileIdentifier);
        
        // Try to fetch profile from Supabase
        const { data, error } = await safeSupabaseQuery(() => 
          supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', profileIdentifier)
            .maybeSingle()
        );

        if (error) {
          console.error("Error fetching profile from Supabase:", error);
          throw error;
        }

        if (data) {
          // Profile exists, populate form data
          console.log("Profile found in Supabase:", data);
          setFormData({
            displayName: data.display_name || "",
            username: data.username || "",
            profilePicUrl: data.profile_pic_url || "",
            xLink: data.x_link || "",
            websiteLink: data.website_link || "",
            bio: data.bio || ""
          });
          setHasProfile(true);
          setProfileId(data.id);
        } else {
          console.log("No profile found for identifier:", profileIdentifier);
          setHasProfile(false);
        }
      } catch (err) {
        console.error("Failed to fetch profile data:", err);
        toast.error("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [profileIdentifier]);

  // Check if username is available
  const checkUsername = async (username: string) => {
    if (!username || username.trim() === '') {
      setUsernameAvailable(false);
      return;
    }
    
    setCheckingUsername(true);
    try {
      const { data, error } = await safeSupabaseQuery(() => 
        supabase
          .from('profiles')
          .select('wallet_address')
          .eq('username', username)
          .maybeSingle()
      );
      
      if (error) {
        console.error("Error checking username:", error);
        setUsernameAvailable(true); // Assume available if error
      } else {
        // If no data, username is available
        // If data exists but belongs to current user, it's available
        setUsernameAvailable(!data || (data.wallet_address === profileIdentifier));
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
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    toast.loading("Saving your profile...");
    
    try {
      const newProfileId = hasProfile && profileId ? profileId : uuidv4();
      const profileData = {
        id: newProfileId,
        display_name: formData.displayName,
        username: formData.username,
        profile_pic_url: formData.profilePicUrl,
        wallet_address: profileIdentifier,
        created_at: new Date().toISOString(),
        x_link: formData.xLink || null,
        website_link: formData.websiteLink || null,
        bio: formData.bio || null
      };
      
      console.log("Saving profile to Supabase:", profileData);
      
      // Save to Supabase
      const { error } = await safeSupabaseQuery(() =>
        supabase
          .from('profiles')
          .upsert(profileData, { 
            onConflict: 'wallet_address',
            ignoreDuplicates: false 
          })
      );
      
      if (error) {
        console.error("Error saving profile to Supabase:", error);
        toast.dismiss();
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
      address={profileIdentifier}
      usernameAvailable={usernameAvailable}
      checkingUsername={checkingUsername}
      handleSubmit={handleSubmit}
      emailVerified={emailVerified}
      onRequestEmailVerification={() => {}}
    />
  );
}

export default UserProfile;
