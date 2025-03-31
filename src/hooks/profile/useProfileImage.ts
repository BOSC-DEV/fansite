
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

export function useProfileImage() {
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileImage = async (file: File, userId: string): Promise<string | null> => {
    if (!file) return null;
    
    // Validate file size
    if (file.size > 1024 * 1024) {
      toast.error("Image size must be less than 1MB");
      return null;
    }
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Only image files are allowed");
      return null;
    }
    
    setIsUploading(true);
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${uuidv4()}.${fileExt}`;
      
      // Check if 'profile_images' bucket exists, create if it doesn't
      const { data: buckets } = await supabase
        .storage
        .listBuckets();
        
      const profileBucket = buckets?.find(b => b.name === 'profile_images');
      
      if (!profileBucket) {
        // Try to create the bucket
        try {
          const { error: bucketError } = await supabase
            .storage
            .createBucket('profile_images', {
              public: true,
              fileSizeLimit: 1024 * 1024, // 1MB
            });
            
          if (bucketError) {
            console.error("Error creating bucket:", bucketError);
            throw new Error("Failed to create storage bucket");
          }
        } catch (err) {
          console.error("Error creating bucket:", err);
          // Continue anyway, maybe user has permission to upload to non-existent buckets
        }
      }
      
      // Upload the file
      const { error: uploadError } = await supabase
        .storage
        .from('profile_images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        });
        
      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        throw new Error("Failed to upload image");
      }
      
      // Get the public URL
      const { data } = supabase
        .storage
        .from('profile_images')
        .getPublicUrl(fileName);
        
      console.log("Uploaded file, public URL:", data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error("Error in uploadProfileImage:", error);
      toast.error("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadProfileImage,
    isUploading
  };
}
