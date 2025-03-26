
import { useState, useEffect } from 'react';
import { Scammer } from "@/lib/types";

/**
 * Hook to manage local scammer statistics state 
 */
export function useScammerStatsState(scammer: Scammer | null) {
  const [stats, setStats] = useState({
    likes: scammer?.likes || 0,
    dislikes: scammer?.dislikes || 0,
    views: scammer?.views || 0
  });

  // Update stats when scammer data changes
  useEffect(() => {
    if (scammer) {
      setStats({
        likes: scammer.likes || 0,
        dislikes: scammer.dislikes || 0,
        views: scammer.views || 0
      });
    }
  }, [scammer]);

  const updateStats = (newStats: { likes?: number; dislikes?: number; views?: number }) => {
    setStats(prevStats => ({
      ...prevStats,
      ...newStats
    }));
  };

  return {
    stats,
    updateStats
  };
}
