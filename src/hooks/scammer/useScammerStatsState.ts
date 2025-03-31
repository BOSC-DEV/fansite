
import { useState, useEffect } from "react";
import { Scammer } from "@/lib/types";

/**
 * Hook to manage scammer statistics state
 */
export function useScammerStatsState(scammer: Scammer | null) {
  const [stats, setStats] = useState({
    likes: scammer?.likes || 0,
    dislikes: scammer?.dislikes || 0,
    views: scammer?.views || 0,
    shares: scammer?.shares || 0
  });

  // Update stats when scammer changes
  useEffect(() => {
    if (scammer) {
      setStats({
        likes: scammer.likes || 0,
        dislikes: scammer.dislikes || 0,
        views: scammer.views || 0,
        shares: scammer.shares || 0
      });
    }
  }, [scammer]);

  const updateStats = (newStats: Partial<typeof stats>) => {
    setStats(prev => ({
      ...prev,
      ...newStats
    }));
  };

  return { stats, updateStats };
}
