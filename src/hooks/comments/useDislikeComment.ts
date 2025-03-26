
import { useState } from 'react';
import { toast } from "sonner";
import { 
  saveInteraction, 
  getCommentCounts, 
  updateCommentCounts, 
  handleInteractionErrors 
} from './utils/commentInteractionUtils';

interface UseDislikeCommentProps {
  commentId: string;
  userId: string | null;
  isLiked: boolean;
  isDisliked: boolean;
  setIsLiked: (value: boolean) => void;
  setIsDisliked: (value: boolean) => void;
  setLikes: (value: number | ((prev: number) => number)) => void;
  setDislikes: (value: number | ((prev: number) => number)) => void;
  isConnected: boolean;
  profileChecked: boolean;
  hasProfile: boolean;
  connectWallet: () => Promise<void>;
}

export function useDislikeComment({
  commentId,
  userId,
  isLiked,
  isDisliked,
  setIsLiked,
  setIsDisliked,
  setLikes,
  setDislikes,
  isConnected,
  profileChecked,
  hasProfile,
  connectWallet
}: UseDislikeCommentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleDislike = async () => {
    if (isProcessing) return;
    setIsProcessing(true);
    
    try {
      // Validate user can interact
      const canProceed = handleInteractionErrors({
        isConnected,
        address: userId,
        profileChecked,
        hasProfile,
        connectWallet
      });
      
      if (!canProceed) {
        setIsProcessing(false);
        return;
      }

      // If already disliked, remove dislike
      if (isDisliked) {
        setDislikes(prev => Math.max(0, prev - 1));
        setIsDisliked(false);
        
        // Save interaction to database
        await saveInteraction(commentId, userId!, false, false);
        
        // Update comment dislikes count
        const { dislikes } = await getCommentCounts(commentId);
        await updateCommentCounts(commentId, isLiked ? 0 : 0, Math.max(0, dislikes - 1));
        
        setIsProcessing(false);
        return;
      }
      
      // If previously liked, remove like
      if (isLiked) {
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      }
      
      // Add dislike
      setDislikes(prev => prev + 1);
      setIsDisliked(true);
      
      // Save interaction to database
      await saveInteraction(commentId, userId!, false, true);
      
      // Update comment like/dislike counts in database
      const { likes, dislikes } = await getCommentCounts(commentId);
      const newLikes = isLiked ? Math.max(0, likes - 1) : likes;
      const newDislikes = isLiked ? dislikes + 1 : dislikes + 1;
      
      await updateCommentCounts(commentId, newLikes, newDislikes);
      
    } catch (error) {
      console.error("Error handling dislike:", error);
      // Revert UI state on error
      setIsDisliked(false);
      setDislikes(prev => Math.max(0, prev - 1));
      toast.error("Failed to update vote");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleDislike,
    isProcessing
  };
}
