
import React, { useState } from "react";
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
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, { onConflict: 'wallet_address' });
      
      if (error) {
        console.error("Error saving profile to Supabase:", error);
        
        // Save to localStorage as fallback
        try {
          const localData = {
            id: profileId,
            displayName: formData.displayName,
            username: formData.username,
            profilePicUrl: formData.profilePicUrl,
            walletAddress: address,
            createdAt: new Date().toISOString(),
            xLink: formData.xLink || '',
            websiteLink: formData.websiteLink || '',
            bio: formData.bio || ''
          };
          
          localStorage.setItem(`profile_${address}`, JSON.stringify(localData));
          console.log("Profile saved to localStorage as fallback");
          
          toast.dismiss();
          toast.success("Profile saved (using local storage)");
          setTimeout(() => navigate(`/${formData.username}`), 1000);
        } catch (localError) {
          console.error("Error saving to localStorage:", localError);
          toast.dismiss();
          toast.error("Failed to save profile");
        }
      } else {
        // Also save to localStorage for redundancy
        try {
          const localData = {
            id: profileId,
            displayName: formData.displayName,
            username: formData.username,
            profilePicUrl: formData.profilePicUrl,
            walletAddress: address,
            createdAt: new Date().toISOString(),
            xLink: formData.xLink || '',
            websiteLink: formData.websiteLink || '',
            bio: formData.bio || ''
          };
          
          localStorage.setItem(`profile_${address}`, JSON.stringify(localData));
        } catch (localError) {
          console.error("Error saving backup to localStorage:", localError);
        }
        
        toast.dismiss();
        toast.success("Profile saved successfully!");
        setTimeout(() => navigate(`/${formData.username}`), 1000);
      }
    } catch (error) {
      console.error("Exception during profile save:", error);
      toast.dismiss();
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isConnected) {
    return <WalletConnectionState address={address} />;
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
      hasProfile={false}
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
