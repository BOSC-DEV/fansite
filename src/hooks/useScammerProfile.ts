
import { useState, useEffect } from 'react';
import { profileService } from "@/services/storage";

export function useScammerProfile(addedBy: string | undefined) {
  const [addedByUsername, setAddedByUsername] = useState<string | null>(null);
  const [addedByPhotoUrl, setAddedByPhotoUrl] = useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileId, setProfileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddedByProfile = async () => {
      if (!addedBy) {
        setIsProfileLoading(false);
        return;
      }
      
      try {
        const profile = await profileService.getProfile(addedBy);
        if (profile) {
          if (profile.username) {
            setAddedByUsername(profile.username);
            setProfileId(profile.username);
          } else {
            setProfileId(profile.walletAddress);
          }
          if (profile.profilePicUrl) {
            setAddedByPhotoUrl(profile.profilePicUrl);
          }
        } else {
          setProfileId(addedBy);
        }
      } catch (error) {
        console.error("Error fetching profile for addedBy:", error);
        setProfileId(addedBy);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchAddedByProfile();
  }, [addedBy]);

  return {
    addedByUsername,
    addedByPhotoUrl,
    isProfileLoading,
    profileId
  };
}
