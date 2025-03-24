
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
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost"
        size="sm"
        className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-green-400' : 'text-western-wood'}`}
        onClick={onLike}
      >
        <ThumbsUp className="h-5 w-5" />
      </Button>
      <span className="text-sm text-western-wood">{likes}</span>
      
      <Button 
        variant="ghost"
        size="sm"
        className={`h-8 w-8 rounded-full p-0 ${isDisliked ? 'text-red-400' : 'text-western-wood'}`}
        onClick={onDislike}
      >
        <ThumbsDown className="h-5 w-5" />
      </Button>
      <span className="text-sm text-western-wood">{dislikes}</span>
      
      <div className="flex items-center gap-1">
        <Eye className="h-5 w-5 text-western-wood" />
        <span className="text-sm text-western-wood">{views}</span>
      </div>
    </div>
  );
}
