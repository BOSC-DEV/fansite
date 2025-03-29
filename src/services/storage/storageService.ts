
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';
import { toast } from 'sonner';
import { profileService } from './profileService';
import { scammerService } from './scammer/scammerService';
import { leaderboardService } from './leaderboardService';
import { UserProfile } from './profileService';
import { ScammerListing } from './scammer/scammerTypes';
import { LeaderboardUser } from './leaderboardService';
import { uploadImage, ensureBucketExists, storeImageLocally } from './storageUtils';

export class StorageService extends BaseSupabaseService {
  // Storage bucket names
  private readonly PROFILE_IMAGES_BUCKET = 'profile-images';
  private readonly MOST_WANTED_IMAGES_BUCKET = 'most-wanted-images';

  async uploadProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      console.log('Uploading profile image for user:', userId);
      
      // Validate inputs
      if (!file) {
        console.error('No file provided for upload');
        toast.error('No file selected for upload');
        return null;
      }
      
      if (!userId) {
        console.error('No user ID provided for upload');
        toast.error('User ID required for upload');
        return null;
      }
      
      // Check authentication (but continue with fallbacks if not authenticated)
      const isAuthenticated = await this.checkAuthentication();
      if (!isAuthenticated) {
        console.warn('User not authenticated for profile upload, will try fallbacks');
      }
      
      // Check if the bucket exists before attempting upload
      const bucketExists = await ensureBucketExists(this.PROFILE_IMAGES_BUCKET);
      
      if (!bucketExists) {
        console.warn('Profile images bucket does not exist, using local storage fallback');
        try {
          // Fall back to localStorage
          const dataUrl = await storeImageLocally(file, userId);
          return dataUrl;
        } catch (localError) {
          console.error('Error storing image locally:', localError);
          toast.error('Failed to save image');
          return null;
        }
      }
      
      // Use the uploadImage utility with profile images bucket
      const imageUrl = await uploadImage(file, this.PROFILE_IMAGES_BUCKET, userId);
      
      if (!imageUrl) {
        console.error('Error uploading profile image');
        return null;
      }
      
      console.log('Image uploaded successfully, public URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error in uploadProfileImage:', error);
      toast.error('Failed to upload profile image');
      
      // Try local storage as last resort
      try {
        console.log('Attempting localStorage as last resort...');
        const dataUrl = await storeImageLocally(file, userId);
        return dataUrl;
      } catch (localError) {
        console.error('Error storing image locally:', localError);
        return null;
      }
    }
  }
  
  // Helper method to check authentication
  private async checkAuthentication(): Promise<boolean> {
    try {
      const { data } = await this.supabase.auth.getSession();
      return !!data.session;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  }

  // Method specifically for scammer images
  async uploadScammerImage(file: File, scammerId: string): Promise<string | null> {
    try {
      console.log('Uploading scammer image for scammer:', scammerId);
      
      if (!file || !scammerId) {
        toast.error('Missing file or scammer ID for upload');
        return null;
      }
      
      // Check authentication (required for scammer uploads)
      const isAuthenticated = await this.checkAuthentication();
      if (!isAuthenticated) {
        toast.error('Authentication required to upload scammer images');
        return null;
      }
      
      // Use the uploadImage utility with most wanted images bucket
      const imageUrl = await uploadImage(file, this.MOST_WANTED_IMAGES_BUCKET, `scammer-${scammerId}`);
      
      if (!imageUrl) {
        console.error('Error uploading scammer image');
        return null;
      }
      
      console.log('Scammer image uploaded successfully, public URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('Error in uploadScammerImage:', error);
      toast.error('Failed to upload scammer image');
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
  
  // Add updateProfile method to match the one in profileService
  async updateProfile(profile: UserProfile): Promise<boolean> {
    return profileService.updateProfile(profile);
  }

  async hasProfile(walletAddress: string): Promise<boolean> {
    return profileService.hasProfile(walletAddress);
  }

  async getAllProfiles(): Promise<UserProfile[]> {
    return profileService.getAllProfiles();
  }

  // Forward scammer methods with the correct return types
  async saveScammer(scammer: ScammerListing): Promise<boolean> {
    return scammerService.saveScammer(scammer);
  }

  async getScammer(scammerId: string): Promise<ScammerListing | null> {
    return scammerService.getScammer(scammerId);
  }

  async getAllScammers(): Promise<ScammerListing[]> {
    return scammerService.getAllScammers();
  }

  // Old method (kept for backward compatibility)
  async deleteScammer(scammerId: string): Promise<boolean> {
    console.warn("Using permanent delete - consider using softDeleteScammer instead");
    return scammerService.deleteScammer(scammerId);
  }

  // New soft delete method (archives rather than permanently deletes)
  async softDeleteScammer(scammerId: string): Promise<boolean> {
    return scammerService.softDeleteScammer(scammerId);
  }

  // New method to restore deleted scammers
  async restoreScammer(scammerId: string): Promise<boolean> {
    return scammerService.restoreScammer(scammerId);
  }

  // New method to get all deleted scammers
  async getDeletedScammers(): Promise<ScammerListing[]> {
    return scammerService.getDeletedScammers();
  }

  async incrementScammerViews(scammerId: string): Promise<boolean> {
    try {
      await scammerService.incrementScammerViews(scammerId);
      return true;
    } catch (error) {
      console.error("Error incrementing scammer views:", error);
      return false;
    }
  }
  
  async incrementScammerShares(scammerId: string): Promise<boolean> {
    try {
      await scammerService.incrementScammerShares(scammerId);
      return true;
    } catch (error) {
      console.error("Error incrementing scammer shares:", error);
      return false;
    }
  }

  async likeScammer(scammerId: string): Promise<boolean> {
    try {
      await scammerService.likeScammer(scammerId);
      return true;
    } catch (error) {
      console.error("Error liking scammer:", error);
      return false;
    }
  }

  async dislikeScammer(scammerId: string): Promise<boolean> {
    try {
      await scammerService.dislikeScammer(scammerId);
      return true;
    } catch (error) {
      console.error("Error disliking scammer:", error);
      return false;
    }
  }

  async updateScammerStats(scammerId: string, stats: { likes?: number; dislikes?: number; views?: number; shares?: number }): Promise<boolean> {
    return scammerService.updateScammerStats(scammerId, stats);
  }
  
  // Forward leaderboard methods
  async getLeaderboardUsers(): Promise<LeaderboardUser[]> {
    return leaderboardService.getLeaderboardUsers();
  }
}

// Initialize the storage service
export const storageService = new StorageService();
