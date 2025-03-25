
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BasicInfoForm } from "./BasicInfoForm";
import { SocialLinksForm } from "./SocialLinksForm";

export function UserProfile() {
  const navigate = useNavigate();
  const {
    formData,
    setDisplayName,
    setUsername,
    setProfilePicUrl,
    setXLink,
    setWebsiteLink,
    handleBioChange,
    isSubmitting,
    hasProfile,
    saveProfile,
    address,
    isConnected,
    profileId,
    usernameAvailable,
    checkingUsername
  } = useProfileForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile form submitted with data:", formData);
    const success = await saveProfile();
    if (success) {
      console.log("Profile saved successfully, navigating back");
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
          {address && (
            <p className="text-sm text-muted-foreground">
              Wallet: {address}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          <ProfilePictureUpload 
            displayName={formData.displayName} 
            profilePicUrl={formData.profilePicUrl} 
            onProfilePicChange={setProfilePicUrl}
            userId={address || ""}
          />
          
          <div className="space-y-4">
            {/* Username Field */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <Input 
                  id="username" 
                  placeholder="your_username" 
                  value={formData.username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  className={`${!usernameAvailable && formData.username ? 'border-red-500' : ''}`}
                  required 
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  {checkingUsername && <div className="h-4 w-4 animate-spin rounded-full border-2 border-western-sand border-t-transparent" />}
                  {!checkingUsername && formData.username && (
                    usernameAvailable 
                      ? <div className="h-4 w-4 text-green-500">✓</div> 
                      : <div className="h-4 w-4 text-red-500">✗</div>
                  )}
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Your profile will be accessible at bookofscams.lol/{formData.username}
              </p>
              {!usernameAvailable && formData.username && (
                <p className="text-xs text-red-500 mt-1">
                  Username unavailable or invalid. Use only letters, numbers, and underscores.
                </p>
              )}
            </div>

            {/* Use BasicInfoForm component */}
            <BasicInfoForm
              displayName={formData.displayName}
              bio={formData.bio}
              bioCharCount={formData.bioCharCount}
              walletAddress={address}
              onDisplayNameChange={setDisplayName}
              onBioChange={handleBioChange}
            />

            {/* Use SocialLinksForm component */}
            <SocialLinksForm
              xLink={formData.xLink}
              websiteLink={formData.websiteLink}
              onXLinkChange={setXLink}
              onWebsiteLinkChange={setWebsiteLink}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || !usernameAvailable}>
            {isSubmitting ? "Saving..." : hasProfile ? "Update Profile" : "Create Profile"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

export default UserProfile;
