
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown } from "lucide-react";

interface AgreementRatioBarProps {
  likes: number;
  dislikes: number;
  onLike?: () => void;
  onDislike?: () => void;
}

export function AgreementRatioBar({ likes, dislikes, onLike, onDislike }: AgreementRatioBarProps) {
  // Calculate the percentage of likes vs. total reactions
  const total = likes + dislikes;
  const agreementPercentage = total > 0 ? Math.round((likes / total) * 100) : 50;
  
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onLike || !onDislike) return;
    
    // Get the click position relative to the bar
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const barWidth = rect.width;
    
    // If clicked on left half, like; if on right half, dislike
    if (x < barWidth / 2) {
      onLike();
    } else {
      onDislike();
    }
  };
  
  return (
    <div className="bg-western-parchment/50 border border-western-wood/20 rounded-md p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center cursor-pointer" onClick={onLike}>
          <ThumbsUp className="h-4 w-4 text-green-600 mr-1" />
          <span className="text-sm font-medium text-green-600">Agree ({likes})</span>
        </div>
        <div className="flex items-center cursor-pointer" onClick={onDislike}>
          <span className="text-sm font-medium text-red-600">Disagree ({dislikes})</span>
          <ThumbsDown className="h-4 w-4 text-red-600 ml-1" />
        </div>
      </div>
      
      <div className="relative pt-1 cursor-pointer" onClick={handleBarClick}>
        <Progress 
          value={agreementPercentage} 
          className="h-2 bg-red-200"
          indicatorClassName="bg-green-500"
        />
        
        {/* Add invisible overlay with mouse indicators */}
        <div className="absolute inset-0 flex pt-1 opacity-0 hover:opacity-10 transition-opacity">
          <div className="w-1/2 h-2 bg-green-600"></div>
          <div className="w-1/2 h-2 bg-red-600"></div>
        </div>
      </div>
      
      <div className="mt-1 text-center">
        <span className="text-xs text-western-wood/70">
          {total === 0 
            ? "No votes yet" 
            : `${agreementPercentage}% of community members agree`}
        </span>
      </div>
    </div>
  );
}
