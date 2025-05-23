
import { useState, useEffect } from "react";
import { LeaderboardUser, leaderboardService } from "@/services/storage/leaderboardService";
import { toast } from "sonner";
import { useLocation } from "react-router-dom";

export const useLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const location = useLocation();

  const fetchLeaderboardData = async () => {
    try {
      setIsLoading(true);
      console.log("[useLeaderboard] Fetching leaderboard data from service...");
      
      // Get real data from the leaderboard service instead of mock data
      const data = await leaderboardService.getLeaderboardUsers();
      
      if (data && data.length > 0) {
        console.log(`[useLeaderboard] Retrieved ${data.length} leaderboard users`);
        // Sort by points in descending order
        const sortedData = [...data].sort((a, b) => b.points - a.points);
        setLeaderboardData(sortedData);
      } else {
        console.log("[useLeaderboard] No leaderboard data found");
        setLeaderboardData([]);
      }
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
      setError(err instanceof Error ? err : new Error("Unknown error occurred"));
      toast.error("Failed to load leaderboard data");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data when the component mounts or when the route changes
  useEffect(() => {
    fetchLeaderboardData();
  }, [location.pathname]);

  // Return both the data and a refetch function
  return {
    leaderboardData,
    isLoading,
    error,
    refetchLeaderboard: fetchLeaderboardData
  };
};
