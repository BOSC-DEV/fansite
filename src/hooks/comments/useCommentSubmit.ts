
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { Comment, storageService } from "@/services/storage/localStorageService";
import { commentService } from "@/services/storage/commentService";
import { supabase } from "@/lib/supabase";

interface NormalizedProfile {
  name: string;
  profilePic: string;
}

export function useCommentSubmit(
  scammerId: string,
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>
) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, connectWallet, address } = useWallet();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    if (!isConnected || !address) {
      toast.error("You must be connected with a wallet to comment");
      await connectWallet();
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try to get profile data
      let normalizedProfile: NormalizedProfile = {
        name: "Anonymous",
        profilePic: ""
      };
      
      // First check localStorage
      const localProfile = storageService.getProfile(address);
      
      if (localProfile) {
        normalizedProfile = {
          name: localProfile.displayName,
          profilePic: localProfile.profilePicUrl
        };
      } else {
        // Check Supabase
        try {
          const { data: supabaseProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', address)
            .single();
            
          if (supabaseProfile) {
            normalizedProfile = {
              name: supabaseProfile.display_name || "Anonymous",
              profilePic: supabaseProfile.profile_pic_url || ""
            };
          }
        } catch (error) {
          console.error("Error fetching profile from Supabase:", error);
        }
      }
      
      // Create a new comment
      const commentId = uuidv4();
      const comment = {
        id: commentId,
        scammerId,
        content: content.trim(),
        author: address,
        authorName: normalizedProfile.name,
        authorProfilePic: normalizedProfile.profilePic,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
      
      console.log("Saving comment:", comment);
      
      // Try to save to Supabase first
      const savedToSupabase = await commentService.saveComment(comment).catch(err => {
        console.error("Error saving comment to Supabase:", err);
        return false;
      });
      
      // Always save to localStorage as backup
      storageService.saveComment(comment);
      
      // Optimistically update the UI immediately
      setComments(prevComments => [comment, ...prevComments]);
      
      if (savedToSupabase) {
        toast.success("Comment added successfully");
      } else {
        toast.info("Comment saved locally, will sync to server when possible");
      }
      
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Fix the return type of connectWallet to match expectation in components
  const handleConnect = async (): Promise<void> => {
    await connectWallet();
  };

  return {
    content,
    setContent,
    isSubmitting,
    handleSubmit,
    isConnected,
    connectWallet: handleConnect
  };
}
