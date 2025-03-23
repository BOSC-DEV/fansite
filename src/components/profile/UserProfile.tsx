
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { BasicInfoForm } from "./BasicInfoForm";
import { SocialLinksForm } from "./SocialLinksForm";
import { useProfileForm } from "./useProfileForm";

export function UserProfile() {
  const navigate = useNavigate();
  const {
    formData,
    setDisplayName,
    setProfilePicUrl,
    setXLink,
    setWebsiteLink,
    handleBioChange,
    isSubmitting,
    hasProfile,
    saveProfile,
    address,
    isConnected,
  } = useProfileForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveProfile();
    if (success) {
      // Redirect to the previous page or home
      navigate(-1);
    }
  };

  if (!isConnected) {
    return (
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Connect Your Wallet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Please connect your wallet to create or update your profile.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{hasProfile ? "Update Your Profile" : "Create Your Profile"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfilePictureUpload
            displayName={formData.displayName}
            profilePicUrl={formData.profilePicUrl}
            onProfilePicChange={setProfilePicUrl}
          />
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="social">Social Links</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <BasicInfoForm
                displayName={formData.displayName}
                bio={formData.bio}
                bioCharCount={formData.bioCharCount}
                walletAddress={address}
                onDisplayNameChange={setDisplayName}
                onBioChange={handleBioChange}
              />
            </TabsContent>
            
            <TabsContent value="social" className="space-y-4">
              <SocialLinksForm
                xLink={formData.xLink}
                websiteLink={formData.websiteLink}
                onXLinkChange={setXLink}
                onWebsiteLinkChange={setWebsiteLink}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Create Profile"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default UserProfile;
