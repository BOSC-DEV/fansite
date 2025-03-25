
import React from 'react';
import { Link } from "react-router-dom";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle, CardDescription } from "@/components/ui/card";
import { ScammerInteractionButtons } from './ScammerInteractionButtons';

interface ScammerHeaderProps {
  name: string;
  accusedOf: string;
  isCreator: boolean;
  scammerId: string;
  likes: number;
  dislikes: number;
  views: number;
  isLiked: boolean;
  isDisliked: boolean;
  onLike: () => void;
  onDislike: () => void;
  bountyAmount?: number;
}

export function ScammerHeader({ 
  name, 
  accusedOf, 
  isCreator, 
  scammerId, 
  likes, 
  dislikes, 
  views,
  isLiked,
  isDisliked,
  onLike,
  onDislike,
  bountyAmount = 0
}: ScammerHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <CardTitle className="text-2xl text-western-wood">{name}</CardTitle>
        <CardDescription className="text-western-wood/70 mt-1">
          Accused of: {accusedOf}
        </CardDescription>
        {bountyAmount > 0 && (
          <div className="mt-2 flex items-center">
            <span className="text-sm text-western-accent font-medium">
              Total Bounty: <span className="font-bold">{bountyAmount.toLocaleString()} $BOSC</span>
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col items-end gap-2">
        <ScammerInteractionButtons 
          likes={likes}
          dislikes={dislikes}
          views={views}
          isLiked={isLiked}
          isDisliked={isDisliked}
          onLike={onLike}
          onDislike={onDislike}
        />
        
        {isCreator && (
          <Button 
            variant="outline" 
            size="sm"
            asChild
            className="bg-western-sand/30 border-western-sand/20 text-western-wood/80 hover:bg-western-sand/50 hover:text-western-wood transition-colors"
          >
            <Link to={`/edit-listing/${scammerId}`}>
              <Edit className="h-4 w-4 mr-1" />
              Edit Listing
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
