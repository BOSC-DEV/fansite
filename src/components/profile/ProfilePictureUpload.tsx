
import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useProfileImage } from "@/hooks/profile/useProfileImage";

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
    getLocalProfileImage,
    isUploading
  } = useProfileImage();
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Check for locally stored image on mount
  useEffect(() => {
    if (!profilePicUrl && userId) {
      const localImage = getLocalProfileImage(userId);
      if (localImage) {
        onProfilePicChange(localImage);
      }
    }
  }, [userId, profilePicUrl, onProfilePicChange, getLocalProfileImage]);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Clear any previous input value so user can upload same file again if needed
      e.target.value = '';
      
      const url = await uploadProfileImage(file, userId || 'anonymous');
      if (url) {
        onProfilePicChange(url);
        setImageError(false);
      } else {
        setImageError(true);
      }
    } catch (error) {
      console.error("Error during upload:", error);
      toast.error("Failed to upload profile picture");
      setImageError(true);
    }
  };

  const handleImageError = () => {
    setImageError(true);
    console.error("Error loading profile image");
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
    </div>
  );
}

export default ProfilePictureUpload;
