
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";
import { storageService } from "@/services/storage";

export function useProfileImage() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const uploadProfileImage = async (file: File, userId: string) => {
    if (!file) {
      return null;
    }
    
    setIsUploading(true);
    setImageError(false);
    
    try {
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size exceeds 2MB limit");
        setImageError(true);
        return null;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Only image files are allowed");
        setImageError(true);
        return null;
      }
      
      console.log("Uploading profile image to Supabase storage");
      
      // Direct upload to Supabase storage using the storage service
      const url = await storageService.uploadProfileImage(file, userId);
      
      if (url) {
        console.log("Upload successful, URL:", url);
        setProfilePicUrl(url);
        return url;
      } else {
        console.error("Upload failed with no error");
        setImageError(true);
        return null;
      }
    } catch (error) {
      console.error("Error in upload process:", error);
      setImageError(true);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    profilePicUrl,
    setProfilePicUrl,
    uploadProfileImage,
    isUploading,
    imageError,
    setImageError
  };
}
