
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
    <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-2">
      <Button 
        variant="ghost"
        size="sm"
        className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-green-400' : 'text-white'}`}
        onClick={onLike}
      >
        <ThumbsUp className="h-5 w-5" />
      </Button>
      <span className="text-sm text-white">{likes}</span>
      
      <Button 
        variant="ghost"
        size="sm"
        className={`h-8 w-8 rounded-full p-0 ${isDisliked ? 'text-red-400' : 'text-white'}`}
        onClick={onDislike}
      >
        <ThumbsDown className="h-5 w-5" />
      </Button>
      <span className="text-sm text-white">{dislikes}</span>
      
      <div className="flex items-center gap-1">
        <Eye className="h-5 w-5 text-white" />
        <span className="text-sm text-white">{views}</span>
      </div>
    </div>
  );
}
