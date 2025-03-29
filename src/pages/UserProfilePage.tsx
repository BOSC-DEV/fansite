
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserProfile } from "@/hooks/useUserProfile";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileSkeleton } from "@/components/profile/ProfileSkeleton";
import { ProfileError } from "@/components/profile/ProfileError";
import { ReportsTab } from "@/components/profile/tabs/ReportsTab";
import { InfoTab } from "@/components/profile/tabs/InfoTab";
import { LikesTab } from "@/components/profile/tabs/LikesTab";
import { CommentsTab } from "@/components/profile/tabs/CommentsTab";
import { BountiesTab } from "@/components/profile/tabs/BountiesTab";
import { BookOpen, User, Heart, MessageSquare, Coins } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { WalletDisconnect } from "@/components/wallet/WalletDisconnect";

export function UserProfilePage() {
  const {
    username
  } = useParams<{
    username: string;
  }>();
  const {
    profile,
    scammers,
    isLoading,
    error
  } = useUserProfile(username);
  const [activeTab, setActiveTab] = useState("reports");
  const { address } = useWallet();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Check if this is the current user's profile
  const isCurrentUserProfile = profile?.walletAddress && address && 
    profile.walletAddress.toLowerCase() === address.toLowerCase();
  
  return (
    <div className="min-h-screen old-paper flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-4 flex-grow mt-16 md:mt-24">
        {isLoading ? <ProfileSkeleton /> : error ? <ProfileError error={error} /> : profile ? (
          <div className="max-w-4xl mx-auto">
            <ProfileHeader 
              username={profile.username || ''} 
              name={profile.displayName} 
              bio={profile.bio} 
              avatarUrl={profile.profilePicUrl} 
              location={''} 
              website={profile.websiteLink} 
              joinDate={profile.createdAt ? new Date(profile.createdAt) : undefined} 
              isCurrentUser={isCurrentUserProfile} 
              address={profile.walletAddress} 
              points={profile.points} 
            />
            
            {/* Show wallet disconnect button if this is the current user's profile */}
            {isCurrentUserProfile && (
              <div className="mt-4">
                <WalletDisconnect />
              </div>
            )}
            
            {/* Tabs Section - Aligned with content above */}
            <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-8">
              <TabsList className="grid grid-cols-5 w-full max-w-none ml-0 bg-western-parchment/10 mt-6 border-b border-western-wood/20">
                <TabsTrigger value="reports" className="flex items-center gap-2 font-western text-western-wood">
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Reports</span>
                </TabsTrigger>
                <TabsTrigger value="bounties" className="flex items-center gap-2 font-western text-western-wood">
                  <Coins className="h-4 w-4" />
                  <span className="hidden sm:inline">Bounties</span>
                </TabsTrigger>
                <TabsTrigger value="info" className="flex items-center gap-2 font-western text-western-wood">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">Info</span>
                </TabsTrigger>
                <TabsTrigger value="likes" className="flex items-center gap-2 font-western text-western-wood">
                  <Heart className="h-4 w-4" />
                  <span className="hidden sm:inline">Likes</span>
                </TabsTrigger>
                <TabsTrigger value="comments" className="flex items-center gap-2 font-western text-western-wood">
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Comments</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="reports" className="mt-6 px-0">
                <ReportsTab scammers={scammers} />
              </TabsContent>
              
              <TabsContent value="bounties" className="mt-6 px-0">
                <BountiesTab />
              </TabsContent>
              
              <TabsContent value="info" className="mt-6 px-0">
                <InfoTab profile={profile} />
              </TabsContent>
              
              <TabsContent value="likes" className="mt-6 px-0">
                <LikesTab address={profile.walletAddress} />
              </TabsContent>
              
              <TabsContent value="comments" className="mt-6 px-0">
                <CommentsTab />
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default UserProfilePage;
