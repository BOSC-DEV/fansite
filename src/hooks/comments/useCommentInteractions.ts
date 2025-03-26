
import { useCallback, useState } from 'react';
import { storageService } from '@/services/storage';
import { useWallet } from '@/context/WalletContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useCommentInteractions(commentId: string, initialLikes: number, initialDislikes: number, initialIsLiked: boolean, initialIsDisliked: boolean) {
  const { walletAddress } = useWallet();
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isDisliked, setIsDisliked] = useState<boolean>(initialIsDisliked);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Helper to check if user is logged in
  const checkUserLoggedIn = useCallback((): boolean => {
    if (!walletAddress) {
      toast.error('Please connect your wallet to interact with comments');
      return false;
    }
    return true;
  }, [walletAddress]);

  const handleLike = useCallback(async (): Promise<void> => {
    if (!checkUserLoggedIn() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // If already liked, unlike
      if (isLiked) {
        await storageService.removeCommentInteraction(commentId, walletAddress!, 'like');
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      } 
      // If disliked, remove dislike and add like
      else if (isDisliked) {
        await storageService.removeCommentInteraction(commentId, walletAddress!, 'dislike');
        await storageService.addCommentInteraction(commentId, walletAddress!, 'like');
        setDislikes(prev => Math.max(0, prev - 1));
        setLikes(prev => prev + 1);
        setIsDisliked(false);
        setIsLiked(true);
      }
      // Add like
      else {
        await storageService.addCommentInteraction(commentId, walletAddress!, 'like');
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like:', error);
      toast.error('Failed to process your interaction');
    } finally {
      setIsSubmitting(false);
    }
  }, [commentId, walletAddress, isLiked, isDisliked, isSubmitting, checkUserLoggedIn]);

  const handleDislike = useCallback(async (): Promise<void> => {
    if (!checkUserLoggedIn() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // If already disliked, remove dislike
      if (isDisliked) {
        await storageService.removeCommentInteraction(commentId, walletAddress!, 'dislike');
        setDislikes(prev => Math.max(0, prev - 1));
        setIsDisliked(false);
      } 
      // If liked, remove like and add dislike
      else if (isLiked) {
        await storageService.removeCommentInteraction(commentId, walletAddress!, 'like');
        await storageService.addCommentInteraction(commentId, walletAddress!, 'dislike');
        setLikes(prev => Math.max(0, prev - 1));
        setDislikes(prev => prev + 1);
        setIsLiked(false);
        setIsDisliked(true);
      }
      // Add dislike
      else {
        await storageService.addCommentInteraction(commentId, walletAddress!, 'dislike');
        setDislikes(prev => prev + 1);
        setIsDisliked(true);
      }
    } catch (error) {
      console.error('Error handling dislike:', error);
      toast.error('Failed to process your interaction');
    } finally {
      setIsSubmitting(false);
    }
  }, [commentId, walletAddress, isLiked, isDisliked, isSubmitting, checkUserLoggedIn]);

  return {
    likes,
    dislikes,
    isLiked,
    isDisliked,
    handleLike,
    handleDislike,
    isSubmitting
  };
}
