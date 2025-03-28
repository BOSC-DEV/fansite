
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
  position?: "topRight" | "bottomRight";
}

export const InteractionsBar = ({
  scammerId,
  likes,
  dislikes,
  views,
  shares,
  comments = 0,
  onScrollToComments,
  className,
  position = "bottomRight" // Changed default from "topRight" to "bottomRight"
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

  // Position styling based on the position prop
  const positionClass = position === "bottomRight" 
    ? "absolute bottom-2 right-2" 
    : "absolute top-2 right-2";
  
  return (
    <div 
      className={cn(
        positionClass,
        "flex items-center gap-1 font-western drop-shadow-md", // Added drop-shadow for better visibility
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
        isViewOrComment={true} // Mark as view button to prevent greying out
      />
      
      {comments !== undefined && (
        <InteractionButton
          icon={MessageSquare}
          count={comments}
          onClick={onScrollToComments}
          disabled={!scammerId || !isDetailPage}
          isViewOrComment={true} // Mark as comment button to prevent greying out
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
}
