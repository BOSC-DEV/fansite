
import { BaseSupabaseService } from './baseSupabaseService';
import { scammerService } from './scammerService';
import { v4 as uuidv4 } from 'uuid';

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
      // Get profiles ordered by creation date (oldest first)
      const { data: profiles, error: profilesError } = await this.supabase
        .from('profiles')
        .select(`
          id,
          wallet_address,
          display_name,
          username,
          profile_pic_url,
          created_at
        `)
        .order('created_at', { ascending: true });

      if (profilesError) {
        console.error('[LeaderboardService] Error fetching profiles:', profilesError);
        return [];
      }

      if (!profiles || profiles.length === 0) {
        console.log("[LeaderboardService] No profiles found");
        return [];
      }

      console.log(`[LeaderboardService] Retrieved ${profiles.length} profiles`);
      
      // Get all scammers to calculate user stats
      const scammers = await scammerService.getAllScammers();
      console.log(`[LeaderboardService] Retrieved ${scammers.length} scammers for stats calculation`);
      
      // Calculate real stats for each user
      return profiles.map(profile => {
        // Filter scammers added by this user
        const userScammers = scammers.filter(scammer => 
          scammer.addedBy === profile.wallet_address
        );
        
        // Calculate total reports (number of scammers reported)
        const totalReports = userScammers.length;
        
        // Calculate total likes (sum of likes on all reported scammers)
        const totalLikes = userScammers.reduce((sum, scammer) => sum + (scammer.likes || 0), 0);
        
        // Calculate total views (sum of views on all reported scammers)
        const totalViews = userScammers.reduce((sum, scammer) => sum + (scammer.views || 0), 0);
        
        // Count comments across all scammer reports
        let totalComments = 0;
        
        // Try to count comments if the comment data is available
        try {
          userScammers.forEach(scammer => {
            if (scammer.comments && Array.isArray(scammer.comments)) {
              totalComments += scammer.comments.length;
            }
          });
        } catch (error) {
          console.warn('[LeaderboardService] Error counting comments:', error);
        }
        
        return {
          id: profile.id,
          walletAddress: profile.wallet_address,
          displayName: profile.display_name || 'Anonymous User',
          username: profile.username || 'user' + profile.id.substring(0, 4),
          profilePicUrl: profile.profile_pic_url || '',
          totalReports: totalReports,
          totalLikes: totalLikes,
          totalViews: totalViews,
          totalComments: totalComments,
          totalBounty: 0, // Keep at 0 until bounty system is ready
          createdAt: profile.created_at
        };
      });
    } catch (error) {
      console.error('Unexpected error fetching leaderboard data:', error);
      return [];
    }
  }
}

export const leaderboardService = new LeaderboardService();
