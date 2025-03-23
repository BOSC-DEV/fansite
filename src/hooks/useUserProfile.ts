
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
        
        // Try profile service first (this handles both wallet address and username)
        const profileData = await storageService.getProfile(username) || 
                           await storageService.getProfileByUsername(username);
        
        if (profileData) {
          console.log("Profile found:", profileData);
          setProfile(profileData);
          
          // Fetch scammers added by this user's wallet address
          const allScammers = await storageService.getAllScammers();
          const userScammers = allScammers.filter(
            scammer => scammer.addedBy === profileData.walletAddress
          );
          
          console.log(`Found ${userScammers.length} scammers by this user`);
          const convertedScammers = userScammers.map(scammer => ({
            ...scammer,
            dateAdded: new Date(scammer.dateAdded)
          }));
          setScammers(convertedScammers);
          setIsLoading(false);
          return;
        }
        
        // Direct Supabase queries if service methods fail
        try {
          // Try by wallet address first
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
        
        console.log("Profile not found in any data source");
        setError("Profile not found");
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
