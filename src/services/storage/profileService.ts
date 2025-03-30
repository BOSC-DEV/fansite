
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

export interface UserProfile {
  id: string;
  walletAddress: string;
  displayName: string;
  username: string | null;
  profilePicUrl: string | null;
  bio: string | null;
  xLink: string | null;
  websiteLink: string | null;
  createdAt: string;
  points: number;
}

class ProfileService {
  // Check if a user has a profile
  async hasProfile(walletAddress: string): Promise<boolean> {
    try {
      console.log(`Checking if user with wallet ${walletAddress} has a profile`);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id')
        .eq('wallet_address', walletAddress)
        .maybeSingle();
        
      if (error) {
        console.error("Error checking profile existence:", error);
        throw error;
      }
      
      return !!data;
    } catch (error) {
      console.error("Error in hasProfile method:", error);
      return false;
    }
  }

  // Get a user's profile by wallet address
  async getProfile(walletAddress: string): Promise<UserProfile | null> {
    try {
      console.log(`Getting profile for wallet: ${walletAddress}`);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .maybeSingle();
        
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      if (!data) {
        console.log(`No profile found for wallet: ${walletAddress}`);
        return null;
      }
      
      // Convert from database format to client format
      return {
        id: data.id,
        walletAddress: data.wallet_address,
        displayName: data.display_name,
        username: data.username,
        profilePicUrl: data.profile_pic_url,
        bio: data.bio,
        xLink: data.x_link,
        websiteLink: data.website_link,
        createdAt: data.created_at,
        points: data.points || 0
      };
    } catch (error) {
      console.error("Error in getProfile method:", error);
      return null;
    }
  }

  // Create or update a profile
  async saveProfile(profile: Partial<UserProfile> & { walletAddress: string }): Promise<boolean> {
    try {
      console.log(`Saving profile for wallet: ${profile.walletAddress}`);
      
      // Check if profile exists
      const existingProfile = await this.getProfile(profile.walletAddress);
      
      // Call the upsert_profile stored procedure
      const { error } = await supabase.rpc('upsert_profile', {
        profile_id: existingProfile?.id || uuidv4(),
        profile_display_name: profile.displayName || 'Anonymous',
        profile_username: profile.username || null,
        profile_pic_url: profile.profilePicUrl || null,
        profile_wallet_address: profile.walletAddress,
        profile_created_at: existingProfile?.createdAt || new Date().toISOString(),
        profile_x_link: profile.xLink || null,
        profile_website_link: profile.websiteLink || null,
        profile_bio: profile.bio || null
      });
      
      if (error) {
        console.error("Error saving profile:", error);
        throw error;
      }
      
      console.log(`Profile saved successfully for wallet: ${profile.walletAddress}`);
      return true;
    } catch (error) {
      console.error("Error in saveProfile method:", error);
      return false;
    }
  }

  // Get a profile by username
  async getProfileByUsername(username: string): Promise<UserProfile | null> {
    try {
      console.log(`Getting profile by username: ${username}`);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .ilike('username', username)
        .maybeSingle();
        
      if (error) {
        console.error("Error fetching profile by username:", error);
        throw error;
      }
      
      if (!data) {
        console.log(`No profile found for username: ${username}`);
        return null;
      }
      
      // Convert from database format to client format
      return {
        id: data.id,
        walletAddress: data.wallet_address,
        displayName: data.display_name,
        username: data.username,
        profilePicUrl: data.profile_pic_url,
        bio: data.bio,
        xLink: data.x_link,
        websiteLink: data.website_link,
        createdAt: data.created_at,
        points: data.points || 0
      };
    } catch (error) {
      console.error("Error in getProfileByUsername method:", error);
      return null;
    }
  }
}

// Export a singleton instance
export const profileService = new ProfileService();
