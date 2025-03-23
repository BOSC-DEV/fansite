
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';

// Types for user profiles
export interface UserProfile {
  id?: string;
  displayName: string;
  username?: string;
  profilePicUrl: string;
  walletAddress: string;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  bio?: string;
}

export class ProfileService extends BaseSupabaseService {
  async getProfile(walletAddress: string): Promise<UserProfile | null> {
    console.log("getProfile service: looking up by wallet address:", walletAddress);
    
    // Use maybeSingle() instead of single() to avoid errors when no profile exists
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile by wallet address:', error);
      return null;
    }

    if (!data) {
      console.log("No profile found for wallet address:", walletAddress);
      return null;
    }

    console.log("Profile found by wallet address:", data);
    
    // Convert snake_case to camelCase for client-side usage
    return {
      id: data.id,
      displayName: data.display_name,
      username: data.username || '',
      profilePicUrl: data.profile_pic_url || '',
      walletAddress: data.wallet_address,
      createdAt: data.created_at,
      xLink: data.x_link || '',
      websiteLink: data.website_link || '',
      bio: data.bio || ''
    };
  }

  async getProfileByUsername(username: string): Promise<UserProfile | null> {
    console.log("getProfileByUsername service: looking up by username:", username);
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile by username:', error);
      return null;
    }

    if (!data) {
      console.log("No profile found for username:", username);
      return null;
    }

    console.log("Profile found by username:", data);

    return {
      id: data.id,
      displayName: data.display_name,
      username: data.username || '',
      profilePicUrl: data.profile_pic_url || '',
      walletAddress: data.wallet_address,
      createdAt: data.created_at,
      xLink: data.x_link || '',
      websiteLink: data.website_link || '',
      bio: data.bio || ''
    };
  }

  async isUsernameAvailable(username: string, currentUserWallet?: string): Promise<boolean> {
    // Don't check empty usernames
    if (!username || username.trim() === '') {
      return false;
    }
    
    console.log("Checking username availability:", username);
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('wallet_address')
      .eq('username', username)
      .maybeSingle();
    
    if (error) {
      console.error('Error checking username availability:', error);
      return false;
    }
    
    // If no data found, username is available
    if (!data) return true;
    
    // If the username belongs to the current user, it's available for them
    if (currentUserWallet && data.wallet_address === currentUserWallet) return true;
    
    // Otherwise, username is taken
    return false;
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    console.log("Saving profile for wallet:", profile.walletAddress);
    
    // Now we'll use the wallet address as the ID
    const profileId = profile.walletAddress;
    
    // Convert from camelCase to snake_case for database
    const dbProfile = {
      id: profileId, // Use wallet address as ID
      display_name: profile.displayName,
      username: profile.username,
      profile_pic_url: profile.profilePicUrl,
      wallet_address: profile.walletAddress,
      created_at: profile.createdAt,
      x_link: profile.xLink || null,
      website_link: profile.websiteLink || null,
      bio: profile.bio || null
    };
    
    // Check if profile exists
    const { data: existingProfile, error: lookupError } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', profile.walletAddress)
      .maybeSingle();
    
    if (lookupError) {
      console.error('Error checking if profile exists:', lookupError);
    }

    let result;
    
    if (existingProfile) {
      console.log("Updating existing profile");
      // Update
      result = await this.supabase
        .from('profiles')
        .update(dbProfile)
        .eq('wallet_address', profile.walletAddress);
    } else {
      console.log("Creating new profile");
      // Insert
      result = await this.supabase
        .from('profiles')
        .insert(dbProfile);
    }

    if (result.error) {
      console.error('Error saving profile:', result.error);
      return false;
    }
    
    console.log("Profile saved successfully");
    return true;
  }

  async hasProfile(walletAddress: string): Promise<boolean> {
    console.log("Checking if wallet has profile:", walletAddress);
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (error) {
      console.error('Error checking if profile exists:', error);
      return false;
    }
    
    return !!data;
  }
}

export const profileService = new ProfileService();
