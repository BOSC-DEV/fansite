
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { UserProfile } from "@/components/profile/UserProfile";
import { useWallet } from "@/context/WalletContext";
import { ProfileLinks } from "@/components/profile/ProfileLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { storageService, UserProfile as ProfileType } from "@/services/storage";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const { isConnected, address } = useWallet();
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previousAddress, setPreviousAddress] = useState<string | null>(null);
  const supabaseReady = isSupabaseConfigured();
  
  useEffect(() => {
    // Reset profile data if wallet address changes
    if (previousAddress && address !== previousAddress) {
      console.log("[ProfilePage] Wallet address changed from", previousAddress, "to", address, "- clearing profile data");
      setProfileData(null);
    }
    
    // Update previous address for next comparison
    if (address !== previousAddress) {
      setPreviousAddress(address);
    }

    const fetchProfile = async () => {
      if (isConnected && address && supabaseReady) {
        setIsLoading(true);
        try {
          console.log("[ProfilePage] Fetching profile for address:", address);
          const profile = await storageService.getProfile(address);
          
          if (profile) {
            console.log("[ProfilePage] Profile found:", profile);
            setProfileData(profile);
          } else {
            console.log("[ProfilePage] No profile found for address:", address);
            setProfileData(null);
          }
        } catch (error) {
          console.error("[ProfilePage] Error fetching profile:", error);
          setProfileData(null);
        } finally {
          setIsLoading(false);
        }
      } else {
        setProfileData(null);
      }
    };
    
    fetchProfile();
  }, [isConnected, address, supabaseReady]);

  // DEBUG: Show all profiles in Supabase
  useEffect(() => {
    const debugFetchAllProfiles = async () => {
      if (supabaseReady) {
        try {
          const allProfiles = await storageService.getAllProfiles();
          console.log("[DEBUG] All profiles in Supabase:", allProfiles);
        } catch (error) {
          console.error("[DEBUG] Error fetching all profiles:", error);
        }
      }
    };
    
    debugFetchAllProfiles();
  }, [supabaseReady]);

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="container mx-auto px-4 py-8 pt-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-wanted text-western-accent text-center mb-8">Your Profile</h1>
          
          {!supabaseReady && (
            <Alert variant="destructive" className="mb-8">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Configuration Error</AlertTitle>
              <AlertDescription>
                Supabase is not configured properly. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY 
                to your .env file. See .env.example for details.
              </AlertDescription>
            </Alert>
          )}
          
          {isLoading ? (
            <Card className="p-4 mb-8">
              <div className="flex items-center justify-center gap-4">
                <Loader2 className="h-5 w-5 animate-spin text-western-accent" />
                <div>Loading profile data...</div>
              </div>
            </Card>
          ) : isConnected && profileData ? (
            <div className="mb-8">
              <Card className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profileData.profilePicUrl} alt={profileData.displayName} />
                    <AvatarFallback className="bg-western-sand">
                      <UserCircle2 className="w-10 h-10 text-western-wood" />
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{profileData.displayName}</h2>
                    <p className="text-sm text-muted-foreground">
                      @{profileData.username || "unnamed"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate mt-1">
                      {profileData.walletAddress}
                    </p>
                    {profileData.bio && (
                      <p className="text-sm mt-2 text-muted-foreground">
                        {profileData.bio}
                      </p>
                    )}
                    <ProfileLinks 
                      xLink={profileData.xLink} 
                      websiteLink={profileData.websiteLink} 
                    />
                  </div>
                </div>
              </Card>
            </div>
          ) : null}
          
          {supabaseReady ? (
            <UserProfile key={address} /> 
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Profile Management Unavailable</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Profile management is unavailable until Supabase is properly configured.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

export default ProfilePage;
