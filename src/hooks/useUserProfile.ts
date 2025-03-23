
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
          setError("Invalid identifier provided");
          setIsLoading(false);
          return;
        }
        
        console.log("Fetching profile for:", username);
        
        // First try directly from Supabase - check if it's a wallet address or username
        try {
          // Try by wallet address first (more common case)
          const { data: walletProfile, error: walletError } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', username)
            .maybeSingle();
          
          if (walletProfile) {
            console.log("Profile found by wallet address in Supabase:", walletProfile);
            setProfile({
              id: walletProfile.id,
              displayName: walletProfile.display_name,
              username: walletProfile.username || '',
              profilePicUrl: walletProfile.profile_pic_url || '',
              walletAddress: walletProfile.wallet_address,
              createdAt: walletProfile.created_at,
              xLink: walletProfile.x_link || '',
              websiteLink: walletProfile.website_link || '',
              bio: walletProfile.bio || ''
            });
            
            // Fetch scammers by this user's wallet address
            const allScammers = await storageService.getAllScammers();
            const userScammers = allScammers.filter(
              scammer => scammer.addedBy === walletProfile.wallet_address
            );
            
            console.log(`Found ${userScammers.length} scammers by wallet address ${walletProfile.wallet_address}`);
            // Convert ScammerListing to Scammer (with date conversion)
            const convertedScammers = userScammers.map(scammer => ({
              ...scammer,
              dateAdded: new Date(scammer.dateAdded)
            }));
            setScammers(convertedScammers);
            setIsLoading(false);
            return;
          }
          
          // Try by username if wallet address query returned nothing
          const { data: usernameProfile, error: usernameError } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .maybeSingle();
          
          if (usernameProfile) {
            console.log("Profile found by username in Supabase:", usernameProfile);
            setProfile({
              id: usernameProfile.id,
              displayName: usernameProfile.display_name,
              username: usernameProfile.username || '',
              profilePicUrl: usernameProfile.profile_pic_url || '',
              walletAddress: usernameProfile.wallet_address,
              createdAt: usernameProfile.created_at,
              xLink: usernameProfile.x_link || '',
              websiteLink: usernameProfile.website_link || '',
              bio: usernameProfile.bio || ''
            });
            
            // Fetch scammers by this user's wallet address
            const allScammers = await storageService.getAllScammers();
            const userScammers = allScammers.filter(
              scammer => scammer.addedBy === usernameProfile.wallet_address
            );
            
            console.log(`Found ${userScammers.length} scammers by wallet address ${usernameProfile.wallet_address}`);
            // Convert ScammerListing to Scammer (with date conversion)
            const convertedScammers = userScammers.map(scammer => ({
              ...scammer,
              dateAdded: new Date(scammer.dateAdded)
            }));
            setScammers(convertedScammers);
            setIsLoading(false);
            return;
          }
        } catch (supabaseError) {
          console.error("Supabase query error:", supabaseError);
        }
        
        // Fallback to service methods if Supabase direct query fails
        try {
          // First try by wallet address
          let profileData = await storageService.getProfile(username);
          
          // If not found by wallet address, try by username
          if (!profileData) {
            console.log("Profile not found by wallet address in service, trying by username");
            profileData = await storageService.getProfileByUsername(username);
          }
          
          if (!profileData) {
            console.log("Profile not found in any data source");
            setError("Profile not found");
            setIsLoading(false);
            return;
          }
          
          console.log("Profile found via service:", profileData);
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
        } catch (serviceError) {
          console.error("Error in service methods:", serviceError);
          setError("Profile not found");
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
