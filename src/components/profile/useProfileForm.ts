
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

export interface ProfileFormData {
  displayName: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

export function useProfileForm() {
  const { isConnected, address } = useWallet();
  const [displayName, setDisplayName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [xLink, setXLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");
  const [bio, setBio] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user already has a profile
    if (isConnected && address) {
      const storedProfile = localStorage.getItem(`profile-${address}`);
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setDisplayName(profile.displayName);
        setProfilePicUrl(profile.profilePicUrl);
        setXLink(profile.xLink || "");
        setWebsiteLink(profile.websiteLink || "");
        setBio(profile.bio || "");
        setBioCharCount(profile.bio ? profile.bio.length : 0);
        setHasProfile(true);
      }
    }
  }, [isConnected, address]);

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
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Store profile in localStorage
      if (address) {
        const profile = {
          displayName,
          profilePicUrl,
          xLink,
          websiteLink,
          bio,
          walletAddress: address,
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(`profile-${address}`, JSON.stringify(profile));
        toast.success("Profile saved successfully");
        setHasProfile(true);
        
        return true;
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
  };
}
