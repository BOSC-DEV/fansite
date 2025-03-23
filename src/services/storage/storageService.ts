
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';
import { toast } from 'sonner';
import { profileService } from './profileService';
import { scammerService } from './scammerService';
import { leaderboardService } from './leaderboardService';
import { UserProfile } from './profileService';
import { ScammerListing } from './scammerService';
import { LeaderboardUser } from './leaderboardService';

export class StorageService extends BaseSupabaseService {
  // Create a storage bucket for profile images if it doesn't exist
  async ensureProfileImagesBucketExists() {
    try {
      // Try to list buckets first
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
          // We'll consider this a non-fatal error, just return false
          return false;
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
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      // Try to get a signed URL to check if the bucket exists and is accessible
      const { data: urlData, error: urlError } = await this.supabase.storage
        .from('profile-images')
        .createSignedUrl(filePath, 60);
      
      if (urlError && !urlError.message.includes('not found')) {
        // The bucket exists but we can't access it
        console.error("Error testing bucket access:", urlError);
      }
      
      // Upload the file to the 'profile-images' bucket
      const { error: uploadError, data } = await this.supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Overwrite if the file already exists
        });
        
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        
        // If the error is due to permissions or bucket not existing, we'll use a placeholder
        if (uploadError.message.includes('Bucket not found') || 
            uploadError.message.includes('row-level security policy')) {
          // Return a placeholder image URL instead
          return `https://ui-avatars.com/api/?name=${encodeURIComponent(userId)}&background=random`;
        }
        
        return null;
      }
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = this.supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);
        
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      return null;
    }
  }

  // Forward profile methods
  async getProfile(walletAddress: string): Promise<UserProfile | null> {
    return profileService.getProfile(walletAddress);
  }

  async getProfileByUsername(username: string): Promise<UserProfile | null> {
    return profileService.getProfileByUsername(username);
  }

  async isUsernameAvailable(username: string, currentUserWallet?: string): Promise<boolean> {
    return profileService.isUsernameAvailable(username, currentUserWallet);
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    return profileService.saveProfile(profile);
  }

  async hasProfile(walletAddress: string): Promise<boolean> {
    return profileService.hasProfile(walletAddress);
  }

  async getAllProfiles(): Promise<UserProfile[]> {
    return profileService.getAllProfiles();
  }

  // Forward scammer methods
  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    return scammerService.saveScammer(scammer);
  }

  async getScammer(scammerId: string): Promise<ScammerListing | null> {
    return scammerService.getScammer(scammerId);
  }

  async getAllScammers(): Promise<ScammerListing[]> {
    return scammerService.getAllScammers();
  }

  async incrementScammerViews(scammerId: string): Promise<void> {
    return scammerService.incrementScammerViews(scammerId);
  }

  async likeScammer(scammerId: string): Promise<void> {
    return scammerService.likeScammer(scammerId);
  }

  async dislikeScammer(scammerId: string): Promise<void> {
    return scammerService.dislikeScammer(scammerId);
  }

  async updateScammerStats(scammerId: string, stats: { likes?: number; dislikes?: number; views?: number }): Promise<boolean> {
    return scammerService.updateScammerStats(scammerId, stats);
  }
  
  // Forward leaderboard methods
  async getLeaderboardUsers(): Promise<LeaderboardUser[]> {
    return leaderboardService.getLeaderboardUsers();
  }
}

// Initialize the storage service and ensure bucket exists
export const storageService = new StorageService();
