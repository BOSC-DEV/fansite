
import { Scammer } from "@/lib/types";
import { useScammerLoader } from "./useScammerLoader";
import { useScammerStats } from "./useScammerStats";

/**
 * Main hook for scammer detail page functionality
 * Composes smaller hooks for loading data and managing statistics
 */
export function useScammerDetail(id: string | undefined) {
  // Load scammer data
  const { 
    scammer, 
    isLoading, 
    imageLoaded, 
    setImageLoaded 
  } = useScammerLoader(id);

  // Manage scammer stats and interactions
  const { 
    scammerStats,
    handleLikeScammer,
    handleDislikeScammer
  } = useScammerStats(scammer);

  return {
    scammer, 
    isLoading, 
    imageLoaded, 
    setImageLoaded, 
    scammerStats,
    handleLikeScammer,
    handleDislikeScammer
  };
}
