
import { useCallback, useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';

export function useCommentInteractions(commentId: string, initialLikes: number, initialDislikes: number, initialIsLiked: boolean = false, initialIsDisliked: boolean = false) {
  const { address } = useWallet();
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [isDisliked, setIsDisliked] = useState<boolean>(initialIsDisliked);
  const [likes, setLikes] = useState<number>(initialLikes);
  const [dislikes, setDislikes] = useState<number>(initialDislikes);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Helper to check if user is logged in
  const checkUserLoggedIn = useCallback((): boolean => {
    if (!address) {
      toast.error('Please connect your wallet to interact with comments');
      return false;
    }
    return true;
  }, [address]);

  const handleLike = useCallback(async (): Promise<void> => {
    if (!checkUserLoggedIn() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // If already liked, unlike
      if (isLiked) {
        // Use the correct table name: user_comment_interactions
        await supabase
          .from('user_comment_interactions')
          .delete()
          .match({ comment_id: commentId, user_id: address, interaction_type: 'like' });
          
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
      } 
      // If disliked, remove dislike and add like
      else if (isDisliked) {
        // Remove dislike
        await supabase
          .from('user_comment_interactions')
          .delete()
          .match({ comment_id: commentId, user_id: address, interaction_type: 'dislike' });
          
        // Add like
        await supabase
          .from('user_comment_interactions')
          .insert({ 
            comment_id: commentId, 
            user_id: address, 
            liked: true,
            disliked: false
          });
          
        setDislikes(prev => Math.max(0, prev - 1));
        setLikes(prev => prev + 1);
        setIsDisliked(false);
        setIsLiked(true);
      }
      // Add like
      else {
        await supabase
          .from('user_comment_interactions')
          .insert({ 
            comment_id: commentId, 
            user_id: address, 
            liked: true,
            disliked: false
          });
          
        setLikes(prev => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.error('Error handling like:', error);
      toast.error('Failed to process your interaction');
    } finally {
      setIsSubmitting(false);
    }
  }, [commentId, address, isLiked, isDisliked, isSubmitting, checkUserLoggedIn]);

  const handleDislike = useCallback(async (): Promise<void> => {
    if (!checkUserLoggedIn() || isSubmitting) return;
    setIsSubmitting(true);

    try {
      // If already disliked, remove dislike
      if (isDisliked) {
        await supabase
          .from('user_comment_interactions')
          .delete()
          .match({ comment_id: commentId, user_id: address, interaction_type: 'dislike' });
          
        setDislikes(prev => Math.max(0, prev - 1));
        setIsDisliked(false);
      } 
      // If liked, remove like and add dislike
      else if (isLiked) {
        // Remove like
        await supabase
          .from('user_comment_interactions')
          .delete()
          .match({ comment_id: commentId, user_id: address, interaction_type: 'like' });
          
        // Add dislike
        await supabase
          .from('user_comment_interactions')
          .insert({ 
            comment_id: commentId, 
            user_id: address, 
            liked: false,
            disliked: true
          });
          
        setLikes(prev => Math.max(0, prev - 1));
        setDislikes(prev => prev + 1);
        setIsLiked(false);
        setIsDisliked(true);
      }
      // Add dislike
      else {
        await supabase
          .from('user_comment_interactions')
          .insert({ 
            comment_id: commentId, 
            user_id: address, 
            liked: false,
            disliked: true
          });
          
        setDislikes(prev => prev + 1);
        setIsDisliked(true);
      }
    } catch (error) {
      console.error('Error handling dislike:', error);
      toast.error('Failed to process your interaction');
    } finally {
      setIsSubmitting(false);
    }
  }, [commentId, address, isLiked, isDisliked, isSubmitting, checkUserLoggedIn]);

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
