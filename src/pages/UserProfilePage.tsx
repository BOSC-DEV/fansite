
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, ExternalLink, Twitter, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { storageService, UserProfile } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { ScammerCard } from "@/components/ScammerCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

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
        
        // Fetch profile by username
        const profileData = await storageService.getProfileByUsername(username);
        
        if (!profileData) {
          setError("Profile not found");
          return;
        }
        
        setProfile(profileData);
        
        // Fetch scammers added by this user
        const allScammers = await storageService.getAllScammers();
        const userScammers = allScammers.filter(
          scammer => scammer.addedBy === profileData.walletAddress
        );
        
        setScammers(userScammers);
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
