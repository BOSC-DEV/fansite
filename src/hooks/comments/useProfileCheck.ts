
import { useState, useEffect } from "react";
import { storageService } from "@/services/storage/localStorageService";
import { supabase } from "@/lib/supabase";

export function useProfileCheck(address: string | null) {
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  // Check if user has a profile
  useEffect(() => {
    const checkProfile = async () => {
      if (address) {
        try {
          // Check if user has a profile in Supabase
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', address)
            .single();
          
          setHasProfile(!!data);
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking profile:", error);
          // Fallback to localStorage
          const profile = storageService.getProfile(address);
          setHasProfile(!!profile);
          setProfileChecked(true);
        }
      } else {
        setProfileChecked(false);
        setHasProfile(false);
      }
    };
    
    checkProfile();
  }, [address]);

  return {
    profileChecked,
    hasProfile
  };
}
