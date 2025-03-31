
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormData, useProfile } from "@/hooks/useProfile";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { ProfilePictureUpload } from "./ProfilePictureUpload";
import { ProfileDebugInfo } from "./ProfileDebugInfo";
import { toast } from "sonner";

export function ProfileEditor() {
  const navigate = useNavigate();
  const {
    profile,
    updateProfile,
    saveProfile,
    loading,
    saving,
    hasProfile,
    error,
    usernameAvailable,
    checkingUsername
  } = useProfile();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting profile form with data:", profile);
    
    // Add some visual feedback
    toast.loading("Saving profile...");
    
    try {
      const success = await saveProfile();
      
      if (success) {
        toast.dismiss();
        toast.success("Profile saved successfully");
        
        // Wait a moment to show the success message
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        toast.dismiss();
        toast.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.dismiss();
      toast.error("Error saving profile");
    }
  };
  
  // Handle input changes
  const handleChange = (field: keyof ProfileFormData, value: string) => {
    console.log(`Updating profile ${field} to:`, value);
    updateProfile(field, value);
  };
  
  if (loading) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-western-accent" />
            <span className="ml-3">Loading profile...</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="bg-western-parchment/5 border-b border-western-sand/10">
          <CardTitle className="text-xl font-semibold text-western-accent">
            {hasProfile ? "Update Your Profile" : "Create Your Profile"}
          </CardTitle>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent className="p-6 space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="flex justify-center">
              <ProfilePictureUpload
                displayName={profile.displayName}
                profilePicUrl={profile.profilePicUrl}
                onProfilePicChange={(url) => handleChange('profilePicUrl', url)}
                userId={profile.username || "user"}
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="displayName">Display Name</Label>
                <Input
                  id="displayName"
                  value={profile.displayName}
                  onChange={(e) => handleChange('displayName', e.target.value)}
                  placeholder="Your display name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => handleChange('username', e.target.value)}
                    placeholder="your_username"
                    className={!usernameAvailable && profile.username ? 'border-red-500' : ''}
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    {checkingUsername && 
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-western-sand border-t-transparent" />
                    }
                    {!checkingUsername && profile.username && (
                      usernameAvailable 
                        ? <div className="h-4 w-4 text-green-500">✓</div> 
                        : <div className="h-4 w-4 text-red-500">✗</div>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Your profile will be accessible at bookofscams.lol/{profile.username}
                </p>
                {!usernameAvailable && profile.username && (
                  <p className="text-xs text-red-500 mt-1">
                    Username unavailable or invalid. Use only letters, numbers, and underscores.
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleChange('bio', e.target.value)}
                  placeholder="Tell us about yourself"
                  className="h-32"
                />
              </div>
              
              <div>
                <Label htmlFor="xLink">X / Twitter Profile</Label>
                <Input
                  id="xLink"
                  value={profile.xLink}
                  onChange={(e) => handleChange('xLink', e.target.value)}
                  placeholder="https://x.com/username"
                />
              </div>
              
              <div>
                <Label htmlFor="websiteLink">Website</Label>
                <Input
                  id="websiteLink"
                  value={profile.websiteLink}
                  onChange={(e) => handleChange('websiteLink', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-end gap-3 px-6 py-4 border-t border-western-sand/10">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={saving || !usernameAvailable}
              className="min-w-24"
            >
              {saving 
                ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                : hasProfile ? "Update Profile" : "Create Profile"
              }
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      <ProfileDebugInfo />
    </>
  );
}
