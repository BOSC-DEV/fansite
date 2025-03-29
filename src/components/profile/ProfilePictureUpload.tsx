
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProfileImage } from "@/hooks/profile/useProfileImage";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/integrations/supabase/client";

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
  const { isConnected } = useWallet();
  const {
    uploadProfileImage,
    isUploading
  } = useProfileImage();
  const [imageError, setImageError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setIsAuthenticated(!!data.session);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    
    if (!isConnected) {
      toast.error("Please connect your wallet before uploading a profile picture");
      return;
    }
    
    if (isAuthenticated === false) {
      toast.warning("You're not fully authenticated. Profile image may not be saved permanently.");
    }
    
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault(); // Prevent form submission
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("[ProfilePictureUpload] Starting upload for file:", file.name);
    
    if (!userId) {
      toast.error("User ID is required to upload a profile picture");
      return;
    }

    if (!isConnected) {
      toast.error("Please connect your wallet before uploading a profile picture");
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size exceeds 2MB limit");
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      // Clear any previous input value so user can upload same file again if needed
      e.target.value = '';
      
      const url = await uploadProfileImage(file, userId);
      if (url) {
        console.log("[ProfilePictureUpload] Upload successful, updating profile with URL:", url);
        onProfilePicChange(url);
        setImageError(false);
      } else {
        console.error("[ProfilePictureUpload] Upload failed, no URL returned");
        setImageError(true);
      }
    } catch (error) {
      console.error("[ProfilePictureUpload] Error during upload:", error);
      toast.error("Failed to upload profile picture");
      setImageError(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    console.error("[ProfilePictureUpload] Error loading profile image");
  };

  // Generate initials for avatar fallback
  const initials = displayName ? displayName.split(" ").map(name => name[0]).join("").toUpperCase() : "";

  // Fallback URL when image fails to load
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || 'User')}&background=random&size=200`;
  
  // Check if profilePicUrl is a local data URL (localStorage fallback)
  const isLocalImage = profilePicUrl && profilePicUrl.startsWith('data:image');
  const displayUrl = imageError ? fallbackUrl : (profilePicUrl || '');
  
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage 
            src={displayUrl} 
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
      {isLocalImage && <p className="text-xs text-amber-500">(Saved locally)</p>}
      <p className="text-xs text-center text-muted-foreground max-w-[200px]">(max 2MB)</p>
      {isAuthenticated === false && (
        <p className="text-xs text-amber-500 text-center max-w-[200px]">
          Sign in to enable permanent storage
        </p>
      )}
    </div>
  );
}

export default ProfilePictureUpload;
