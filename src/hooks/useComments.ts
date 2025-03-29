
import { useEffect } from "react";
import { useWallet } from "@/context/wallet";
import { useCommentsLoad } from "./comments/useCommentsLoad";
import { useProfileCheck } from "./comments/useProfileCheck";
import { useCommentSubmit } from "./comments/useCommentSubmit";
import { supabase } from "@/lib/supabase";

export function useComments(scammerId: string) {
  const { isConnected, connectWallet, address } = useWallet();
  
  // Load comments
  const { 
    comments, 
    setComments, 
    isLoading, 
    loadComments 
  } = useCommentsLoad(scammerId);
  
  // Check if user has a profile
  const { 
    profileChecked, 
    hasProfile 
  } = useProfileCheck(address);
  
  // Handle comment submission
  const { 
    content, 
    setContent, 
    isSubmitting, 
    handleSubmit, 
    connectWallet: handleConnect 
  } = useCommentSubmit(scammerId, setComments);

  // Load comments when component mounts or scammerId changes
  useEffect(() => {
    const verifyScammer = async () => {
      try {
        // Verify the scammer exists
        const { data, error } = await supabase
          .from('scammers')
          .select('id')
          .eq('id', scammerId)
          .maybeSingle();
          
        if (error || !data) {
          console.warn("Scammer not found, comments may not load correctly:", error);
        }
      } catch (e) {
        console.error("Failed to verify scammer:", e);
      }
    };
    
    verifyScammer();
    loadComments();
  }, [scammerId, loadComments]);

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
