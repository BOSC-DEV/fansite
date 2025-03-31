
import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export function useCommentsLoad(scammerId: string) {
  const [comments, setComments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load comments function
  const loadComments = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log("Loading comments for scammer:", scammerId);
      
      // Verify the scammer exists first
      const { data: scammerExists } = await supabase
        .from('scammers')
        .select('id')
        .eq('id', scammerId)
        .maybeSingle();
        
      if (!scammerExists) {
        console.warn("Scammer not found, comments may not load correctly");
      }
      
      // Load from Supabase
      const { data: supabaseComments, error } = await supabase
        .from('comments')
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
          // Use current timestamp if the date is invalid
          const validatedComment = {
            ...comment,
            created_at: comment.created_at && comment.created_at !== 'Invalid Date' 
              ? comment.created_at 
              : new Date().toISOString(),
            views: comment.views || 0 // Ensure views property exists
          };
          return validatedComment;
        });
        
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
