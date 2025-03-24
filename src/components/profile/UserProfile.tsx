
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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

  // Track if the form has been edited to prevent automatic data refreshing
  const [isFormEdited, setIsFormEdited] = useState(false);

  // This effect prevents losing user input when navigating
  useEffect(() => {}, [address]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile form submitted");
    const success = await saveProfile();
    if (success) {
      console.log("Profile saved successfully, navigating back");
      setIsFormEdited(false); // Reset edit state after successful save
      navigate(-1);
    }
  };

  const handleDisplayNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormEdited(true);
    setDisplayName(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormEdited(true);
    setUsername(e.target.value);
  };

  const handleXLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormEdited(true);
    setXLink(e.target.value);
  };

  const handleWebsiteLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFormEdited(true);
    setWebsiteLink(e.target.value);
  };

  const handleBioChangeWithEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsFormEdited(true);
    handleBioChange(e);
  };

  const handleProfilePicChange = (url: string) => {
    setIsFormEdited(true);
    setProfilePicUrl(url);
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
            onProfilePicChange={handleProfilePicChange}
            userId={address || ""}
          />
          
          <div className="space-y-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input id="displayName" placeholder="Your Name" value={formData.displayName} onChange={handleDisplayNameChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input 
                    id="username" 
                    placeholder="your_username" 
                    value={formData.username} 
                    onChange={handleUsernameChange} 
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

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <textarea 
                  id="bio" 
                  placeholder="Short bio about yourself (142 chars max)" 
                  value={formData.bio} 
                  onChange={handleBioChangeWithEdit} 
                  maxLength={142} 
                  className="resize-none w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]" 
                />
                <p className="text-xs text-muted-foreground flex justify-between">
                  <span>Brief description about yourself</span>
                  <span className={formData.bioCharCount > 120 ? "text-amber-500" : ""}>
                    {formData.bioCharCount}/142
                  </span>
                </p>
              </div>

              {/* Social Links */}
              <div className="space-y-2 pt-2 border-t">
                <Label htmlFor="xLink">X / Twitter</Label>
                <Input id="xLink" placeholder="https://x.com/username" value={formData.xLink} onChange={handleXLinkChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteLink">Website</Label>
                <Input id="websiteLink" placeholder="https://example.com" value={formData.websiteLink} onChange={handleWebsiteLinkChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="walletAddress">Wallet Address</Label>
                <Input id="walletAddress" value={address || ""} disabled className="bg-muted" />
                <p className="text-xs text-muted-foreground">Your connected wallet address (public)</p>
              </div>
            </div>
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
  
  function handleDisplayNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsFormEdited(true);
    setDisplayName(e.target.value);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsFormEdited(true);
    setUsername(e.target.value);
  }

  function handleXLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsFormEdited(true);
    setXLink(e.target.value);
  }

  function handleWebsiteLinkChange(e: React.ChangeEvent<HTMLInputElement>) {
    setIsFormEdited(true);
    setWebsiteLink(e.target.value);
  }

  function handleBioChangeWithEdit(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setIsFormEdited(true);
    handleBioChange(e);
  }

  function handleProfilePicChange(url: string) {
    setIsFormEdited(true);
    setProfilePicUrl(url);
  }
}

export default UserProfile;
