
import { v4 as uuidv4 } from 'uuid';
import { BaseSupabaseService } from './baseSupabaseService';

// Types for user profiles
export interface UserProfile {
  id?: string;
  displayName: string;
  profilePicUrl: string;
  walletAddress: string;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  bio?: string;
}

export class ProfileService extends BaseSupabaseService {
  async getProfile(walletAddress: string): Promise<UserProfile | null> {
    // Use maybeSingle() instead of single() to avoid errors when no profile exists
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('wallet_address', walletAddress)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    if (!data) {
      return null;
    }

    // Convert snake_case to camelCase for client-side usage
    return {
      id: data.id,
      displayName: data.display_name,
      profilePicUrl: data.profile_pic_url || '',
      walletAddress: data.wallet_address,
      createdAt: data.created_at,
      xLink: data.x_link || '',
      websiteLink: data.website_link || '',
      bio: data.bio || ''
    };
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    // Ensure we have an ID for new profiles
    if (!profile.id) {
      profile.id = uuidv4();
    }
    
    // Convert from camelCase to snake_case for database
    const dbProfile = {
      id: profile.id,
      display_name: profile.displayName,
      profile_pic_url: profile.profilePicUrl,
      wallet_address: profile.walletAddress,
      created_at: profile.createdAt,
      x_link: profile.xLink || null,
      website_link: profile.websiteLink || null,
      bio: profile.bio || null
    };
    
    // Check if profile exists
    const { data: existingProfile } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', profile.walletAddress)
      .maybeSingle();

    let result;
    
    if (existingProfile) {
      // Update
      result = await this.supabase
        .from('profiles')
        .update(dbProfile)
        .eq('wallet_address', profile.walletAddress);
    } else {
      // Insert
      result = await this.supabase
        .from('profiles')
        .insert(dbProfile);
    }

    if (result.error) {
      console.error('Error saving profile:', result.error);
      return false;
    }
    
    return true;
  }

  async hasProfile(walletAddress: string): Promise<boolean> {
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', walletAddress)
      .single();

    return !error && !!data;
  }
}

export const profileService = new ProfileService();
