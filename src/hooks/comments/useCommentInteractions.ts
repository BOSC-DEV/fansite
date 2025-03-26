
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";
import { profileService } from "@/services/storage/profileService";

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
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const { isConnected, address, connectWallet } = useWallet();

  // Check if user has already liked or disliked this comment
  useEffect(() => {
    if (address && commentId) {
      const checkPreviousInteraction = async () => {
        try {
          const { data, error } = await supabase
            .from('user_comment_interactions')
            .select('liked, disliked')
            .eq('comment_id', commentId)
            .eq('user_id', address)
            .maybeSingle();

          if (error) {
            console.error("Error checking previous comment interaction:", error);
            return;
          }

          if (data) {
            console.log("Found previous comment interaction:", data);
            setIsLiked(data.liked);
            setIsDisliked(data.disliked);
          }
        } catch (error) {
          console.error("Error in checkPreviousInteraction:", error);
        }
      };

      checkPreviousInteraction();
    }
  }, [commentId, address]);

  // Check if user has a profile
  useEffect(() => {
    if (address) {
      const checkProfile = async () => {
        try {
          const exists = await profileService.hasProfile(address);
          setHasProfile(exists);
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking if user has profile:", error);
          setProfileChecked(true);
        }
      };
      
      checkProfile();
    } else {
      setProfileChecked(false);
      setHasProfile(false);
    }
  }, [address]);

  const handleLike = async () => {
    if (isInteracting) return;
    setIsInteracting(true);
    
    try {
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to vote");
        await connectWallet();
        setIsInteracting(false);
        return;
      }

      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setIsInteracting(false);
        return;
      }
      
      if (!hasProfile) {
        toast.error("You need to create a profile before voting", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteracting(false);
        return;
      }

      // If already liked, remove like
      if (isLiked) {
        setLikes(prev => Math.max(0, prev - 1));
        setIsLiked(false);
        
        // Update the database
        const { error } = await supabase
          .from('user_comment_interactions')
          .update({ liked: false })
          .eq('comment_id', commentId)
          .eq('user_id', address);
          
        if (error) throw error;
        
        // Update comment likes count
        const { error: updateError } = await supabase
          .from('comments')
          .select('likes')
          .eq('id', commentId)
          .single();
        
        if (!updateError) {
          await supabase
            .from('comments')
            .update({ likes: Math.max(0, likes - 1) })
            .eq('id', commentId);
        }
        
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
      
      // Check if interaction exists
      const { data: existingInteraction } = await supabase
        .from('user_comment_interactions')
        .select('id')
        .eq('comment_id', commentId)
        .eq('user_id', address)
        .maybeSingle();
        
      if (existingInteraction) {
        // Update existing interaction
        const { error } = await supabase
          .from('user_comment_interactions')
          .update({ 
            liked: true,
            disliked: false,
            last_updated: new Date().toISOString()
          })
          .eq('comment_id', commentId)
          .eq('user_id', address);
          
        if (error) throw error;
      } else {
        // Create new interaction
        const { error } = await supabase
          .from('user_comment_interactions')
          .insert({
            comment_id: commentId,
            user_id: address,
            liked: true,
            disliked: false,
            last_updated: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      // Update comment like count in database
      const { data: comment } = await supabase
        .from('comments')
        .select('likes, dislikes')
        .eq('id', commentId)
        .single();
        
      if (comment) {
        await supabase
          .from('comments')
          .update({ 
            likes: isDisliked ? comment.likes + 1 : likes + 1,
            dislikes: isDisliked ? Math.max(0, comment.dislikes - 1) : comment.dislikes
          })
          .eq('id', commentId);
      }
      
    } catch (error) {
      console.error("Error handling like:", error);
      // Revert UI state on error
      setIsLiked(prev => !prev);
      setLikes(initialLikes);
      toast.error("Failed to update vote");
    } finally {
      setIsInteracting(false);
    }
  };

  const handleDislike = async () => {
    if (isInteracting) return;
    setIsInteracting(true);
    
    try {
      if (!isConnected || !address) {
        toast.error("You must be connected with a wallet to vote");
        await connectWallet();
        setIsInteracting(false);
        return;
      }

      if (!profileChecked) {
        toast.info("Please wait while we check your profile");
        setIsInteracting(false);
        return;
      }
      
      if (!hasProfile) {
        toast.error("You need to create a profile before voting", {
          description: "Go to your profile page to create one",
          action: {
            label: "Create Profile",
            onClick: () => window.location.href = "/profile"
          }
        });
        setIsInteracting(false);
        return;
      }

      // If already disliked, remove dislike
      if (isDisliked) {
        setDislikes(prev => Math.max(0, prev - 1));
        setIsDisliked(false);
        
        // Update the database
        const { error } = await supabase
          .from('user_comment_interactions')
          .update({ disliked: false })
          .eq('comment_id', commentId)
          .eq('user_id', address);
          
        if (error) throw error;
        
        // Update comment dislikes count
        const { error: updateError } = await supabase
          .from('comments')
          .select('dislikes')
          .eq('id', commentId)
          .single();
        
        if (!updateError) {
          await supabase
            .from('comments')
            .update({ dislikes: Math.max(0, dislikes - 1) })
            .eq('id', commentId);
        }
        
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
      
      // Check if interaction exists
      const { data: existingInteraction } = await supabase
        .from('user_comment_interactions')
        .select('id')
        .eq('comment_id', commentId)
        .eq('user_id', address)
        .maybeSingle();
        
      if (existingInteraction) {
        // Update existing interaction
        const { error } = await supabase
          .from('user_comment_interactions')
          .update({ 
            liked: false,
            disliked: true,
            last_updated: new Date().toISOString()
          })
          .eq('comment_id', commentId)
          .eq('user_id', address);
          
        if (error) throw error;
      } else {
        // Create new interaction
        const { error } = await supabase
          .from('user_comment_interactions')
          .insert({
            comment_id: commentId,
            user_id: address,
            liked: false,
            disliked: true,
            last_updated: new Date().toISOString()
          });
          
        if (error) throw error;
      }
      
      // Update comment dislike count in database
      const { data: comment } = await supabase
        .from('comments')
        .select('likes, dislikes')
        .eq('id', commentId)
        .single();
        
      if (comment) {
        await supabase
          .from('comments')
          .update({ 
            dislikes: isLiked ? comment.dislikes + 1 : dislikes + 1,
            likes: isLiked ? Math.max(0, comment.likes - 1) : comment.likes
          })
          .eq('id', commentId);
      }
      
    } catch (error) {
      console.error("Error handling dislike:", error);
      // Revert UI state on error
      setIsDisliked(prev => !prev);
      setDislikes(initialDislikes);
      toast.error("Failed to update vote");
    } finally {
      setIsInteracting(false);
    }
  };

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
