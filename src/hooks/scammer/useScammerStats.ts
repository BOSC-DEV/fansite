
import { Scammer } from "@/lib/types";
import { useScammerStatsActions } from "./useScammerStatsActions";

/**
 * Main hook for scammer statistics management
 * Composes smaller hooks for specific functionality
 */
export function useScammerStats(scammer: Scammer | null) {
  const { 
    scammerStats, 
    isLiked, 
    isDisliked, 
    handleLikeScammer, 
    handleDislikeScammer 
  } = useScammerStatsActions(scammer);

  return {
    scammerStats,
    isLiked,
    isDisliked,
    handleLikeScammer,
    handleDislikeScammer
  };
}
