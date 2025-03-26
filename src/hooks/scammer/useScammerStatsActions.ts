
import { toast } from "sonner";
import { scammerService } from "@/services/storage/scammer/scammerService";
import { storageService } from "@/services/storage/localStorageService";
import { useScammerStatsState } from "./useScammerStatsState";
import { useScammerInteractions } from "./useScammerInteractions";
import { Scammer } from "@/lib/types";

/**
 * Hook to handle scammer statistics actions (like, dislike)
 */
export function useScammerStatsActions(scammer: Scammer | null) {
  const { stats, updateStats } = useScammerStatsState(scammer);
  const { isLiked, isDisliked, setInteractions } = useScammerInteractions(scammer);

  const handleLikeScammer = async () => {
    if (!scammer?.id) return;
    
    try {
      // Handle toggling
      if (isLiked) {
        // Unlike - decrement likes
        updateStats({ likes: stats.likes - 1 });
        setInteractions(prev => ({ ...prev, isLiked: false }));
        toast.info("Like removed");
      } else {
        // Like - increment likes
        updateStats({ likes: stats.likes + 1 });
        setInteractions(prev => ({ ...prev, isLiked: true }));
        
        // If already disliked, remove dislike
        if (isDisliked) {
          updateStats({ dislikes: stats.dislikes - 1 });
          setInteractions(prev => ({ ...prev, isDisliked: false }));
        }
        toast.success("Liked scammer");
      }
      
      // Save to storage
      await scammerService.likeScammer(scammer.id);
      storageService.likeScammer(scammer.id);
      
      // Save interaction state to localStorage
      localStorage.setItem(`scammer-interactions-${scammer.id}`, JSON.stringify({
        liked: !isLiked,
        disliked: isDisliked && !isLiked ? false : isDisliked
      }));
    } catch (error) {
      console.error("Error liking scammer:", error);
      toast.error("Failed to like scammer");
    }
  };

  const handleDislikeScammer = async () => {
    if (!scammer?.id) return;
    
    try {
      // Handle toggling
      if (isDisliked) {
        // Undislike - decrement dislikes
        updateStats({ dislikes: stats.dislikes - 1 });
        setInteractions(prev => ({ ...prev, isDisliked: false }));
        toast.info("Dislike removed");
      } else {
        // Dislike - increment dislikes
        updateStats({ dislikes: stats.dislikes + 1 });
        setInteractions(prev => ({ ...prev, isDisliked: true }));
        
        // If already liked, remove like
        if (isLiked) {
          updateStats({ likes: stats.likes - 1 });
          setInteractions(prev => ({ ...prev, isLiked: false }));
        }
        toast.success("Disliked scammer");
      }
      
      // Save to storage
      await scammerService.dislikeScammer(scammer.id);
      storageService.dislikeScammer(scammer.id);
      
      // Save interaction state to localStorage
      localStorage.setItem(`scammer-interactions-${scammer.id}`, JSON.stringify({
        liked: isLiked && !isDisliked ? false : isLiked,
        disliked: !isDisliked
      }));
    } catch (error) {
      console.error("Error disliking scammer:", error);
      toast.error("Failed to dislike scammer");
    }
  };

  return {
    scammerStats: stats,
    isLiked,
    isDisliked,
    handleLikeScammer,
    handleDislikeScammer
  };
}
