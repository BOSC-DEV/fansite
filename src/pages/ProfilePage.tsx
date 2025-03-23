
import React, { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { UserProfile } from "@/components/profile/UserProfile";
import { useWallet } from "@/context/WalletContext";
import { ProfileLinks } from "@/components/profile/ProfileLinks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { storageService, UserProfile as ProfileType } from "@/services/storage/supabaseService";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ProfilePage() {
  const { isConnected, address } = useWallet();
  const [profileData, setProfileData] = useState<ProfileType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabaseReady = isSupabaseConfigured();
  
  useEffect(() => {
    const fetchProfile = async () => {
      if (isConnected && address && supabaseReady) {
        setIsLoading(true);
        try {
          const profile = await storageService.getProfile(address);
          if (profile) {
            setProfileData(profile);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    fetchProfile();
  }, [isConnected, address, supabaseReady]);

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
            <Card className="p-4">
              <div className="animate-pulse flex items-center gap-4">
                <div className="rounded-full bg-western-sand h-20 w-20"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-western-sand rounded w-3/4"></div>
                  <div className="h-4 bg-western-sand rounded w-1/2"></div>
                </div>
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
                    <p className="text-sm text-muted-foreground truncate">
                      {address}
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
          ) : isConnected && !profileData && !isLoading ? (
            <Alert className="mb-8">
              <Info className="h-4 w-4" />
              <AlertTitle>No Profile Found</AlertTitle>
              <AlertDescription>
                You haven't created a profile yet. Fill out the form below to create your profile.
              </AlertDescription>
            </Alert>
          ) : null}
          
          {supabaseReady ? (
            <UserProfile />
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
