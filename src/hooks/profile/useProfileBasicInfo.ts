
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { storageService } from "@/services/storage";

export interface BasicInfoFormData {
  displayName: string;
  bio: string;
  bioCharCount: number;
}

export function useProfileBasicInfo() {
  const { isConnected, address } = useWallet();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);

  // Load profile data when wallet is connected
  useEffect(() => {
    const loadProfileData = async () => {
      if (isConnected && address) {
        try {
          const profile = await storageService.getProfile(address);
          if (profile) {
            setDisplayName(profile.displayName || "");
            setBio(profile.bio || "");
            setBioCharCount(profile.bio?.length || 0);
          }
        } catch (error) {
          console.error("[useProfileBasicInfo] Error loading profile data:", error);
        }
      }
    };
    
    loadProfileData();
  }, [isConnected, address]);

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= 142) {
      setBio(text);
      setBioCharCount(text.length);
    }
  };

  return {
    basicInfo: {
      displayName,
      bio,
      bioCharCount,
    },
    setDisplayName,
    handleBioChange,
    address,
    isConnected,
  };
}
