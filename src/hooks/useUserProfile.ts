
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Scammer } from "@/lib/types";

export interface UserProfile {
  id?: string;
  displayName: string;
  username?: string;
  profilePicUrl?: string;
  walletAddress: string;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  bio?: string;
  points?: number;
}

export function useUserProfile(username: string | undefined) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchProfileAndScammers = async () => {
      if (!username) {
        setError("Invalid username");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      setError(null);
      
      try {
        console.log("Fetching profile for:", username);
        
        // Check if input looks like a wallet address
        const isWalletAddress = username.length > 30;
        let profileData = null;
        
        // Try Supabase first
        if (isWalletAddress) {
          // Query by wallet address
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', username)
            .maybeSingle();
            
          if (data) {
            profileData = {
              id: data.id,
              displayName: data.display_name,
              username: data.username,
              profilePicUrl: data.profile_pic_url,
              walletAddress: data.wallet_address,
              createdAt: data.created_at,
              xLink: data.x_link,
              websiteLink: data.website_link,
              bio: data.bio,
              points: data.points
            };
          }
        } else {
          // Query by username
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .maybeSingle();
            
          if (data) {
            profileData = {
              id: data.id,
              displayName: data.display_name,
              username: data.username,
              profilePicUrl: data.profile_pic_url,
              walletAddress: data.wallet_address,
              createdAt: data.created_at,
              xLink: data.x_link,
              websiteLink: data.website_link,
              bio: data.bio,
              points: data.points
            };
          }
        }
        
        // If not found in Supabase, try localStorage
        if (!profileData) {
          console.log("Profile not found in Supabase, checking localStorage");
          
          // Check all localStorage keys
          const allStorageKeys = Object.keys(localStorage);
          const profileKeys = allStorageKeys.filter(key => key.startsWith('profile_'));
          
          for (const key of profileKeys) {
            try {
              const storedData = localStorage.getItem(key);
              if (!storedData) continue;
              
              const parsed = JSON.parse(storedData);
              
              if (isWalletAddress && parsed.walletAddress === username) {
                profileData = parsed;
                break;
              } else if (!isWalletAddress && parsed.username === username) {
                profileData = parsed;
                break;
              }
            } catch (e) {
              console.error("Error parsing localStorage item:", e);
            }
          }
        }
        
        if (!profileData) {
          setError("Profile not found");
          setIsLoading(false);
          return;
        }
        
        console.log("Profile found:", profileData);
        setProfile(profileData);
        
        // Fetch scammers added by this user
        const { data: scammerData, error: scammerError } = await supabase
          .from('scammers')
          .select('*')
          .eq('added_by', profileData.walletAddress)
          .is('deleted_at', null);
          
        if (scammerError) {
          console.error("Error fetching scammers:", scammerError);
        } else if (scammerData) {
          const convertedScammers = scammerData.map(scammer => ({
            ...scammer,
            dateAdded: new Date(scammer.date_added)
          }));
          setScammers(convertedScammers);
        }
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
