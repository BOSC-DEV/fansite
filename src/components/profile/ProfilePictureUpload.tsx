
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProfileImage } from "@/hooks/profile/useProfileImage";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from "@/context/WalletContext";
import { validateAuth, establishAuth, ensureStorageBucketExists } from "@/utils/supabaseHelpers";

interface ProfilePictureUploadProps {
  displayName: string;
  profilePicUrl: string;
  onProfilePicChange: (url: string) => void;
  userId: string;
}

export function ProfilePictureUpload({
  displayName = "",
  profilePicUrl,
  onProfilePicChange,
  userId
}: ProfilePictureUploadProps) {
  const {
    uploadProfileImage,
    isUploading
  } = useProfileImage();
  const { connectWallet } = useWallet();
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Ensure storage bucket exists when component mounts
  useEffect(() => {
    ensureStorageBucketExists('profile-images').catch(error => {
      console.error("Error ensuring profile-images bucket exists:", error);
    });
  }, []);
  
  const handleUploadClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Check authentication before attempting upload
    const isAuthenticated = await establishAuth(connectWallet);
    
    if (!isAuthenticated) {
      toast.error("Authentication required to upload a profile picture");
      return;
    }
    
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Clear any previous input value so user can upload same file again if needed
      e.target.value = '';
      
      // Check authentication again before starting upload
      const isAuthenticated = await establishAuth(connectWallet);
      
      if (!isAuthenticated) {
        toast.error("Authentication required to upload a profile picture");
        return;
      }
      
      // Ensure bucket exists before uploading
      await ensureStorageBucketExists('profile-images');
      
      console.log("Uploading profile image:", file.name);
      const url = await uploadProfileImage(file, userId || 'anonymous');
      
      if (url) {
        console.log("Upload successful, new image URL:", url);
        onProfilePicChange(url);
        setImageError(false);
      } else {
        console.error("Upload failed, no URL returned");
        setImageError(true);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      setImageError(true);
    }
  };

  const handleImageError = () => {
    console.error("Error loading profile image from URL:", profilePicUrl);
    setImageError(true);
  };

  // Generate initials for avatar fallback
  const initials = displayName ? displayName.split(" ").map(name => name[0]).join("").toUpperCase() : "";

  // Fallback URL when image fails to load
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'User')}&background=random&size=200`;
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage 
            src={imageError ? fallbackUrl : (profilePicUrl || '')} 
            alt={displayName || "User"} 
            onError={handleImageError} 
          />
          <AvatarFallback className="bg-western-sand text-lg">
            {initials || <UserCircle2 className="w-12 h-12 text-western-wood" />}
          </AvatarFallback>
        </Avatar>
        <Button 
          type="button"
          size="icon" 
          variant="outline" 
          className="absolute bottom-0 right-0 rounded-full bg-background h-8 w-8" 
          onClick={handleUploadClick} 
          disabled={isUploading}
        >
          {isUploading ? 
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-western-sand border-t-transparent" /> : 
            <Upload className="h-4 w-4" />
          }
        </Button>
      </div>
      <input 
        ref={fileInputRef} 
        id="profilePic" 
        type="file" 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileChange} 
        disabled={isUploading} 
      />
      <p className="text-xs text-center text-muted-foreground max-w-[200px]">(max 2MB)</p>
    </div>
  );
}

export default ProfilePictureUpload;
