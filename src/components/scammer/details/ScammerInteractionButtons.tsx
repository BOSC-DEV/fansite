
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye } from "lucide-react";

interface ScammerInteractionButtonsProps {
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerInteractionButtons({ 
  likes, 
  dislikes, 
  views, 
  isLiked, 
  isDisliked,
  onLike,
  onDislike
}: ScammerInteractionButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1">
        <Button 
          variant="outline"
          size="icon"
          className={`h-8 w-8 rounded-full ${isLiked ? 'bg-green-100 border-green-500 text-green-700' : ''}`}
          onClick={onLike}
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
          onClick={onDislike}
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
