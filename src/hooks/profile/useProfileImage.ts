
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "@/integrations/supabase/client";

export function useProfileImage() {
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const uploadProfileImage = async (file: File, userId: string) => {
    if (!file) {
      toast.error("No file selected");
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
      
      // Check if there's a previous image to delete
      if (profilePicUrl && profilePicUrl.includes('profile-images')) {
        try {
          // Extract the filename from the URL
          const prevFileName = profilePicUrl.split('/').pop();
          if (prevFileName) {
            console.log(`Attempting to remove previous image: ${prevFileName}`);
            await supabase.storage
              .from('profile-images')
              .remove([prevFileName]);
          }
        } catch (error) {
          console.error("Error removing previous image:", error);
          // Continue with upload even if delete fails
        }
      }
      
      // Create a unique filename using UUID
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId.replace(/[^a-zA-Z0-9]/g, '')}-${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log(`Uploading file ${filePath} to profile-images bucket`);
      
      // Upload directly using Supabase Storage
      const { data, error } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image");
        setImageError(true);
        return null;
      }
      
      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(data.path);
        
      const url = publicUrlData.publicUrl;
      console.log("Upload successful, URL:", url);
      
      setProfilePicUrl(url);
      toast.success("Profile picture uploaded successfully");
      return url;
    } catch (error) {
      console.error("Error in upload process:", error);
      toast.error("Failed to upload image");
      setImageError(true);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // For backward compatibility - check if there's a locally stored image
  const getLocalProfileImage = (userId: string): string | null => {
    return localStorage.getItem(`profile_${userId}`);
  };

  return {
    profilePicUrl,
    setProfilePicUrl,
    uploadProfileImage,
    getLocalProfileImage,
    isUploading,
    imageError,
    setImageError
  };
}
