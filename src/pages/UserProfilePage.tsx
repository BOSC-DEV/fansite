
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, ExternalLink, Twitter, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { storageService, UserProfile, ScammerListing } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { ScammerCard } from "@/components/ScammerCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export function UserProfilePage() {
  const { username } = useParams<{ username: string }>();
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
          
          // Try by wallet address if username query returned nothing
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
  
  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="container mx-auto px-4 pt-28 pb-12">
        {isLoading ? (
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-western-sand h-20 w-20"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-western-sand rounded w-1/4"></div>
                  <div className="h-4 bg-western-sand rounded w-1/2"></div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-western-sand/20 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        ) : profile ? (
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.profilePicUrl} alt={profile.displayName} />
                  <AvatarFallback className="bg-western-sand">
                    <UserCircle2 className="w-12 h-12 text-western-wood" />
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.displayName}</h1>
                    <p className="text-sm text-western-sand">@{profile.username}</p>
                  </div>
                  
                  {profile.bio && (
                    <p className="text-sm">{profile.bio}</p>
                  )}
                  
                  {/* Social Links */}
                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    {profile.xLink && (
                      <a href={profile.xLink} target="_blank" rel="noopener noreferrer" 
                         className="text-western-sand hover:text-western-accent transition-colors">
                        <Twitter size={20} />
                      </a>
                    )}
                    {profile.websiteLink && (
                      <a href={profile.websiteLink} target="_blank" rel="noopener noreferrer"
                         className="text-western-sand hover:text-western-accent transition-colors">
                        <Globe size={20} />
                      </a>
                    )}
                  </div>
                  
                  <div className="flex space-x-4 text-sm">
                    <div>
                      <span className="font-bold">{scammers.length}</span> scammer reports
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Scammer Reports Grid */}
            <div>
              <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Scammer Reports</h2>
              {scammers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {scammers.map(scammer => (
                    <ScammerCard key={scammer.id} scammer={scammer} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-western-sand mb-4">No scammer reports yet</p>
                  <Link to="/create-listing">
                    <Button variant="outline" className="border-western-wood text-western-accent hover:bg-western-sand/20">
                      Report a Scammer
                      <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default UserProfilePage;
