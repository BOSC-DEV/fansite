
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, View } from "lucide-react";

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
    <div className="flex gap-2">
      <div className="flex flex-col items-center">
        <Button 
          variant="outline"
          size="sm"
          className={`h-8 w-8 rounded-full ${isLiked ? 'bg-green-100 border-green-500 text-green-700' : 'border-western-wood/30'}`}
          onClick={onLike}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs mt-1">{likes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <Button 
          variant="outline"
          size="sm"
          className={`h-8 w-8 rounded-full ${isDisliked ? 'bg-red-100 border-red-500 text-red-700' : 'border-western-wood/30'}`}
          onClick={onDislike}
        >
          <ThumbsDown className="h-3.5 w-3.5" />
        </Button>
        <span className="text-xs mt-1">{dislikes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border border-western-wood/30 flex items-center justify-center">
          <View className="h-3.5 w-3.5" />
        </div>
        <span className="text-xs mt-1">{views}</span>
      </div>
    </div>
  );
}
