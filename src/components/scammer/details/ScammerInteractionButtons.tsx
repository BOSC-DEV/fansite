
import React from 'react';
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Eye, MessageSquare } from "lucide-react";

interface ScammerInteractionButtonsProps {
  likes: number;
  dislikes: number;
  views: number;
  comments?: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
}

export function ScammerInteractionButtons({ 
  likes, 
  dislikes, 
  views, 
  comments = 0,
  isLiked, 
  isDisliked,
  onLike,
  onDislike
}: ScammerInteractionButtonsProps) {
  const scrollToComments = () => {
    const commentsSection = document.querySelector('.comments-section');
    if (commentsSection) {
      commentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          className={`h-8 w-8 rounded-full p-0 ${isLiked ? 'text-green-400/80' : 'text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30'}`}
          onClick={onLike}
        >
          <ThumbsUp className="h-5 w-5" />
        </Button>
        <span className="text-sm ml-1 text-western-wood/70">{likes}</span>
      </div>
      
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          className={`h-8 w-8 rounded-full p-0 ${isDisliked ? 'text-red-400/80' : 'text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30'}`}
          onClick={onDislike}
        >
          <ThumbsDown className="h-5 w-5" />
        </Button>
        <span className="text-sm ml-1 text-western-wood/70">{dislikes}</span>
      </div>
      
      <div className="flex items-center">
        <div className="flex justify-center items-center h-8 w-8">
          <Eye className="h-5 w-5 text-western-wood/60" />
        </div>
        <span className="text-sm ml-1 text-western-wood/70">{views}</span>
      </div>
      
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 rounded-full p-0 text-western-wood/60 hover:text-western-wood/80 hover:bg-western-sand/30"
          onClick={scrollToComments}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
        <span className="text-sm ml-1 text-western-wood/70">{comments}</span>
      </div>
    </div>
  );
}
