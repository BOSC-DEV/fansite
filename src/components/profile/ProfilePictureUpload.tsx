
import React, { useState, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { storageService } from "@/services/storage";
import { toast } from "sonner";

interface ProfilePictureUploadProps {
  displayName: string;
  profilePicUrl: string;
  onProfilePicChange: (url: string) => void;
  userId: string;
}

export function ProfilePictureUpload({
  displayName,
  profilePicUrl,
  onProfilePicChange,
  userId,
}: ProfilePictureUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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

    setIsUploading(true);
    try {
      console.log("[ProfilePictureUpload] Uploading image file:", file.name);
      
      if (!userId) {
        toast.error("User ID is required to upload a profile picture");
        return;
      }
      
      const url = await storageService.uploadProfileImage(file, userId);
      
      if (url) {
        console.log("[ProfilePictureUpload] Image uploaded successfully:", url);
        onProfilePicChange(url);
        toast.success("Profile picture uploaded successfully");
      } else {
        toast.error("Failed to upload profile picture");
      }
    } catch (error) {
      console.error("[ProfilePictureUpload] Error uploading profile picture:", error);
      toast.error("Error uploading profile picture");
    } finally {
      setIsUploading(false);
    }
  };

  const initials = displayName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col items-center space-y-4">
      <Label htmlFor="profilePic" className="text-center font-medium">
        Profile Picture
      </Label>
      <div className="relative">
        <Avatar className="w-24 h-24">
          <AvatarImage src={profilePicUrl} alt={displayName} />
          <AvatarFallback className="bg-western-sand text-lg">
            {initials || <UserCircle2 className="w-12 h-12 text-western-wood" />}
          </AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="outline"
          className="absolute bottom-0 right-0 rounded-full bg-background h-8 w-8"
          onClick={handleUploadClick}
          disabled={isUploading}
        >
          {isUploading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-western-sand border-t-transparent" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
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
      <p className="text-xs text-center text-muted-foreground max-w-[200px]">
        Upload a profile picture (max 2MB)
      </p>
    </div>
  );
}

export default ProfilePictureUpload;
