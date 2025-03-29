
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';
import { toast } from 'sonner';
import { profileService } from './profileService';
import { scammerService } from './scammer/scammerService';
import { leaderboardService } from './leaderboardService';
import { UserProfile } from './profileService';
import { ScammerListing } from './scammer/scammerTypes';
import { LeaderboardUser } from './leaderboardService';
import { uploadImage } from './storageUtils';

export class StorageService extends BaseSupabaseService {
  // Storage bucket names
  private readonly PROFILE_IMAGES_BUCKET = 'profile-images';
  private readonly MOST_WANTED_IMAGES_BUCKET = 'most-wanted-images';

  async uploadProfileImage(file: File, userId: string): Promise<string | null> {
    try {
      console.log('Uploading profile image for user:', userId);
      
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
      return null;
    }
  }

  // Method specifically for scammer images
  async uploadScammerImage(file: File, scammerId: string): Promise<string | null> {
    try {
      console.log('Uploading scammer image for scammer:', scammerId);
      
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
