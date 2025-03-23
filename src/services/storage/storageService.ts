
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';
import { toast } from 'sonner';

export class StorageService extends BaseSupabaseService {
  // Create a storage bucket for profile images if it doesn't exist
  async ensureProfileImagesBucketExists() {
    try {
      // Check if the bucket exists
      const { data: buckets, error: listError } = await this.supabase.storage.listBuckets();
      
      if (listError) {
        console.error('Error listing buckets:', listError);
        return false;
      }
      
      const bucketExists = buckets?.some(bucket => bucket.name === 'profile-images');
      
      if (!bucketExists) {
        // Create the bucket if it doesn't exist
        const { error } = await this.supabase.storage.createBucket('profile-images', {
          public: true, // Make the bucket publicly accessible
        });
        
        if (error) {
          console.error('Error creating profile-images bucket:', error);
          return false;
        }
        
        // Set bucket policy to public
        const { error: policyError } = await this.supabase.storage.from('profile-images').createSignedUrl('dummy.txt', 60);
        if (policyError && !policyError.message.includes('not found')) {
          console.error('Error setting bucket policy:', policyError);
        }
        
        return true;
      }
      
      return true;
    } catch (error) {
      console.error('Error ensuring profile-images bucket exists:', error);
      return false;
    }
  }

  async uploadProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      // Ensure bucket exists first
      await this.ensureProfileImagesBucketExists();
      
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload the file to the 'profile-images' bucket
      const { error: uploadError, data } = await this.supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Overwrite if the file already exists
        });
        
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        
        // If the error is due to the bucket not existing, try creating it and uploading again
        if (uploadError.message.includes('Bucket not found')) {
          const bucketCreated = await this.ensureProfileImagesBucketExists();
          if (bucketCreated) {
            return this.uploadProfileImage(file, userId); // Try again after creating bucket
          }
        }
        
        return null;
      }
      
      // Get the public URL for the uploaded file
      const { data: urlData } = this.supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);
        
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      return null;
    }
  }
}

// Initialize the storage service and ensure bucket exists
export const storageService = new StorageService();
