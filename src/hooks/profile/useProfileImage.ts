
import { useState } from "react";
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function useProfileImage() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const checkAuthentication = async () => {
    const { data: session } = await supabase.auth.getSession();
    return !!session?.session;
  };

  const uploadProfileImage = async (file: File, userId: string) => {
    if (!file || !userId) {
      toast.error("Unable to upload: Missing file or user ID");
      return null;
    }
    
    // Check if user is authenticated
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) {
      toast.error("Please sign in to upload profile images");
      return null;
    }
    
    setIsUploading(true);
    try {
      console.log("[useProfileImage] Uploading profile image for user:", userId);
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size exceeds 2MB limit");
        setIsUploading(false);
        return null;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Only image files are allowed");
        setIsUploading(false);
        return null;
      }
      
      const url = await storageService.uploadProfileImage(file, userId);
      if (url) {
        console.log("[useProfileImage] Image uploaded successfully:", url);
        setProfilePicUrl(url);
        toast.success("Profile picture uploaded successfully");
        return url;
      } else {
        toast.error("Failed to upload profile picture");
        setImageError(true);
        return null;
      }
    } catch (error) {
      console.error("[useProfileImage] Error uploading image:", error);
      toast.error("Error uploading profile picture");
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
