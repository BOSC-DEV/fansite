
import { useState, useCallback } from "react";
import { commentService } from "@/services/storage/localStorageService";
import { toast } from "sonner";

export function useCommentsLoad(scammerId: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load comments function
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
        const loadedComments = commentService.getCommentsForScammer(scammerId);
        console.log("Comments loaded from localStorage:", loadedComments.length);
        setComments(loadedComments);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      // Fallback to localStorage on error
      const loadedComments = commentService.getCommentsForScammer(scammerId);
      setComments(loadedComments);
      toast.error("Failed to load comments from server, showing local data");
    } finally {
      setIsLoading(false);
    }
  }, [scammerId]);

  return {
    comments,
    setComments,
    isLoading,
    loadComments
  };
}
