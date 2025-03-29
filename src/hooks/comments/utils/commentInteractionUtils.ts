
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

/**
 * Checks if a user has an interaction with a comment
 */
export async function checkPreviousInteraction(commentId: string, userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_comment_interactions')
      .select('liked, disliked')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error("Error checking previous interaction:", error);
      return { isLiked: false, isDisliked: false };
    }

    return {
      isLiked: data?.liked || false,
      isDisliked: data?.disliked || false
    };
  } catch (error) {
    console.error("Error in checkPreviousInteraction:", error);
    return { isLiked: false, isDisliked: false };
  }
}

/**
 * Creates or updates a user's interaction with a comment
 */
export async function saveInteraction(commentId: string, userId: string, liked: boolean, disliked: boolean) {
  // Check if interaction exists
  const { data: existingInteraction } = await supabase
    .from('user_comment_interactions')
    .select('id')
    .eq('comment_id', commentId)
    .eq('user_id', userId)
    .maybeSingle();
    
  try {
    if (existingInteraction) {
      // Update existing interaction
      await supabase
        .from('user_comment_interactions')
        .update({ 
          liked,
          disliked,
          last_updated: new Date().toISOString()
        })
        .eq('comment_id', commentId)
        .eq('user_id', userId);
    } else {
      // Create new interaction
      await supabase
        .from('user_comment_interactions')
        .insert({
          comment_id: commentId,
          user_id: userId,
          liked,
          disliked,
          last_updated: new Date().toISOString()
        });
    }
    return true;
  } catch (error) {
    console.error("Error saving interaction:", error);
    return false;
  }
}

/**
 * Updates the comment's like and dislike counts in the database
 */
export async function updateCommentCounts(commentId: string, newLikes: number, newDislikes: number) {
  try {
    await supabase
      .from('comments')
      .update({ 
        likes: newLikes,
        dislikes: newDislikes
      })
      .eq('id', commentId);
    return true;
  } catch (error) {
    console.error("Error updating comment counts:", error);
    return false;
  }
}

/**
 * Gets current like and dislike counts for a comment
 */
export async function getCommentCounts(commentId: string) {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('likes, dislikes')
      .eq('id', commentId)
      .single();
      
    if (error) {
      console.error("Error fetching comment counts:", error);
      return { likes: 0, dislikes: 0 };
    }
    
    return {
      likes: data.likes || 0,
      dislikes: data.dislikes || 0
    };
  } catch (error) {
    console.error("Error in getCommentCounts:", error);
    return { likes: 0, dislikes: 0 };
  }
}

/**
 * Shows appropriate error messages based on wallet and profile state
 */
export function handleInteractionErrors({
  isConnected,
  address,
  profileChecked,
  hasProfile,
  connectWallet
}: {
  isConnected: boolean,
  address: string | null,
  profileChecked: boolean,
  hasProfile: boolean,
  connectWallet: () => Promise<void>
}) {
  if (!isConnected || !address) {
    toast.error("You must be connected with a wallet to vote");
    connectWallet();
    return false;
  }

  if (!profileChecked) {
    toast.info("Please wait while we check your profile");
    return false;
  }
  
  if (!hasProfile) {
    toast.error("You need to create a profile before voting", {
      description: "Go to your profile page to create one",
      action: {
        label: "Create Profile",
        onClick: () => window.location.href = "/profile"
      }
    });
    return false;
  }

  return true;
}
