
import { BaseSupabaseService } from './baseSupabaseService';
import { scammerService } from './scammer/scammerService';
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
  totalBountyGenerated: number;
  totalBountySpent: number;
  createdAt: string;
  xLink?: string;
  websiteLink?: string;
  points: number; // Points field for profile ranking
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
          created_at,
          x_link,
          website_link,
          points
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
        
        // Bounty amounts
        const bountyGenerated = userScammers.reduce((sum, scammer) => sum + (scammer.bountyAmount || 0), 0);
        const bountySpent = 0; // Keep at 0 until bounty system is ready
        
        // Calculate profile age in days
        const profileCreatedDate = new Date(profile.created_at);
        const now = new Date();
        const ageInDays = Math.max(0.01, (now.getTime() - profileCreatedDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Calculate points using the updated formula
        const points = this.calculateUserPoints(bountySpent, bountyGenerated, ageInDays, totalReports, totalLikes, totalViews, totalComments);
        
        // Update the points in the database for future use
        this.updateUserPoints(profile.id, Math.round(points)).catch(err => 
          console.error("[LeaderboardService] Failed to update points:", err)
        );
        
        // Ensure points value is logged
        console.log(`[LeaderboardService] User ${profile.username || profile.wallet_address} points:`, points, {
          bountySpent,
          bountyGenerated,
          ageInDays,
          totalReports,
          totalLikes,
          totalViews,
          totalComments
        });
        
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
          totalBountyGenerated: bountyGenerated,
          totalBountySpent: bountySpent,
          createdAt: profile.created_at,
          xLink: profile.x_link || undefined,
          websiteLink: profile.website_link || undefined,
          points: Math.round(points) // Round points to nearest integer
        };
      });
    } catch (error) {
      console.error('Unexpected error fetching leaderboard data:', error);
      return [];
    }
  }
  
  // Add a method to update user points in the database
  private async updateUserPoints(userId: string, points: number): Promise<boolean> {
    try {
      console.log(`[LeaderboardService] Updating points for user ${userId} to ${points}`);
      const { error } = await this.supabase
        .from('profiles')
        .update({ points })
        .eq('id', userId);
        
      if (error) {
        console.error('[LeaderboardService] Error updating points:', error);
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('[LeaderboardService] Unexpected error updating points:', error);
      return false;
    }
  }

  // Updated calculation logic with the new formula implementation
  private calculateUserPoints(
    bountySpent: number, 
    bountyGenerated: number, 
    ageInDays: number, 
    totalReports: number, 
    totalLikes: number, 
    totalViews: number,
    totalComments: number
  ): number {
    // Updated formula with new weights
    // 10 points per report
    let reportPoints = totalReports * 10;
    
    // 2 points per like
    let likePoints = totalLikes * 2;
    
    // 1 point per view
    let viewPoints = totalViews * 1;
    
    // 3 points per comment
    let commentPoints = totalComments * 3;
    
    // Include bounty amounts
    let bountyPoints = bountySpent + bountyGenerated;
    
    // Sum up all points
    let points = reportPoints + likePoints + viewPoints + commentPoints + bountyPoints;
    
    // Ensure all users get at least 1 point
    points = Math.max(1, points);
    
    console.log(`[LeaderboardService] Calculated points details:`, {
      bountySpent,
      bountyGenerated,
      totalReports,
      totalLikes,
      totalViews,
      totalComments,
      formulaBreakdown: {
        fromReports: reportPoints,
        fromLikes: likePoints,
        fromViews: viewPoints,
        fromComments: commentPoints,
        fromBounty: bountyPoints
      },
      finalPoints: points
    });
    
    return points;
  }
  
  // New method to update a user's points after submitting a new report
  async updateUserPointsAfterReport(walletAddress: string): Promise<boolean> {
    try {
      console.log(`[LeaderboardService] Updating points for user ${walletAddress} after new report`);
      
      // Get the user profile
      const { data: profileData, error: profileError } = await this.supabase
        .from('profiles')
        .select('*')
        .eq('wallet_address', walletAddress)
        .single();
        
      if (profileError || !profileData) {
        console.error('[LeaderboardService] Error fetching profile for points update:', profileError);
        return false;
      }
      
      // Get all scammers reported by this user
      const userScammers = await scammerService.getScammersByUser(walletAddress);
      
      if (!userScammers || userScammers.length === 0) {
        console.log("[LeaderboardService] No scammers found for this user");
        return false;
      }
      
      // Calculate stats
      const totalReports = userScammers.length;
      const totalLikes = userScammers.reduce((sum, scammer) => sum + (scammer.likes || 0), 0);
      const totalViews = userScammers.reduce((sum, scammer) => sum + (scammer.views || 0), 0);
      
      // Count comments
      let totalComments = 0;
      userScammers.forEach(scammer => {
        if (scammer.comments && Array.isArray(scammer.comments)) {
          totalComments += scammer.comments.length;
        }
      });
      
      const bountyGenerated = userScammers.reduce((sum, scammer) => sum + (scammer.bountyAmount || 0), 0);
      const bountySpent = 0; // Keep at 0 until bounty system is ready
      
      // Calculate profile age in days
      const profileCreatedDate = new Date(profileData.created_at);
      const now = new Date();
      const ageInDays = Math.max(0.01, (now.getTime() - profileCreatedDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Calculate new points with the updated formula
      const newPoints = this.calculateUserPoints(
        bountySpent,
        bountyGenerated,
        ageInDays,
        totalReports,
        totalLikes,
        totalViews,
        totalComments
      );
      
      // Update points in database
      const success = await this.updateUserPoints(profileData.id, Math.round(newPoints));
      
      console.log(`[LeaderboardService] User points updated: ${success ? 'success' : 'failed'}, new points: ${Math.round(newPoints)}`);
      
      return success;
    } catch (error) {
      console.error('[LeaderboardService] Error updating user points after report:', error);
      return false;
    }
  }
}

export const leaderboardService = new LeaderboardService();
