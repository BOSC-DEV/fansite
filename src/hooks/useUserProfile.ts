
import { useState, useEffect } from "react";
import { storageService, UserProfile, ScammerListing } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { supabase } from "@/integrations/supabase/client";

export function useUserProfile(username: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProfileAndScammers = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        if (!username) {
          setError("Invalid username");
          setIsLoading(false);
          return;
        }
        
        console.log("Fetching profile for:", username);
        
        // Check if input looks like a wallet address (simple check)
        const isWalletAddress = username.length > 30;
        let profileData = null;
        
        if (isWalletAddress) {
          console.log("Input looks like a wallet address, trying to fetch by address");
          profileData = await storageService.getProfile(username);
        } else {
          console.log("Input looks like a username, trying to fetch by username");
          profileData = await storageService.getProfileByUsername(username);
        }
        
        if (!profileData) {
          console.log("Profile not found, checking localStorage as fallback");
          try {
            // Check localStorage for this wallet/username as fallback
            const storageKey = `profile_${username}`;
            const localData = localStorage.getItem(storageKey);
            
            if (localData) {
              console.log("Found profile in localStorage:", localData);
              profileData = JSON.parse(localData);
            } else if (isWalletAddress) {
              // Last resort: try local storage with different key format
              const allStorageKeys = Object.keys(localStorage);
              const profileKeys = allStorageKeys.filter(key => key.startsWith('profile_'));
              
              for (const key of profileKeys) {
                const storedProfile = JSON.parse(localStorage.getItem(key) || '{}');
                if (storedProfile.walletAddress === username) {
                  console.log("Found profile by wallet address in localStorage");
                  profileData = storedProfile;
                  break;
                }
              }
            }
          } catch (e) {
            console.error("Error checking localStorage:", e);
          }
        }
        
        if (!profileData) {
          console.log("Profile not found in any data source");
          setError("Profile not found");
          setIsLoading(false);
          return;
        }
        
        console.log("Profile found:", profileData);
        setProfile(profileData);
        
        // Fetch scammers added by this user
        const allScammers = await storageService.getAllScammers();
        const userScammers = allScammers.filter(
          scammer => scammer.addedBy === profileData.walletAddress
        );
        
        console.log(`Found ${userScammers.length} scammers by this user`);
        // Convert ScammerListing to Scammer (with date conversion)
        const convertedScammers = userScammers.map(scammer => ({
          ...scammer,
          dateAdded: new Date(scammer.dateAdded)
        }));
        setScammers(convertedScammers);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileAndScammers();
  }, [username]);
  
  return { profile, scammers, isLoading, error };
}
