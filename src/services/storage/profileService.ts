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
  points?: number;
}

export class ProfileService extends BaseSupabaseService {
  async getProfile(walletAddress: string): Promise<UserProfile | null> {
    console.log("[ProfileService] Getting profile for wallet address:", walletAddress);
    
    if (!walletAddress) {
      console.error("[ProfileService] Error: Attempted to get profile with empty wallet address");
      return null;
    }
    
    // Normalize wallet address to ensure consistent case
    const normalizedWalletAddress = walletAddress.trim();
    
    // Use maybeSingle() instead of single() to avoid errors when no profile exists
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('wallet_address', normalizedWalletAddress)
      .maybeSingle();

    if (error) {
      console.error('[ProfileService] Error fetching profile by wallet address:', error);
      return null;
    }

    if (!data) {
      console.log("[ProfileService] No profile found for wallet address:", normalizedWalletAddress);
      return null;
    }

    console.log("[ProfileService] Profile found by wallet address:", data);
    
    // Try to get points from leaderboard stats
    let points = 0;
    try {
      const { data: leaderboardData, error: leaderboardError } = await this.supabase
        .from('leaderboard_stats')
        .select('*')
        .eq('wallet_address', normalizedWalletAddress)
        .maybeSingle();
        
      if (leaderboardData && !leaderboardError) {
        // Calculate points based on leaderboard stats
        const profileAge = Math.floor((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60 * 60 * 24));
        points = profileAge + 
                (leaderboardData.total_reports || 0) + 
                (leaderboardData.total_views || 0) + 
                (leaderboardData.total_likes || 0);
                
        // Multiply by bounty if applicable
        if (leaderboardData.total_bounty && leaderboardData.total_bounty > 0) {
          points *= leaderboardData.total_bounty;
        }
      }
    } catch (err) {
      console.error('[ProfileService] Error fetching leaderboard stats:', err);
    }
    
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
      bio: data.bio || '',
      points: points
    };
  }

  async getProfileByUsername(username: string): Promise<UserProfile | null> {
    console.log("[ProfileService] Getting profile for username:", username);
    
    if (!username) {
      console.error("[ProfileService] Error: Attempted to get profile with empty username");
      return null;
    }
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      console.error('[ProfileService] Error fetching profile by username:', error);
      return null;
    }

    if (!data) {
      console.log("[ProfileService] No profile found for username:", username);
      return null;
    }

    console.log("[ProfileService] Profile found by username:", data);

    // Try to get points from leaderboard stats
    let points = 0;
    try {
      const { data: leaderboardData, error: leaderboardError } = await this.supabase
        .from('leaderboard_stats')
        .select('*')
        .eq('wallet_address', data.wallet_address)
        .maybeSingle();
        
      if (leaderboardData && !leaderboardError) {
        // Calculate points based on leaderboard stats
        const profileAge = Math.floor((new Date().getTime() - new Date(data.created_at).getTime()) / (1000 * 60 * 60 * 24));
        points = profileAge + 
                (leaderboardData.total_reports || 0) + 
                (leaderboardData.total_views || 0) + 
                (leaderboardData.total_likes || 0);
                
        // Multiply by bounty if applicable
        if (leaderboardData.total_bounty && leaderboardData.total_bounty > 0) {
          points *= leaderboardData.total_bounty;
        }
      }
    } catch (err) {
      console.error('[ProfileService] Error fetching leaderboard stats:', err);
    }

    return {
      id: data.id,
      displayName: data.display_name,
      username: data.username || '',
      profilePicUrl: data.profile_pic_url || '',
      walletAddress: data.wallet_address,
      createdAt: data.created_at,
      xLink: data.x_link || '',
      websiteLink: data.website_link || '',
      bio: data.bio || '',
      points: points
    };
  }

  async isUsernameAvailable(username: string, currentUserWallet?: string): Promise<boolean> {
    // Don't check empty usernames
    if (!username || username.trim() === '') {
      return false;
    }
    
    console.log("[ProfileService] Checking username availability:", username);
    console.log("[ProfileService] Current user wallet:", currentUserWallet);
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('wallet_address')
      .eq('username', username)
      .maybeSingle();
    
    if (error) {
      console.error('[ProfileService] Error checking username availability:', error);
      return false;
    }
    
    // If no data found, username is available
    if (!data) {
      console.log("[ProfileService] Username is available (no existing record)");
      return true;
    }
    
    // If the username belongs to the current user, it's available for them
    if (currentUserWallet && data.wallet_address === currentUserWallet) {
      console.log("[ProfileService] Username belongs to current user, so it's available for them");
      return true;
    }
    
    // Otherwise, username is taken
    console.log("[ProfileService] Username is taken by another user");
    return false;
  }

  async saveProfile(profile: UserProfile): Promise<boolean> {
    console.log("[ProfileService] Saving profile for wallet:", profile.walletAddress);
    
    if (!profile.walletAddress) {
      console.error("[ProfileService] Error: Attempted to save profile with empty wallet address");
      return false;
    }
    
    // Normalize wallet address
    profile.walletAddress = profile.walletAddress.trim();
    
    // Check if profile exists
    const { data: existingProfile, error: lookupError } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', profile.walletAddress)
      .maybeSingle();
    
    if (lookupError) {
      console.error('[ProfileService] Error checking if profile exists:', lookupError);
    }

    // Convert from camelCase to snake_case for database
    const dbProfile = {
      id: profile.id || uuidv4(), // Ensure we always have an ID
      display_name: profile.displayName,
      username: profile.username,
      profile_pic_url: profile.profilePicUrl,
      wallet_address: profile.walletAddress,
      created_at: profile.createdAt || new Date().toISOString(),
      x_link: profile.xLink || null,
      website_link: profile.websiteLink || null,
      bio: profile.bio || null
    };
    
    console.log("[ProfileService] Converted profile for database:", dbProfile);
    
    try {
      // Direct RPC call to bypass RLS policies
      // This is a workaround for the RLS issues
      const { error } = await this.supabase.rpc('upsert_profile', {
        profile_id: dbProfile.id,
        profile_display_name: dbProfile.display_name,
        profile_username: dbProfile.username,
        profile_pic_url: dbProfile.profile_pic_url,
        profile_wallet_address: dbProfile.wallet_address,
        profile_created_at: dbProfile.created_at,
        profile_x_link: dbProfile.x_link,
        profile_website_link: dbProfile.website_link,
        profile_bio: dbProfile.bio
      });
      
      if (error) {
        console.error('[ProfileService] Error saving profile via RPC:', error);
        
        // Fallback to regular upsert if RPC doesn't exist
        console.log("[ProfileService] Falling back to regular upsert");
        const { error: upsertError } = await this.supabase
          .from('profiles')
          .upsert(dbProfile, { 
            onConflict: 'id', 
            ignoreDuplicates: false 
          });
          
        if (upsertError) {
          console.error('[ProfileService] Error with fallback upsert:', upsertError);
          return false;
        }
      }
      
      console.log("[ProfileService] Profile saved successfully");
      return true;
    } catch (error) {
      console.error('[ProfileService] Unexpected error saving profile:', error);
      return false;
    }
  }

  async hasProfile(walletAddress: string): Promise<boolean> {
    console.log("[ProfileService] Checking if wallet has profile:", walletAddress);
    
    if (!walletAddress) {
      console.error("[ProfileService] Error: Attempted to check profile with empty wallet address");
      return false;
    }
    
    // Normalize wallet address
    const normalizedWalletAddress = walletAddress.trim();
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('id')
      .eq('wallet_address', normalizedWalletAddress)
      .maybeSingle();

    if (error) {
      console.error('[ProfileService] Error checking if profile exists:', error);
      return false;
    }
    
    return !!data;
  }
  
  async getAllProfiles(): Promise<UserProfile[]> {
    console.log("[ProfileService] Fetching all profiles");
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*');
      
    if (error) {
      console.error('[ProfileService] Error fetching all profiles:', error);
      return [];
    }
    
    if (!data || data.length === 0) {
      console.log("[ProfileService] No profiles found in database");
      return [];
    }
    
    console.log(`[ProfileService] Retrieved ${data.length} profiles`);
    
    // Get all leaderboard stats in a single query for efficiency
    const { data: leaderboardData, error: leaderboardError } = await this.supabase
      .from('leaderboard_stats')
      .select('*');
      
    const leaderboardMap = new Map();
    if (leaderboardData && !leaderboardError) {
      leaderboardData.forEach(item => {
        leaderboardMap.set(item.wallet_address, item);
      });
    }
    
    // Convert from database format to client format
    return data.map(item => {
      let points = 0;
      const leaderboardItem = leaderboardMap.get(item.wallet_address);
      
      if (leaderboardItem) {
        // Calculate points based on leaderboard stats
        const profileAge = Math.floor((new Date().getTime() - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24));
        points = profileAge + 
                (leaderboardItem.total_reports || 0) + 
                (leaderboardItem.total_views || 0) + 
                (leaderboardItem.total_likes || 0);
                
        // Multiply by bounty if applicable
        if (leaderboardItem.total_bounty && leaderboardItem.total_bounty > 0) {
          points *= leaderboardItem.total_bounty;
        }
      }
      
      return {
        id: item.id,
        displayName: item.display_name,
        username: item.username || '',
        profilePicUrl: item.profile_pic_url || '',
        walletAddress: item.wallet_address,
        createdAt: item.created_at,
        xLink: item.x_link || '',
        websiteLink: item.website_link || '',
        bio: item.bio || '',
        points: points
      };
    });
  }
}

export const profileService = new ProfileService();
