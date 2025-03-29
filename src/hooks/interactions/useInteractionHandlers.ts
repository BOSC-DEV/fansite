
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";
import { useInteractionDb } from "./useInteractionDb";
import { useProfileCheck } from "./useProfileCheck";
import { useInteractionState } from "./useInteractionState";

interface UseInteractionHandlersProps {
  scammerId?: string;
  initialLikes: number;
  initialDislikes: number;
}

/**
 * Hook for handling like/dislike interactions
 */
export function useInteractionHandlers({
  scammerId,
  initialLikes,
  initialDislikes
}: UseInteractionHandlersProps) {
  const { state, setState } = useInteractionState({
    scammerId,
    initialLikes,
    initialDislikes
  });
  
  const { isConnected, address, connectWallet } = useWallet();
  const { profileChecked, hasProfile } = useProfileCheck();
  const { saveInteractionToDB, updateScammerStats } = useInteractionDb();
  
  // Handle like functionality
  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId || state.isInteractionLocked) return;
    
    setState(prev => ({ ...prev, isInteractionLocked: true }));
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to like");
        await connectWallet();
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      // Check if profile check has completed
      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }
      
      // Check if user has a profile once profile check is done
      if (!hasProfile) {
        toast.error("You need to create a profile before liking", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      let newLikes = state.localLikes;
      let newDislikes = state.localDislikes;
      let newIsLiked = state.isLiked;
      let newIsDisliked = state.isDisliked;

      if (state.isLiked) {
        // Unlike
        newLikes = state.localLikes - 1;
        newIsLiked = false;
        toast.info("Like removed");
      } else {
        // Like
        newLikes = state.localLikes + 1;
        newIsLiked = true;
        
        if (state.isDisliked) {
          // Remove dislike if present
          newDislikes = state.localDislikes - 1;
          newIsDisliked = false;
        }
        
        toast.success("Liked scammer");
      }
      
      // Update local state FIRST before any async operations
      setState(prev => ({
        ...prev,
        localLikes: newLikes,
        localDislikes: newDislikes,
        isLiked: newIsLiked,
        isDisliked: newIsDisliked
      }));

      // Store interaction locally
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: newIsLiked, 
        disliked: newIsDisliked 
      }));
      
      // Update in database
      await saveInteractionToDB(scammerId, address, newIsLiked, newIsDisliked);

      // Update in storage service
      await updateScammerStats(scammerId, newLikes, newDislikes);
      
      console.log("Like interaction completed:", {
        scammerId,
        newIsLiked,
        newIsDisliked,
        newLikes,
        newDislikes
      });
    } catch (error) {
      console.error("Error handling like:", error);
      toast.error("Failed to save interaction");
    } finally {
      setState(prev => ({ ...prev, isInteractionLocked: false }));
    }
  };
  
  // Handle dislike functionality
  const handleDislike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    
    if (!scammerId || state.isInteractionLocked) return;
    
    setState(prev => ({ ...prev, isInteractionLocked: true }));
    
    try {
      // Check if user is connected
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to dislike");
        await connectWallet();
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      // Check if profile check has completed
      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }
      
      // Check if user has a profile once profile check is done
      if (!hasProfile) {
        toast.error("You need to create a profile before disliking", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setState(prev => ({ ...prev, isInteractionLocked: false }));
        return;
      }

      let newLikes = state.localLikes;
      let newDislikes = state.localDislikes;
      let newIsLiked = state.isLiked;
      let newIsDisliked = state.isDisliked;

      if (state.isDisliked) {
        // Remove dislike
        newDislikes = state.localDislikes - 1;
        newIsDisliked = false;
        toast.info("Dislike removed");
      } else {
        // Dislike
        newDislikes = state.localDislikes + 1;
        newIsDisliked = true;
        
        if (state.isLiked) {
          // Remove like if present
          newLikes = state.localLikes - 1;
          newIsLiked = false;
        }
        
        toast.success("Disliked scammer");
      }
      
      // Update local state
      setState(prev => ({
        ...prev,
        localLikes: newLikes,
        localDislikes: newDislikes,
        isLiked: newIsLiked,
        isDisliked: newIsDisliked
      }));

      // Store interaction both locally and in DB
      localStorage.setItem(`scammer-interactions-${scammerId}`, JSON.stringify({ 
        liked: newIsLiked, 
        disliked: newIsDisliked 
      }));
      
      // Update in database
      await saveInteractionToDB(scammerId, address, newIsLiked, newIsDisliked);

      // Update in storage service
      await updateScammerStats(scammerId, newLikes, newDislikes);
    } catch (error) {
      console.error("Error handling dislike:", error);
    } finally {
      setState(prev => ({ ...prev, isInteractionLocked: false }));
    }
  };
  
  return {
    isLiked: state.isLiked,
    isDisliked: state.isDisliked,
    localLikes: state.localLikes,
    localDislikes: state.localDislikes,
    handleLike,
    handleDislike
  };
}
