
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, Upload } from "lucide-react";

export function UserProfile() {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if user already has a profile
    if (isConnected && address) {
      const storedProfile = localStorage.getItem(`profile-${address}`);
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setDisplayName(profile.displayName);
        setProfilePicUrl(profile.profilePicUrl);
        setHasProfile(true);
      }
    }
  }, [isConnected, address]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        toast.error("File size should be less than 1MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setProfilePicUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim()) {
      toast.error("Please enter a display name");
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store profile in localStorage
      if (address) {
        const profile = {
          displayName,
          profilePicUrl,
          walletAddress: address,
          createdAt: new Date().toISOString()
        };
        
        localStorage.setItem(`profile-${address}`, JSON.stringify(profile));
        toast.success("Profile saved successfully");
        setHasProfile(true);
        
        // Redirect to the previous page or home
        navigate(-1);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
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
          <div className="flex flex-col items-center space-y-4 mb-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePicUrl} alt={displayName} />
              <AvatarFallback className="bg-western-sand">
                <UserCircle2 className="w-12 h-12 text-western-wood" />
              </AvatarFallback>
            </Avatar>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={triggerFileInput}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              Upload Picture
            </Button>
            
            <input 
              type="file" 
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            
            <p className="text-xs text-muted-foreground text-center">
              Max file size: 1MB<br />
              Supported formats: JPEG, PNG, GIF
            </p>
          </div>
          
          {profilePicUrl && (
            <div className="space-y-2">
              <Label htmlFor="profilePic">Profile Picture URL</Label>
              <Input
                id="profilePic"
                value={profilePicUrl}
                onChange={(e) => setProfilePicUrl(e.target.value)}
                disabled
              />
              <p className="text-xs text-muted-foreground">Your uploaded image or custom URL</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Your Name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="walletAddress">Wallet Address</Label>
            <Input
              id="walletAddress"
              value={address || ""}
              disabled
              className="bg-muted"
            />
            <p className="text-xs text-muted-foreground">Your connected wallet address (public)</p>
          </div>
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
