
import { useState, useEffect } from "react";
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useWallet } from "@/context/WalletContext";

export function useProfileImage() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { isConnected } = useWallet();
  
  // Check if user is authenticated with Supabase
  const checkAuthentication = async () => {
    try {
      const { data: session } = await supabase.auth.getSession();
      return !!session?.session;
    } catch (error) {
      console.error("[useProfileImage] Authentication check failed:", error);
      return false;
    }
  };

  const uploadProfileImage = async (file: File, userId: string) => {
    if (!file || !userId) {
      toast.error("Unable to upload: Missing file or user ID");
      return null;
    }
    
    if (!isConnected) {
      toast.error("Please connect your wallet to upload a profile image");
      return null;
    }
    
    // Check if user is authenticated
    const isAuthenticated = await checkAuthentication();
    
    setIsUploading(true);
    setImageError(false);
    
    try {
      console.log("[useProfileImage] Uploading profile image for user:", userId);
      
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
      
      // If we need authentication but user is not authenticated
      if (!isAuthenticated) {
        console.log("[useProfileImage] User not authenticated, using wallet-only flow");
        // We'll still try to upload but warn the user
        toast.warning("Uploading with wallet signature only - some features may be limited");
      }
      
      const url = await storageService.uploadProfileImage(file, userId);
      
      if (url) {
        console.log("[useProfileImage] Image uploaded successfully:", url);
        setProfilePicUrl(url);
        toast.success("Profile picture uploaded successfully");
        return url;
      } else {
        console.error("[useProfileImage] Upload failed, no URL returned");
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
