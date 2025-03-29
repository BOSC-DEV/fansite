
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useWallet } from "@/context/wallet";
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
  const [authInitialized, setAuthInitialized] = useState(false);
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

  // Initialize auth when component mounts
  useEffect(() => {
    const initAuth = async () => {
      if (isConnected && address) {
        try {
          // Try to establish authentication
          const isAuth = await establishAuth(connectWallet);
          console.log("Auth initialized, authenticated:", isAuth);
          setAuthInitialized(true);
        } catch (err) {
          console.error("Error establishing auth:", err);
          setAuthInitialized(true); // Set to true even on error to allow the component to proceed
        }
      } else {
        setAuthInitialized(true);
      }
    };
    
    initAuth();
  }, [isConnected, address, connectWallet]);

  // Ensure storage bucket exists when component mounts
  useEffect(() => {
    if (isConnected) {
      ensureStorageBucketExists('profile-images').catch(error => {
        console.error("Error ensuring profile-images bucket exists:", error);
      });
    }
  }, [isConnected]);

  // Fetch existing profile data when auth is initialized
  useEffect(() => {
    const fetchProfileData = async () => {
      if (!isConnected || !address || !authInitialized) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching profile for wallet address:", address);
        
        // First ensure we're authenticated
        const isAuthenticated = await validateAuth();
        
        if (!isAuthenticated) {
          console.log("Not authenticated, attempting to establish auth");
          const reauth = await establishAuth(connectWallet);
          
          if (!reauth) {
            console.warn("Could not establish authentication");
            toast.error("Please reconnect your wallet to view your profile");
            setIsLoading(false);
            return;
          }
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
  }, [isConnected, address, connectWallet, authInitialized]);

  // Check if username is available
  const checkUsername = async (username: string) => {
    if (!username || username.trim() === '') {
      setUsernameAvailable(false);
      return;
    }
    
    setCheckingUsername(true);
    try {
      // Ensure we're authenticated
      await validateAuth();
      
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
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    toast.loading("Saving your profile...");
    
    try {
      // Ensure user is authenticated with Supabase
      const isAuthenticated = await validateAuth();
      
      if (!isAuthenticated) {
        console.log("Not authenticated, attempting to establish auth");
        const reauth = await establishAuth(connectWallet);
        
        if (!reauth) {
          toast.dismiss();
          toast.error("Authentication required. Please reconnect your wallet.");
          setIsSubmitting(false);
          return;
        }
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

  const handleReconnect = async () => {
    try {
      await connectWallet();
      // Reload the page to refresh everything
      window.location.reload();
    } catch (error) {
      console.error("Failed to reconnect wallet:", error);
      toast.error("Failed to reconnect wallet. Please try again.");
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
    <>
      <div className="mb-6 flex justify-between items-center">
        <div>
          {!authInitialized || (!isLoading && !hasProfile) ? (
            <button
              onClick={handleReconnect}
              className="bg-western-accent hover:bg-western-accent/80 text-white py-2 px-4 rounded flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
                <path d="M3 3v5h5"></path>
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
                <path d="M16 21h5v-5"></path>
              </svg>
              Reconnect Wallet
            </button>
          ) : null}
        </div>
        <WalletDisconnect onDisconnect={() => navigate('/')} />
      </div>
      <UserProfileForm
        formData={formData}
        setDisplayName={(value) => setFormData(prev => ({ ...prev, displayName: value }))}
        setUsername={(value) => {
          setFormData(prev => ({ ...prev, username: value }));
          checkUsername(value);
        }}
        setProfilePicUrl={(value) => setFormData(prev => ({ ...prev, profilePicUrl: value }))}
        setXLink={(value) => setFormData(prev => ({ ...prev, xLink: value }))}
        setWebsiteLink={(value) => setFormData(prev => ({ ...prev, websiteLink: value }))}
        handleBioChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
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
