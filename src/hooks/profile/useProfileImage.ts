
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { safeSupabaseQuery } from "@/utils/supabaseHelpers";

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
      
      // Check authentication
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        toast.error("Authentication required to upload images");
        setImageError(true);
        return null;
      }
      
      console.log("Uploading profile image to Supabase storage");
      
      // Create a unique file path with timestamp and userId
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${Date.now()}.${fileExt}`;
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
      
      if (error) {
        console.error("Error uploading file to Supabase Storage:", error);
        setImageError(true);
        return null;
      }
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(data?.path || '');
        
      const url = urlData?.publicUrl;
      
      if (url) {
        console.log("Upload successful, URL:", url);
        setProfilePicUrl(url);
        return url;
      } else {
        console.error("Upload succeeded but couldn't get public URL");
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
