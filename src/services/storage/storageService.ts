
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';

export class StorageService extends BaseSupabaseService {
  // Create a storage bucket for profile images if it doesn't exist
  async ensureProfileImagesBucketExists() {
    try {
      // Check if the bucket exists
      const { data: buckets } = await this.supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'profile-images');
      
      if (!bucketExists) {
        // Create the bucket if it doesn't exist
        const { error } = await this.supabase.storage.createBucket('profile-images', {
          public: true, // Make the bucket publicly accessible
        });
        
        if (error) {
          console.error('Error creating profile-images bucket:', error);
        }
      }
    } catch (error) {
      console.error('Error ensuring profile-images bucket exists:', error);
    }
  }

  async uploadProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Upload the file to the 'profile-images' bucket
      const { error: uploadError } = await this.supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Overwrite if the file already exists
        });
        
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
      }
      
      // Get the public URL for the uploaded file
      const { data } = this.supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);
        
      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      return null;
    }
  }
}

// Initialize the storage service and ensure bucket exists
export const storageService = new StorageService();
storageService.ensureProfileImagesBucketExists();
