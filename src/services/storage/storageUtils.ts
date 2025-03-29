
import { supabase } from '@/integrations/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';

/**
 * Helper function to check if a storage bucket exists and create a publicly accessible one if it doesn't
 */
export async function ensureBucketExists(bucketName: string): Promise<boolean> {
  try {
    // Check if the bucket exists
    const { data: existingBuckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error(`Error checking if bucket ${bucketName} exists:`, bucketError);
      return false;
    }
    
    // Check if our bucket is in the list
    const bucketExists = existingBuckets.some(bucket => bucket.name === bucketName);
    
    if (!bucketExists) {
      console.warn(`Bucket ${bucketName} not found. Using localStorage fallback.`);
      return false;
    } else {
      console.log(`Bucket ${bucketName} exists`);
      return true;
    }
  } catch (error) {
    console.error(`Unexpected error in ensureBucketExists for ${bucketName}:`, error);
    return false;
  }
}

/**
 * Fallback for when Supabase storage is not available - uses local storage
 */
export function storeImageLocally(file: File, userId: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const key = `profile_${userId}`;
        if (typeof reader.result === 'string') {
          localStorage.setItem(key, reader.result);
          console.log(`Image stored locally with key: ${key}`);
          resolve(reader.result);
        } else {
          reject(new Error('FileReader result is not a string'));
        }
      } catch (error) {
        console.error('Error storing image in localStorage:', error);
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Helper function to upload images to Supabase Storage
 */
export async function uploadImage(file: File, bucketName: string, fileName: string): Promise<string | null> {
  try {
    console.log(`Starting upload to ${bucketName} bucket with filename: ${fileName}`);
    
    // First ensure the bucket exists
    const bucketExists = await ensureBucketExists(bucketName);
    
    if (!bucketExists) {
      console.warn(`Bucket ${bucketName} does not exist. Trying localStorage fallback...`);
      
      // For profile images, we can use localStorage as fallback
      const localUrl = await storeImageLocally(file, fileName);
      toast.success('Image saved locally (offline mode)');
      return localUrl;
    }
    
    // Create a unique file path to avoid collisions
    const fileExt = file.name.split('.').pop();
    const uniqueFilePath = `${fileName.trim().replace(/\s+/g, '-')}-${uuidv4()}.${fileExt}`;
    
    // Upload the file to the specified bucket
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(uniqueFilePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) {
      console.error(`Error uploading to ${bucketName}:`, error);
      
      // Try localStorage fallback for profile images
      if (bucketName.includes('profile')) {
        try {
          console.log('Attempting localStorage fallback...');
          const localUrl = await storeImageLocally(file, fileName);
          toast.success('Image saved locally (offline mode)');
          return localUrl;
        } catch (localError) {
          console.error('LocalStorage fallback also failed:', localError);
          return null;
        }
      }
      
      return null;
    }
    
    if (!data || !data.path) {
      console.error(`Upload to ${bucketName} succeeded but no path returned`);
      toast.error('Error getting image URL');
      return null;
    }
    
    // Generate a public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);
    
    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.error(`Failed to get public URL for ${data.path}`);
      toast.error('Error getting public image URL');
      return null;
    }
    
    console.log(`Successfully uploaded to ${bucketName}, public URL:`, publicUrlData.publicUrl);
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error(`Unexpected error in uploadImage to ${bucketName}:`, error);
    toast.error('Unexpected error uploading image');
    
    // Try localStorage fallback for profile images
    if (bucketName.includes('profile')) {
      try {
        console.log('Attempting localStorage fallback after error...');
        const localUrl = await storeImageLocally(file, fileName);
        toast.success('Image saved locally (offline mode)');
        return localUrl;
      } catch (localError) {
        console.error('LocalStorage fallback also failed:', localError);
        return null;
      }
    }
    
    return null;
  }
}
