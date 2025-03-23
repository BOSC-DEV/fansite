
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

interface ScammerInteractionButtonsProps {
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  hasProfile: boolean;
}

export function ScammerInteractionButtons({ 
  likes, 
  dislikes, 
  views, 
  isLiked, 
  isDisliked,
  onLike,
  onDislike,
  hasProfile
}: ScammerInteractionButtonsProps) {
  const { isConnected } = useWallet();

  const handleLikeClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to like this post");
      return;
    }
    
    if (!hasProfile) {
      toast.error("You need to create a profile before liking posts");
      return;
    }
    
    onLike();
  };

  const handleDislikeClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to dislike this post");
      return;
    }
    
    if (!hasProfile) {
      toast.error("You need to create a profile before disliking posts");
      return;
    }
    
    onDislike();
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Button 
          variant="outline"
          size="icon"
          className={`h-8 w-8 rounded-full ${isLiked ? 'bg-green-100 border-green-500 text-green-700' : ''}`}
          onClick={handleLikeClick}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <span className="text-xs">{likes}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <Button 
          variant="outline"
          size="icon"
          className={`h-8 w-8 rounded-full ${isDisliked ? 'bg-red-100 border-red-500 text-red-700' : ''}`}
          onClick={handleDislikeClick}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <span className="text-xs">{dislikes}</span>
      </div>
      
      <div className="flex items-center gap-1">
        <div className="h-8 w-8 rounded-full border flex items-center justify-center">
          <Eye className="h-4 w-4" />
        </div>
        <span className="text-xs">{views}</span>
      </div>
    </div>
  );
}
