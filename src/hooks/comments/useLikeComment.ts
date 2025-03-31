
import { useState } from 'react';
import { toast } from "sonner";
import { 
  saveInteraction, 
  getCommentCounts, 
  updateCommentCounts, 
  handleInteractionErrors 
} from './utils/commentInteractionUtils';

interface UseLikeCommentProps {
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

export function useLikeComment({
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
}: UseLikeCommentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleLike = async () => {
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

      // If already liked, remove like
      if (isLiked) {
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
        
        // Save interaction to database
        await saveInteraction(commentId, userId!, false, false);
        
        // Update comment likes count
        const { likes } = await getCommentCounts(commentId);
        await updateCommentCounts(commentId, Math.max(0, likes - 1), isDisliked ? 0 : 0);
        
        setIsProcessing(false);
        return;
      }
      
      // If previously disliked, remove dislike
      if (isDisliked) {
        setDislikes(prev => Math.max(0, prev - 1));
        setIsDisliked(false);
      }
      
      // Add like
      setLikes(prev => prev + 1);
      setIsLiked(true);
      
      // Save interaction to database
      await saveInteraction(commentId, userId!, true, false);
      
      // Update comment like/dislike counts in database
      const { likes, dislikes } = await getCommentCounts(commentId);
      const newLikes = isDisliked ? likes + 1 : likes + 1;
      const newDislikes = isDisliked ? Math.max(0, dislikes - 1) : dislikes;
      
      await updateCommentCounts(commentId, newLikes, newDislikes);
      
    } catch (error) {
      console.error("Error handling like:", error);
      // Revert UI state on error
      setIsLiked(false);
      setLikes(prev => Math.max(0, prev - 1));
      toast.error("Failed to update vote");
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleLike,
    isProcessing
  };
}
