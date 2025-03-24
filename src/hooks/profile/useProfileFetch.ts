
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
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);
  const supabaseReady = isSupabaseConfigured();

  useEffect(() => {
    // Reset states when address changes or disconnects
    if (!isConnected || !address) {
      setProfileId(undefined);
      setHasProfile(false);
      setPreviousAddress(null);
      return;
    }

    // Reset states if wallet address changed
    if (previousAddress && previousAddress !== address) {
      console.log("[useProfileFetch] Wallet address changed from", previousAddress, "to", address, "- resetting profile state");
      setProfileId(undefined);
      setHasProfile(false);
    }

    // Update previous address for next comparison
    setPreviousAddress(address);

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
            setProfileId(undefined);
            return null;
          }
        } catch (error) {
          console.error("[useProfileFetch] Error fetching profile:", error);
          setHasProfile(false);
          setProfileId(undefined);
          return null;
        } finally {
          setIsFetchingProfile(false);
        }
      }
      return null;
    };

    fetchProfile();
  }, [isConnected, address, supabaseReady]);

  return {
    isFetchingProfile,
    hasProfile,
    profileId,
    supabaseReady,
  };
}
