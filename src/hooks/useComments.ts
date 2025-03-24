
import { useState, useEffect } from "react";
import { Comment, storageService } from "@/services/storage/localStorageService";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { useWallet } from "@/context/WalletContext";

export function useComments(scammerId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isConnected, connectWallet, address } = useWallet();

  useEffect(() => {
    loadComments();
  }, [scammerId]);

  const loadComments = () => {
    setIsLoading(true);
    try {
      const loadedComments = storageService.getCommentsForScammer(scammerId);
      setComments(loadedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    if (!address) {
      toast.error("You must be connected with a wallet to comment");
      return;
    }
    
    // Check if user has a profile
    const profile = storageService.getProfile(address);
    if (!profile) {
      toast.error("You need to create a profile before commenting");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create a new comment
      const commentId = uuidv4();
      const comment = {
        id: commentId,
        scammerId,
        content: content.trim(),
        author: address,
        authorName: profile.displayName,
        authorProfilePic: profile.profilePicUrl,
        createdAt: new Date().toISOString(),
        likes: 0,
        dislikes: 0
      };
      
      // Save to localStorage
      storageService.saveComment(comment);
      
      toast.success("Comment added successfully");
      setContent("");
      loadComments();
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
    connectWallet: handleConnect
  };
}
