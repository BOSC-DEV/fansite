
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Upload an image to Supabase storage
 */
export const uploadImage = async (
  file: File,
  bucket: string,
  folder: string = ''
): Promise<string | null> => {
  try {
    if (!file) return null;
    
    console.log(`[storageUtils] Uploading image to bucket: ${bucket}, folder: ${folder || 'root'}`);
    
    // Generate a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder ? `${folder}/` : ''}${uuidv4()}.${fileExt}`;
    
    // Upload file
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });
      
    if (error) {
      console.error('[storageUtils] Error uploading file:', error);
      toast.error('Failed to upload image');
      return null;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data?.path || '');
    
    console.log('[storageUtils] File uploaded successfully, URL:', publicUrlData.publicUrl);
    return publicUrlData.publicUrl || null;
  } catch (err) {
    console.error('[storageUtils] Error in uploadImage:', err);
    toast.error('Failed to upload image');
    return null;
  }
};

/**
 * Delete an image from Supabase storage
 */
export const deleteImage = async (
  url: string,
  bucket: string
): Promise<boolean> => {
  try {
    if (!url) return false;
    
    // Extract the path from the URL
    const urlObj = new URL(url);
    const path = urlObj.pathname.split(`/storage/v1/object/public/${bucket}/`)[1];
    
    if (!path) {
      console.error('Invalid storage URL:', url);
      return false;
    }
    
    // Delete the file
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
      
    if (error) {
      console.error('Error deleting file:', error);
      return false;
    }
    
    return true;
  } catch (err) {
    console.error('Error in deleteImage:', err);
    return false;
  }
};

/**
 * Generate a placeholder image URL
 */
export const getPlaceholderImage = (text: string = 'Unknown'): string => {
  const encodedText = encodeURIComponent(text);
  return `https://ui-avatars.com/api/?name=${encodedText}&background=random&color=fff&size=128`;
};

/**
 * Check if Supabase storage bucket exists, create if not
 */
export const ensureBucketExists = async (bucketName: string, isPublic: boolean = true): Promise<boolean> => {
  try {
    // Check if bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('Error listing buckets:', listError);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      // Create bucket if it doesn't exist
      const { error } = await supabase.storage.createBucket(bucketName, {
        public: isPublic
      });
      
      if (error) {
        console.error(`Error creating ${bucketName} bucket:`, error);
        return false;
      }
      
      console.log(`Created ${bucketName} bucket successfully`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error ensuring ${bucketName} bucket exists:`, error);
    return false;
  }
};
