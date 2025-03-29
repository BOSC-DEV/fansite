
import { useState, useEffect } from "react";
import { LeaderboardUser } from "@/services/storage/leaderboardService";

export const useLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // This is a placeholder for actual API fetch
        // In a real app, this would fetch from your API or service
        setIsLoading(true);
        
        // Mock data for now - would be replaced with actual service call
        const mockData: LeaderboardUser[] = [
          {
            id: '1',
            username: 'bounty_hunter1',
            displayName: 'Bounty Hunter',
            profilePicUrl: '/placeholder.svg',
            xLink: 'https://x.com/bountyhunter1',
            websiteLink: 'https://hunter.com',
            totalReports: 25,
            totalLikes: 150,
            totalViews: 2500,
            totalComments: 75,
            totalBountyGenerated: 15.5,
            totalBountySpent: 5.2,
            createdAt: '2023-05-15T10:30:00Z',
            points: 500
          },
          {
            id: '2',
            username: 'sheriff_bob',
            displayName: 'Sheriff Bob',
            profilePicUrl: '/placeholder.svg',
            xLink: 'https://x.com/sheriffbob',
            websiteLink: 'https://sheriff.com',
            totalReports: 18,
            totalLikes: 120,
            totalViews: 1800,
            totalComments: 45,
            totalBountyGenerated: 12.3,
            totalBountySpent: 4.1,
            createdAt: '2023-06-20T14:45:00Z',
            points: 420
          },
          {
            id: '3',
            username: 'outlaw_jane',
            displayName: 'Outlaw Jane',
            profilePicUrl: '/placeholder.svg',
            xLink: 'https://x.com/outlawjane',
            websiteLink: 'https://outlaw.com',
            totalReports: 30,
            totalLikes: 200,
            totalViews: 3200,
            totalComments: 90,
            totalBountyGenerated: 20.7,
            totalBountySpent: 7.3,
            createdAt: '2023-04-10T09:15:00Z',
            points: 650
          }
        ];
        
        // Simulate network delay
        setTimeout(() => {
          setLeaderboardData(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError(err instanceof Error ? err : new Error("Unknown error occurred"));
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  return {
    leaderboardData,
    isLoading,
    error
  };
};
