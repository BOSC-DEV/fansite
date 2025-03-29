
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
          return;
        }
        
        console.log("Fetching profile for:", username);
        
        // First try directly from Supabase
        try {
          // Try by username
          const { data: usernameProfile, error: usernameError } = await supabase
            .from('profiles')
            .select('*')
            .eq('username', username)
            .maybeSingle();
          
          if (usernameProfile) {
            console.log("Profile found by username in Supabase:", usernameProfile);
            
            // Get the scammers added by this user to calculate stats directly
            // This ensures we're using fresh stats directly from the database
            const { data: userScammers, error: scammersError } = await supabase
              .from('scammers')
              .select('*')
              .eq('added_by', usernameProfile.wallet_address)
              .is('deleted_at', null);
              
            if (scammersError) {
              console.error("Error fetching user's scammers:", scammersError);
            }
            
            // Calculate points using the same formula as in leaderboardService
            let points = usernameProfile.points || 0;
            
            // If points are 0 or not set, calculate them
            if (!points || points <= 1) {
              // If we have scammers data, use it to calculate points
              if (userScammers && userScammers.length > 0) {
                const totalReports = userScammers.length;
                const totalLikes = userScammers.reduce((sum, scammer) => sum + (scammer.likes || 0), 0);
                const totalViews = userScammers.reduce((sum, scammer) => sum + (scammer.views || 0), 0);
                const totalComments = userScammers.reduce((sum, scammer) => {
                  if (scammer.comments && Array.isArray(scammer.comments)) {
                    return sum + scammer.comments.length;
                  }
                  return sum;
                }, 0);
                const bountyGenerated = userScammers.reduce((sum, scammer) => sum + (scammer.bounty_amount || 0), 0);
                
                // Calculate points directly
                points = 0; // Start with base points
                points += totalReports * 100; // Each report is worth 100 points
                points += totalLikes * 15; // Each like is worth 15 points
                points += totalViews * 5; // Each view is worth 5 points
                points += totalComments * 10; // Each comment is worth 10 points
                points += bountyGenerated; // Add bounty generated
                points = Math.max(1, points); // Ensure minimum of 1 point
                
                console.log("Calculated points for user:", points, {
                  reports: totalReports,
                  likes: totalLikes,
                  views: totalViews,
                  comments: totalComments,
                  bounty: bountyGenerated
                });
                
                // Update the points in the database
                try {
                  const { error: updateError } = await supabase
                    .from('profiles')
                    .update({ points: Math.round(points) })
                    .eq('id', usernameProfile.id);
                    
                  if (updateError) {
                    console.error("Error updating points:", updateError);
                  }
                } catch (e) {
                  console.error("Error during points update:", e);
                }
              }
            }
            
            setProfile({
              id: usernameProfile.id,
              displayName: usernameProfile.display_name,
              username: usernameProfile.username || '',
              profilePicUrl: usernameProfile.profile_pic_url || '',
              walletAddress: usernameProfile.wallet_address,
              createdAt: usernameProfile.created_at,
              xLink: usernameProfile.x_link || '',
              websiteLink: usernameProfile.website_link || '',
              bio: usernameProfile.bio || '',
              points: Math.round(points)
            });
            
            // Convert ScammerListing to Scammer (with date conversion)
            if (userScammers) {
              const convertedScammers = userScammers.map(scammer => ({
                id: scammer.id,
                name: scammer.name,
                photoUrl: scammer.photo_url || '',
                accusedOf: scammer.accused_of || '',
                links: Array.isArray(scammer.links) ? scammer.links : [],
                aliases: Array.isArray(scammer.aliases) ? scammer.aliases : [],
                accomplices: Array.isArray(scammer.accomplices) ? scammer.accomplices : [],
                officialResponse: scammer.official_response || '',
                bountyAmount: scammer.bounty_amount || 0,
                walletAddress: scammer.wallet_address || '',
                dateAdded: new Date(scammer.date_added),
                addedBy: scammer.added_by || '',
                likes: scammer.likes || 0,
                dislikes: scammer.dislikes || 0,
                views: scammer.views || 0,
                shares: scammer.shares || 0
              }));
              setScammers(convertedScammers);
            }
            
            setIsLoading(false);
            return;
          }
          
          // Try by wallet address if username query returned nothing
          const { data: walletProfile, error: walletError } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', username)
            .maybeSingle();
          
          if (walletProfile) {
            console.log("Profile found by wallet address in Supabase:", walletProfile);
            
            // Get the scammers added by this user to calculate stats directly
            const { data: userScammers, error: scammersError } = await supabase
              .from('scammers')
              .select('*')
              .eq('added_by', walletProfile.wallet_address)
              .is('deleted_at', null);
              
            if (scammersError) {
              console.error("Error fetching user's scammers:", scammersError);
            }
            
            // Calculate points using the same formula as in leaderboardService
            let points = walletProfile.points || 0;
            
            // If points are 0 or not set, calculate them
            if (!points || points <= 1) {
              // If we have scammers data, use it to calculate points
              if (userScammers && userScammers.length > 0) {
                const totalReports = userScammers.length;
                const totalLikes = userScammers.reduce((sum, scammer) => sum + (scammer.likes || 0), 0);
                const totalViews = userScammers.reduce((sum, scammer) => sum + (scammer.views || 0), 0);
                const totalComments = userScammers.reduce((sum, scammer) => {
                  if (scammer.comments && Array.isArray(scammer.comments)) {
                    return sum + scammer.comments.length;
                  }
                  return sum;
                }, 0);
                const bountyGenerated = userScammers.reduce((sum, scammer) => sum + (scammer.bounty_amount || 0), 0);
                
                // Calculate points directly
                points = 0; // Start with base points
                points += totalReports * 100; // Each report is worth 100 points
                points += totalLikes * 15; // Each like is worth 15 points
                points += totalViews * 5; // Each view is worth 5 points
                points += totalComments * 10; // Each comment is worth 10 points
                points += bountyGenerated; // Add bounty generated
                points = Math.max(1, points); // Ensure minimum of 1 point
                
                console.log("Calculated points for user:", points, {
                  reports: totalReports,
                  likes: totalLikes,
                  views: totalViews,
                  comments: totalComments,
                  bounty: bountyGenerated
                });
                
                // Update the points in the database
                try {
                  const { error: updateError } = await supabase
                    .from('profiles')
                    .update({ points: Math.round(points) })
                    .eq('id', walletProfile.id);
                    
                  if (updateError) {
                    console.error("Error updating points:", updateError);
                  }
                } catch (e) {
                  console.error("Error during points update:", e);
                }
              }
            }
            
            setProfile({
              id: walletProfile.id,
              displayName: walletProfile.display_name,
              username: walletProfile.username || '',
              profilePicUrl: walletProfile.profile_pic_url || '',
              walletAddress: walletProfile.wallet_address,
              createdAt: walletProfile.created_at,
              xLink: walletProfile.x_link || '',
              websiteLink: walletProfile.website_link || '',
              bio: walletProfile.bio || '',
              points: Math.round(points)
            });
            
            // Convert ScammerListing to Scammer (with date conversion)
            if (userScammers) {
              const convertedScammers = userScammers.map(scammer => ({
                id: scammer.id,
                name: scammer.name,
                photoUrl: scammer.photo_url || '',
                accusedOf: scammer.accused_of || '',
                links: Array.isArray(scammer.links) ? scammer.links : [],
                aliases: Array.isArray(scammer.aliases) ? scammer.aliases : [],
                accomplices: Array.isArray(scammer.accomplices) ? scammer.accomplices : [],
                officialResponse: scammer.official_response || '',
                bountyAmount: scammer.bounty_amount || 0,
                walletAddress: scammer.wallet_address || '',
                dateAdded: new Date(scammer.date_added),
                addedBy: scammer.added_by || '',
                likes: scammer.likes || 0,
                dislikes: scammer.dislikes || 0,
                views: scammer.views || 0,
                shares: scammer.shares || 0
              }));
              setScammers(convertedScammers);
            }
            
            setIsLoading(false);
            return;
          }
        } catch (supabaseError) {
          console.error("Supabase query error:", supabaseError);
        }
        
        // Fallback to service methods if Supabase direct query fails
        // First try to get profile by username
        let profileData = await storageService.getProfileByUsername(username);
        
        // If not found by username, try by wallet address (for backward compatibility)
        if (!profileData) {
          console.log("Profile not found by username in service, trying by wallet address");
          profileData = await storageService.getProfile(username);
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
