
import React, { useState, useRef } from "react";
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
  displayName = "",  // Provide default empty string
  profilePicUrl,
  onProfilePicChange,
  userId
}: ProfilePictureUploadProps) {
  const {
    uploadProfileImage,
    isUploading
  } = useProfileImage();
  const [imageError, setImageError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
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

    const url = await uploadProfileImage(file, userId);
    if (url) {
      console.log("[ProfilePictureUpload] Upload successful, updating profile with URL:", url);
      onProfilePicChange(url);
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage 
            src={imageError ? fallbackUrl : profilePicUrl} 
            alt={displayName || "User"}
            onError={handleImageError}
          />
          <AvatarFallback className="bg-western-sand text-lg">
            {initials || <UserCircle2 className="w-12 h-12 text-western-wood" />}
          </AvatarFallback>
        </Avatar>
        <Button
          type="button" // Explicitly set type to button
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
      <p className="text-xs text-center text-muted-foreground max-w-[200px]">(max 1mb)</p>
    </div>
  );
}

export default ProfilePictureUpload;
