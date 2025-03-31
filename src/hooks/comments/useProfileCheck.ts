
import { useState, useEffect } from "react";
import { profileService } from "@/services/storage/profileService";

/**
 * Hook to check if a user has a profile based on wallet address
 */
export function useProfileCheck(address?: string) {
  const [profileState, setProfileState] = useState({
    profileChecked: false,
    hasProfile: false,
  });
  
  // Check if user has a profile
  useEffect(() => {
    if (address) {
      const checkProfile = async () => {
        try {
          const exists = await profileService.hasProfile(address);
          setProfileState({
            hasProfile: exists,
            profileChecked: true
          });
        } catch (error) {
          console.error("Error checking if user has profile:", error);
          setProfileState(prev => ({
            ...prev,
            profileChecked: true
          }));
        }
      };
      
      checkProfile();
    } else {
      setProfileState({
        profileChecked: false,
        hasProfile: false
      });
    }
  }, [address]);

  return profileState;
}
