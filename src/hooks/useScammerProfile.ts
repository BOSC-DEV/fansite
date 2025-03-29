
import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";

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
        // Try Supabase first
        const { data, error } = await supabase
          .from('profiles')
          .select('username, profile_pic_url, id, wallet_address')
          .eq('wallet_address', addedBy)
          .maybeSingle();
          
        if (data) {
          if (data.username) {
            setAddedByUsername(data.username);
            setProfileId(data.username);
          } else {
            setProfileId(data.wallet_address);
          }
          
          if (data.profile_pic_url) {
            setAddedByPhotoUrl(data.profile_pic_url);
          }
        } else {
          // Try localStorage fallback
          try {
            const localData = localStorage.getItem(`profile_${addedBy}`);
            if (localData) {
              const parsed = JSON.parse(localData);
              if (parsed.username) {
                setAddedByUsername(parsed.username);
                setProfileId(parsed.username);
              } else {
                setProfileId(addedBy);
              }
              
              if (parsed.profilePicUrl) {
                setAddedByPhotoUrl(parsed.profilePicUrl);
              }
              
              return;
            }
            
            // Check all localStorage keys
            const allStorageKeys = Object.keys(localStorage);
            const profileKeys = allStorageKeys.filter(key => key.startsWith('profile_'));
            
            for (const key of profileKeys) {
              try {
                const storedData = localStorage.getItem(key);
                if (!storedData) continue;
                
                const parsed = JSON.parse(storedData);
                if (parsed.walletAddress === addedBy) {
                  if (parsed.username) {
                    setAddedByUsername(parsed.username);
                    setProfileId(parsed.username);
                  } else {
                    setProfileId(addedBy);
                  }
                  
                  if (parsed.profilePicUrl) {
                    setAddedByPhotoUrl(parsed.profilePicUrl);
                  }
                  
                  return;
                }
              } catch (e) {
                console.error("Error parsing localStorage item:", e);
              }
            }
          } catch (localError) {
            console.error("Error checking localStorage:", localError);
          }
          
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
