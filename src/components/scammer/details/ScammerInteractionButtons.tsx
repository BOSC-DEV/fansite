
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
    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-green-400' : 'text-white'}`}
          onClick={onLike}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <span className="text-xs text-white">{likes}</span>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          className={`h-8 w-8 rounded-full p-0 ${isDisliked ? 'text-red-400' : 'text-white'}`}
          onClick={onDislike}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <span className="text-xs text-white">{dislikes}</span>
      </div>
      
      <div className="flex items-center">
        <div className="h-8 w-8 flex items-center justify-center">
          <Eye className="h-4 w-4 text-white" />
        </div>
        <span className="text-xs text-white">{views}</span>
      </div>
    </div>
  );
}
