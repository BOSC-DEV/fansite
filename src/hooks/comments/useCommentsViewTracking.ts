
import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function useCommentsViewTracking(commentId: string) {
  useEffect(() => {
    const trackView = async () => {
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
        await supabase
          .from('comments')
          .update({ 
            views: supabase.rpc('increment', { 
              row_id: commentId,
              column_name: 'views'
            }) 
          })
          .eq('id', commentId);
      } catch (error) {
        console.error("Error tracking comment view:", error);
      }
    };
    
    if (commentId) {
      trackView();
    }
  }, [commentId]);
}
