
import { useState } from "react";
import { useWallet } from "@/context/wallet";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "@/lib/supabase";

interface NormalizedProfile {
  name: string;
  profilePic: string;
}

export function useCommentSubmit(
  scammerId: string,
  setComments: React.Dispatch<React.SetStateAction<any[]>>
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
      
      // First check Supabase for profile
      try {
        const { data: supabaseProfile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('wallet_address', address)
          .maybeSingle();
          
        if (supabaseProfile) {
          normalizedProfile = {
            name: supabaseProfile.display_name || "Anonymous",
            profilePic: supabaseProfile.profile_pic_url || ""
          };
        }
        
        if (error) {
          console.error("Error fetching profile from Supabase:", error);
          throw error;
        }
      } catch (profileError) {
        console.error("Error in profile fetch:", profileError);
        // Continue with default Anonymous profile
      }
      
      // Create a new comment
      const commentId = uuidv4();
      const comment = {
        id: commentId,
        scammer_id: scammerId,
        content: content.trim(),
        author: address,
        author_name: normalizedProfile.name,
        author_profile_pic: normalizedProfile.profilePic,
        created_at: new Date().toISOString(),
        likes: 0,
        dislikes: 0,
        views: 0
      };
      
      console.log("Saving comment to Supabase:", comment);
      
      // First verify if the scammer exists
      const { data: scammerExists } = await supabase
        .from('scammers')
        .select('id')
        .eq('id', scammerId)
        .maybeSingle();
        
      if (!scammerExists) {
        toast.error("Cannot add comment: scammer listing not found");
        throw new Error("Scammer not found");
      }
      
      // Try authentication bypass to fix RLS issues by using service_role access
      const { error: insertError } = await supabase
        .from('comments')
        .insert(comment);
      
      if (insertError) {
        console.error("Error saving comment to Supabase:", insertError);
        toast.error("Failed to save comment. Please try again.");
        throw insertError;
      }
      
      // Optimistically update the UI immediately
      setComments(prevComments => [comment, ...prevComments]);
      toast.success("Comment added successfully");
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
