
import { useState, useCallback } from "react";
import { db, Comment } from "@/lib/supabase-helpers";
import { toast } from "sonner";

export function useCommentsLoad(scammerId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load comments function
  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Loading comments for scammer:", scammerId);
      
      // Load from Supabase
      const { data: supabaseComments, error } = await db.comments()
        .select('*')
        .eq('scammer_id', scammerId)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Error fetching comments from Supabase:", error);
        toast.error("Failed to load comments");
        setComments([]);
      } else if (supabaseComments && supabaseComments.length > 0) {
        console.log("Comments loaded from Supabase:", supabaseComments.length);
        
        // Ensure all comments have a valid created_at field and views field
        const validatedComments = supabaseComments.map(comment => {
          const created_at = comment.created_at && comment.created_at !== 'Invalid Date' 
            ? comment.created_at 
            : new Date().toISOString();
          
          // Ensure views property exists with a default value
          const views = typeof comment.views === 'number' ? comment.views : 0;
          
          return {
            ...comment,
            created_at,
            views
          };
        }) as Comment[];
        
        setComments(validatedComments);
      } else {
        console.log("No comments found for this scammer");
        setComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments");
      setComments([]);
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
