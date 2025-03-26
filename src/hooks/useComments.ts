
import { useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { useCommentsLoad } from "./comments/useCommentsLoad";
import { useProfileCheck } from "./comments/useProfileCheck";
import { useCommentSubmit } from "./comments/useCommentSubmit";

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
