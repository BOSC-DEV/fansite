
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { safeGet } from '@/lib/supabase-helpers';
import { db, Comment } from '@/lib/supabase-helpers';

export function useCommentsViewTracking(commentId: string) {
  useEffect(() => {
    const trackView = async () => {
      if (!commentId) return;
      
      try {
        // Get an anonymized IP hash
        const { data } = await supabase.functions.invoke('get-client-ip-hash');
        const ipHash = data?.ipHash || 'unknown';
        
        // Check if this IP has already viewed this comment
        const localStorageKey = `comment-view-${commentId}-${ipHash}`;
        
        if (localStorage.getItem(localStorageKey)) {
          // This IP has already viewed this comment
          return;
        }
        
        // Mark this IP as having viewed this comment
        localStorage.setItem(localStorageKey, 'true');
        
        // Increment the view count in the database
        const { data: comment, error } = await db.comments()
          .select('views')
          .eq('id', commentId)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching comment view count:", error);
          return;
        }
        
        const currentViews = comment ? safeGet(comment, 'views') || 0 : 0;
        
        await db.comments()
          .update({ views: currentViews + 1 })
          .eq('id', commentId);
      } catch (error) {
        console.error("Error tracking comment view:", error);
      }
    };
    
    trackView();
  }, [commentId]);
}
