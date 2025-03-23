
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { isSupabaseConfigured } from "@/lib/supabase";

export function useProfileFetch() {
  const { isConnected, address } = useWallet();
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [profileId, setProfileId] = useState<string | undefined>(undefined);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    // Reset states when address changes or disconnects
    if (!isConnected || !address) {
      setProfileId(undefined);
      setHasProfile(false);
      return;
    }

    // Check if user already has a profile using the storageService
    const fetchProfile = async () => {
      if (isConnected && address && supabaseReady) {
        try {
          setIsFetchingProfile(true);
          console.log("[useProfileFetch] Fetching profile for address:", address);
          const profile = await storageService.getProfile(address);
          
          if (profile) {
            console.log("[useProfileFetch] Profile found:", profile);
            setProfileId(profile.id);
            setHasProfile(true);
            return profile;
          } else {
            console.log("[useProfileFetch] No profile found for address:", address);
            setHasProfile(false);
            return null;
          }
        } catch (error) {
          console.error("[useProfileFetch] Error fetching profile:", error);
          toast.error("Failed to load profile data");
          return null;
        } finally {
          setIsFetchingProfile(false);
        }
      }
      return null;
    };

    return () => {
      // This serves as both the fetchProfile call and the cleanup function
      fetchProfile();
    };
  }, [isConnected, address, supabaseReady]);

  return {
    isFetchingProfile,
    hasProfile,
    profileId,
    supabaseReady,
  };
}
