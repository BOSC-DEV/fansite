
import { useState } from "react";
import { toast } from "sonner";
import { storageService } from "@/services/storage/localStorageService";
import { scammerService } from "@/services/storage/scammer/scammerService";
import { Scammer } from "@/lib/types";

/**
 * Hook to handle scammer statistics and interactions
 */
export function useScammerStats(scammer: Scammer | null) {
  const [scammerStats, setScammerStats] = useState({
    likes: scammer?.likes || 0,
    dislikes: scammer?.dislikes || 0,
    views: scammer?.views || 0
  });

  // Update stats when scammer data changes
  useState(() => {
    if (scammer) {
      setScammerStats({
        likes: scammer.likes || 0,
        dislikes: scammer.dislikes || 0,
        views: scammer.views || 0
      });
    }
  });

  const handleLikeScammer = async () => {
    if (scammer?.id) {
      try {
        await scammerService.likeScammer(scammer.id);
        // Also update in localStorage
        storageService.likeScammer(scammer.id);
        
        // Update local state
        setScammerStats(prev => ({
          ...prev,
          likes: prev.likes + 1
        }));
      } catch (error) {
        console.error("Error liking scammer:", error);
        toast.error("Failed to like scammer");
      }
    }
  };

  const handleDislikeScammer = async () => {
    if (scammer?.id) {
      try {
        await scammerService.dislikeScammer(scammer.id);
        // Also update in localStorage
        storageService.dislikeScammer(scammer.id);
        
        // Update local state
        setScammerStats(prev => ({
          ...prev,
          dislikes: prev.dislikes + 1
        }));
      } catch (error) {
        console.error("Error disliking scammer:", error);
        toast.error("Failed to dislike scammer");
      }
    }
  };

  return {
    scammerStats,
    handleLikeScammer,
    handleDislikeScammer
  };
}
