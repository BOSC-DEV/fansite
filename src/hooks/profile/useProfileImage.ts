
import { useState } from "react";
import { storageService } from "@/services/storage";

export function useProfileImage() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileImage = async (file: File, userId: string) => {
    if (!file || !userId) return;
    
    setIsUploading(true);
    try {
      console.log("[useProfileImage] Uploading profile image for user:", userId);
      const url = await storageService.uploadProfileImage(file, userId);
      if (url) {
        console.log("[useProfileImage] Image uploaded successfully:", url);
        setProfilePicUrl(url);
        return url;
      }
    } catch (error) {
      console.error("[useProfileImage] Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
    return null;
  };

  return {
    profilePicUrl,
    setProfilePicUrl,
    uploadProfileImage,
    isUploading
  };
}
