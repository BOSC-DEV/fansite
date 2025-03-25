
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
        className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-green-400/80' : 'text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30'}`}
        onClick={onLike}
      >
        <ThumbsUp className="h-5 w-5" />
      </Button>
      <span className="text-sm text-western-wood/70">{likes}</span>
      
      <Button 
        variant="ghost"
        size="sm"
        className={`h-8 w-8 rounded-full p-0 ${isDisliked ? 'text-red-400/80' : 'text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30'}`}
        onClick={onDislike}
      >
        <ThumbsDown className="h-5 w-5" />
      </Button>
      <span className="text-sm text-western-wood/70">{dislikes}</span>
      
      <div className="flex items-center gap-1">
        <Eye className="h-5 w-5 text-western-wood/60" />
        <span className="text-sm text-western-wood/70">{views}</span>
      </div>
    </div>
  );
}
