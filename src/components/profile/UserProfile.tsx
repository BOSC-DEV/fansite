import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { validateAuth, establishAuth, ensureStorageBucketExists } from "@/utils/supabaseHelpers";
import type { Database } from '@/integrations/supabase/database.types';
import { WalletDisconnect } from "@/components/wallet/WalletDisconnect";

type ProfileRow = Database['public']['Tables']['profiles']['Row'];

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
  const { isConnected, address, connectWallet, disconnectWallet } = useWallet();
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
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(undefined);

  // Ensure storage bucket exists when component mounts
  useEffect(() => {
    if (isConnected) {
      ensureStorageBucketExists('profile-images').catch(error => {
        console.error("Error ensuring profile-images bucket exists:", error);
      });
    }
  }, [isConnected]);

  // Fetch existing profile data when component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isConnected || !address) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching profile for wallet address:", address);
        
        // First try to establish authentication
        const isAuthenticated = await establishAuth(connectWallet);
        
        if (!isAuthenticated) {
          console.warn("Could not establish authentication after reconnect attempt");
          toast.error("Please reconnect your wallet to view your profile");
          setIsLoading(false);
          return;
        }
        
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
          console.log("Profile found in Supabase:", data);
          
          // Type assertion of data as ProfileRow
          const typedData = data as ProfileRow;
          
          setFormData({
            displayName: typedData.display_name || "",
            username: typedData.username || "",
            profilePicUrl: typedData.profile_pic_url || "",
            xLink: typedData.x_link || "",
            websiteLink: typedData.website_link || "",
            bio: typedData.bio || ""
          });
          setHasProfile(true);
        } else {
          console.log("No profile found for address:", address);
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
    
    // Also check email verification status
    const checkEmailVerification = async () => {
      if (isConnected) {
        const { data } = await supabase.auth.getUser();
        if (data?.user) {
          setEmailVerified(data.user.email_confirmed_at !== null);
        }
      }
    };
    
    checkEmailVerification();
  }, [isConnected, address, connectWallet]);

  // Check if username is available
  const checkUsername = async (username: string) => {
    if (!username || username.trim() === '') {
      setUsernameAvailable(false);
      return;
    }
    
    setCheckingUsername(true);
    try {
      // Establish auth before checking username
      await establishAuth(connectWallet);
      
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
        const profileData = data as { wallet_address: string } | null;
        setUsernameAvailable(!profileData || (profileData.wallet_address === address));
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
      try {
        await connectWallet();
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        return;
      }
      
      if (!isConnected || !address) {
        toast.error("Wallet connection required to save profile");
        return;
      }
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    toast.loading("Saving your profile...");
    
    try {
      // Ensure user is authenticated with Supabase
      const isAuthenticated = await establishAuth(connectWallet);
      
      if (!isAuthenticated) {
        toast.dismiss();
        toast.error("Authentication required. Please reconnect your wallet.");
        setIsSubmitting(false);
        return;
      }
      
      // Ensure the storage bucket exists
      await ensureStorageBucketExists('profile-images');
      
      const profileId = hasProfile ? undefined : uuidv4();
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
      
      console.log("Saving profile to Supabase:", profileData);
      
      // Save to Supabase
      const { error } = await supabase
        .from('profiles')
        .upsert(profileData, { 
          onConflict: 'wallet_address',
          ignoreDuplicates: false 
        });
      
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

  const onRequestEmailVerification = async () => {
    if (!isConnected) return;
    
    // For email verification, we would need to implement the actual email verification
    // flow using Supabase auth, but for now we'll just show a message
    toast.info("Email verification requested");
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    navigate('/');
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
    <>
      <div className="mb-6">
        <WalletDisconnect onDisconnect={() => navigate('/')} />
      </div>
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
        emailVerified={emailVerified}
        onRequestEmailVerification={onRequestEmailVerification}
      />
    </>
  );
}

export default UserProfile;
