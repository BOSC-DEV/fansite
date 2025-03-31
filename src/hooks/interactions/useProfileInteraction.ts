
import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';
import { profileService } from '@/services/storage/profileService';
import { toast } from 'sonner';

export function useProfileInteraction() {
  const [isInteractionLocked, setIsInteractionLocked] = useState(false);
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const { isConnected, address, connectWallet } = useWallet();

  useEffect(() => {
    if (address) {
      const checkProfile = async () => {
        try {
          const exists = await profileService.hasProfile(address);
          setHasProfile(exists);
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking if user has profile:", error);
          setProfileChecked(true);
        }
      };
      
      checkProfile();
    } else {
      setProfileChecked(false);
      setHasProfile(false);
    }
  }, [address]);

  const handleInteraction = async (callback: () => void) => {
    if (isInteractionLocked) return;
    setIsInteractionLocked(true);
    
    try {
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to vote");
        await connectWallet();
        setIsInteractionLocked(false);
        return;
      }

      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setIsInteractionLocked(false);
        return;
      }
      
      if (!hasProfile) {
        toast.error("You need to create a profile before voting", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteractionLocked(false);
        return;
      }

      callback();
    } catch (error) {
      console.error("Error handling interaction:", error);
      toast.error("Failed to update vote");
    } finally {
      setIsInteractionLocked(false);
    }
  };

  return {
    handleInteraction,
    isInteractionLocked,
    profileChecked,
    hasProfile
  };
}
