
import { BaseSupabaseService } from './baseSupabaseService';

export interface LeaderboardUser {
  id: string;
  walletAddress: string;
  displayName: string;
  username: string;
  profilePicUrl: string;
  totalReports: number;
  totalLikes: number;
  totalViews: number;
  totalComments: number;
  totalBounty: number;
  createdAt: string;
}

export class LeaderboardService extends BaseSupabaseService {
  async getLeaderboardUsers(): Promise<LeaderboardUser[]> {
    console.log("[LeaderboardService] Fetching leaderboard data");

    try {
      // Instead of using leaderboard_stats, we'll get data directly from profiles
      // ordered by creation date
      const { data, error } = await this.supabase
        .from('profiles')
        .select(`
          id,
          wallet_address,
          display_name,
          username,
          profile_pic_url,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('[LeaderboardService] Error fetching leaderboard data:', error);
        return [];
      }

      if (!data || data.length === 0) {
        console.log("[LeaderboardService] No profiles found");
        return [];
      }

      console.log(`[LeaderboardService] Retrieved ${data.length} profiles`);
      
      // Convert from database format to client format
      // For now, use placeholder values for the stats until bounty system is ready
      return data.map(item => ({
        id: item.id,
        walletAddress: item.wallet_address,
        displayName: item.display_name || 'Anonymous User',
        username: item.username || 'user' + item.id.substring(0, 4),
        profilePicUrl: item.profile_pic_url || '',
        // Placeholder stats based on user id to make it look somewhat random
        totalReports: parseInt(item.id.substring(0, 2), 16) % 10 || 1,
        totalLikes: parseInt(item.id.substring(2, 4), 16) % 25 || 3,
        totalViews: parseInt(item.id.substring(4, 6), 16) % 100 + 10,
        totalComments: parseInt(item.id.substring(6, 8), 16) % 15 || 2,
        totalBounty: parseInt(item.id.substring(8, 10), 16) % 1000 || 50,
        createdAt: item.created_at
      }));
    } catch (error) {
      console.error('Unexpected error fetching leaderboard data:', error);
      return [];
    }
  }
}

export const leaderboardService = new LeaderboardService();
