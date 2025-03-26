
import { useState, useEffect, useCallback } from "react";
import { Comment, storageService } from "@/services/storage/localStorageService";
import { commentService } from "@/services/storage/commentService";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/lib/supabase";

export function useComments(scammerId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, connectWallet, address } = useWallet();
  const [profileChecked, setProfileChecked] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  // Memoize loadComments function to avoid recreating it on each render
  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Loading comments for scammer:", scammerId);
      
      // First try to load from Supabase
      const supabaseComments = await commentService.getCommentsForScammer(scammerId);
      
      if (supabaseComments && supabaseComments.length > 0) {
        console.log("Comments loaded from Supabase:", supabaseComments.length);
        setComments(supabaseComments);
      } else {
        console.log("No comments found in Supabase, trying localStorage");
        // Fallback to localStorage
        const loadedComments = storageService.getCommentsForScammer(scammerId);
        console.log("Comments loaded from localStorage:", loadedComments.length);
        setComments(loadedComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Fallback to localStorage on error
      const loadedComments = storageService.getCommentsForScammer(scammerId);
      setComments(loadedComments);
      toast.error("Failed to load comments from server, showing local data");
    } finally {
      setIsLoading(false);
    }
  }, [scammerId]);

  // Check if user has a profile
  useEffect(() => {
    const checkProfile = async () => {
      if (address) {
        try {
          // Check if user has a profile in Supabase
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('wallet_address', address)
            .single();
          
          setHasProfile(!!data);
          setProfileChecked(true);
        } catch (error) {
          console.error("Error checking profile:", error);
          // Fallback to localStorage
          const profile = storageService.getProfile(address);
          setHasProfile(!!profile);
          setProfileChecked(true);
        }
      } else {
        setProfileChecked(false);
        setHasProfile(false);
      }
    };
    
    checkProfile();
  }, [address]);

  // Load comments when component mounts or scammerId changes
  useEffect(() => {
    loadComments();
  }, [scammerId, loadComments]);

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
    
    // Check if profile check has completed
    if (!profileChecked) {
      toast.info("Please wait while we check your profile");
      return;
    }
    
    // Check if user has a profile
    if (!hasProfile) {
      toast.error("You need to create a profile before commenting", {
        description: "Go to your profile page to create one",
        action: {
          label: "Create Profile",
          onClick: () => window.location.href = "/profile"
        }
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Get user profile
      const profile = storageService.getProfile(address) || 
        await supabase.from('profiles').select('*').eq('wallet_address', address).single()
          .then(({data}) => data);
      
      if (!profile) {
        toast.error("Cannot find your profile");
        setIsSubmitting(false);
        return;
      }
      
      // Create a new comment
      const commentId = uuidv4();
      const comment = {
        id: commentId,
        scammerId,
        content: content.trim(),
        author: address,
        authorName: profile.displayName || profile.display_name,
        authorProfilePic: profile.profilePicUrl || profile.profile_pic_url || "",
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
    comments,
    isLoading,
    content,
    setContent,
    isSubmitting,
    handleSubmit,
    isConnected,
    connectWallet: handleConnect,
    hasProfile,
    profileChecked
  };
}
