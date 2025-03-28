
import React from "react";
import { cn } from "@/lib/utils";
import { InteractionButton } from "./InteractionButton";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare, Share2 } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useProfileInteraction } from "@/hooks/interactions/useProfileInteraction";
import { useIsMobile } from "@/hooks/use-mobile";

interface InteractionsBarProps {
  scammerId?: string;
  likes: number;
  dislikes: number;
  views: number;
  shares: number;
  comments?: number;
  onScrollToComments?: () => void;
  className?: string;
}

export const InteractionsBar = ({
  scammerId,
  likes,
  dislikes,
  views,
  shares,
  comments = 0,
  onScrollToComments,
  className
}: InteractionsBarProps) => {
  const location = useLocation();
  const { handleInteraction } = useProfileInteraction();
  const isMobile = useIsMobile();
  
  // Check if we're on the detail page
  const isDetailPage = location.pathname.includes(`/scammer/${scammerId}`);
  
  // Define actions
  const handleLike = () => {
    if (!scammerId) return;
    handleInteraction(async () => {
      // Like action will be handled in the parent component
    });
  };
  
  const handleDislike = () => {
    if (!scammerId) return;
    handleInteraction(async () => {
      // Dislike action will be handled in the parent component
    });
  };
  
  const handleShare = () => {
    if (!scammerId) return;
    const shareUrl = `${window.location.origin}/scammer/${scammerId}`;
    navigator.clipboard.writeText(shareUrl);
    
    // Show toast notification (handled elsewhere)
  };
  
  return (
    <div 
      className={cn(
        "absolute top-2 right-2 flex items-center gap-1 font-western",
        className
      )}
    >
      <InteractionButton
        icon={ThumbsUp}
        count={likes}
        onClick={handleLike}
        disabled={!scammerId}
      />
      
      <InteractionButton
        icon={ThumbsDown}
        count={dislikes}
        onClick={handleDislike}
        disabled={!scammerId}
      />
      
      <InteractionButton
        icon={Eye}
        count={views}
        disabled={true}
      />
      
      {comments !== undefined && (
        <InteractionButton
          icon={MessageSquare}
          count={comments}
          onClick={onScrollToComments}
          disabled={!scammerId || !isDetailPage}
        />
      )}
      
      <InteractionButton
        icon={Share2}
        count={shares}
        onClick={handleShare}
        disabled={!scammerId}
      />
    </div>
  );
};
