
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
    <div className="flex justify-between items-center border-b pb-3">
      <div className="flex flex-col items-center">
        <Button 
          variant="outline"
          size="sm"
          className={`h-8 w-8 rounded-full ${isLiked ? 'bg-green-100 border-green-500 text-green-700' : ''}`}
          onClick={onLike}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <span className="text-xs mt-1">{likes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <Button 
          variant="outline"
          size="sm"
          className={`h-8 w-8 rounded-full ${isDisliked ? 'bg-red-100 border-red-500 text-red-700' : ''}`}
          onClick={onDislike}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
        <span className="text-xs mt-1">{dislikes}</span>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full border flex items-center justify-center">
          <View className="h-4 w-4" />
        </div>
        <span className="text-xs mt-1">{views}</span>
      </div>
    </div>
  );
}
