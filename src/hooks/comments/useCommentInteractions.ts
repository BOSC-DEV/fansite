
import { useState, useEffect } from 'react';
import { checkPreviousInteraction } from './utils/commentInteractionUtils';
import { useWallet } from "@/context/WalletContext";
import { useLikeComment } from './useLikeComment';
import { useDislikeComment } from './useDislikeComment';
import { useHasProfile } from './useHasProfile';

interface UseCommentInteractionsProps {
  commentId: string;
  initialLikes: number;
  initialDislikes: number;
}

export function useCommentInteractions({
  commentId,
  initialLikes,
  initialDislikes
}: UseCommentInteractionsProps) {
  const [isInteracting, setIsInteracting] = useState(false);
  const [likes, setLikes] = useState(initialLikes || 0);
  const [dislikes, setDislikes] = useState(initialDislikes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { isConnected, address, connectWallet } = useWallet();
  
  // Check if user has a profile
  const { profileChecked, hasProfile } = useHasProfile(address);

  // Like handler
  const { handleLike, isProcessing: isLiking } = useLikeComment({
    commentId,
    userId: address,
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
  });

  // Dislike handler
  const { handleDislike, isProcessing: isDisliking } = useDislikeComment({
    commentId,
    userId: address,
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
  });

  // Check if user has already liked or disliked this comment
  useEffect(() => {
    if (address && commentId) {
      const fetchPreviousInteraction = async () => {
        const { isLiked: liked, isDisliked: disliked } = await checkPreviousInteraction(commentId, address);
        setIsLiked(liked);
        setIsDisliked(disliked);
      };

      fetchPreviousInteraction();
    }
  }, [commentId, address]);

  // Update isInteracting when either like or dislike operation is in progress
  useEffect(() => {
    setIsInteracting(isLiking || isDisliking);
  }, [isLiking, isDisliking]);

  return {
    likes,
    dislikes,
    isLiked,
    isDisliked,
    isInteracting,
    handleLike,
    handleDislike
  };
}
