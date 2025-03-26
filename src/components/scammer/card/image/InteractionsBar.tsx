
import { Eye, ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react";
import { InteractionButton } from "./InteractionButton";
import { useInteractions } from "@/hooks/useInteractions";
import { ShareButton } from "./ShareButton";
import { CommentsButton } from "./CommentsButton";

interface InteractionsBarProps {
  scammerId?: string;
  likes: number;
  dislikes: number;
  views: number;
  comments: number;
  onScrollToComments?: () => void;
}

export function InteractionsBar({
  scammerId,
  likes,
  dislikes,
  views,
  comments,
  onScrollToComments
}: InteractionsBarProps) {
  const { 
    isLiked, 
    isDisliked, 
    localLikes, 
    localDislikes, 
    handleLike, 
    handleDislike 
  } = useInteractions({
    scammerId,
    initialLikes: likes,
    initialDislikes: dislikes
  });

  const scrollToComments = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onScrollToComments) {
      onScrollToComments();
    } else if (scammerId) {
      // If we're not on a detail page, navigate to the detail page with a hash
      window.location.href = `/scammer/${scammerId}#comments`;
    }
  };

  return (
    <div className="absolute top-0 right-0 p-2 flex space-x-2">
      <InteractionButton 
        icon={ThumbsUp} 
        count={localLikes} 
        onClick={handleLike} 
        active={isLiked}
        activeColor="bg-green-600/80"
      />
      
      <InteractionButton 
        icon={ThumbsDown} 
        count={localDislikes} 
        onClick={handleDislike} 
        active={isDisliked}
        activeColor="bg-red-600/80"
      />
      
      <InteractionButton 
        icon={Eye} 
        count={views} 
      />
      
      <InteractionButton 
        icon={MessageSquare} 
        count={comments} 
        onClick={scrollToComments}
        title="View comments"
      />
      
      {scammerId && (
        <ShareButton scammerId={scammerId} />
      )}
    </div>
  );
}
