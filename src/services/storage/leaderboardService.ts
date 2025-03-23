
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
}

export class LeaderboardService extends BaseSupabaseService {
  async getLeaderboardUsers(): Promise<LeaderboardUser[]> {
    console.log("[LeaderboardService] Fetching leaderboard data");

    try {
      // Join leaderboard_stats with profiles to get user information
      const { data, error } = await this.supabase
        .from('leaderboard_stats')
        .select(`
          id,
          wallet_address,
          total_reports,
          total_likes,
          total_views,
          total_comments,
          total_bounty,
          profiles!inner(display_name, username, profile_pic_url)
        `)
        .order('total_bounty', { ascending: false });

      if (error) {
        console.error('[LeaderboardService] Error fetching leaderboard data:', error);
        return [];
      }

      if (!data || data.length === 0) {
        console.log("[LeaderboardService] No leaderboard data found");
        return [];
      }

      console.log(`[LeaderboardService] Retrieved ${data.length} leaderboard entries`);
      
      // Convert from database format to client format
      return data.map(item => ({
        id: item.id,
        walletAddress: item.wallet_address,
        displayName: item.profiles.display_name,
        username: item.profiles.username || '',
        profilePicUrl: item.profiles.profile_pic_url || '',
        totalReports: item.total_reports,
        totalLikes: item.total_likes,
        totalViews: item.total_views,
        totalComments: item.total_comments,
        totalBounty: Number(item.total_bounty) || 0
      }));
    } catch (error) {
      console.error('Unexpected error fetching leaderboard data:', error);
      return [];
    }
  }
}

export const leaderboardService = new LeaderboardService();
