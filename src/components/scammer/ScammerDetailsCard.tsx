
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Scammer } from "@/lib/types";
import { ScammerSidebar } from './details/ScammerSidebar';
import { ScammerContent } from './details/ScammerContent';
import { useWallet } from "@/context/wallet";
import { useScammerProfile } from '@/hooks/useScammerProfile';
import { useScammerStats } from '@/hooks/useScammerStats';
import { ScammerHeader } from './details/ScammerHeader';
import { commentService } from '@/services/storage/localStorageService';

interface ScammerDetailsCardProps {
  scammer: Scammer;
  bountyAmount?: number;
  imageLoaded?: boolean;
  setImageLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  formatDate?: (date: string) => string;
  scammerStats?: {
    likes: number;
    dislikes: number;
    views: number;
    shares?: number;
  };
  onLikeScammer?: () => void;
  onDislikeScammer?: () => void;
}

export function ScammerDetailsCard({ 
  scammer, 
  imageLoaded, 
  setImageLoaded, 
  formatDate = (date) => new Date(date).toLocaleDateString(),
  scammerStats,
  onLikeScammer,
  onDislikeScammer 
}: ScammerDetailsCardProps) {
  const { address } = useWallet();
  const isCreator = scammer.addedBy === address;
  const [commentCount, setCommentCount] = useState(0);
  
  const { addedByUsername, addedByPhotoUrl, isProfileLoading, profileId } = useScammerProfile(scammer.addedBy);
  const { 
    isLiked, 
    isDisliked, 
  } = useScammerStats(scammer);

  // Fetch comment count
  useEffect(() => {
    if (scammer.id) {
      const comments = commentService.getCommentsForScammer(scammer.id);
      setCommentCount(comments.length);
    }
  }, [scammer.id]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <ScammerHeader 
          name={scammer.name}
          accusedOf={scammer.accusedOf}
          isCreator={isCreator}
          scammerId={scammer.id}
          bountyAmount={scammer.bountyAmount}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image and sidebar info */}
        <div className="flex flex-col space-y-6 w-full">
          <ScammerSidebar 
            name={scammer.name}
            photoUrl={scammer.photoUrl}
            dateAdded={scammer.dateAdded.toString()}
            addedBy={scammer.addedBy}
            addedByUsername={addedByUsername}
            addedByPhotoUrl={addedByPhotoUrl}
            isProfileLoading={isProfileLoading}
            profileId={profileId}
            formatDate={formatDate}
            scammerStats={scammerStats ? {
              ...scammerStats,
              comments: commentCount,
              shares: scammerStats.shares || 0,
            } : undefined}
            isLiked={isLiked}
            isDisliked={isDisliked}
            onLike={onLikeScammer}
            onDislike={onDislikeScammer}
            scammerId={scammer.id}
          />
          
          {/* Details section */}
          <div className="w-full rounded-lg border bg-western-parchment p-4">
            <h3 className="font-semibold text-western-wood mb-3">Details</h3>
            <p className="text-sm text-western-wood">{scammer.accusedOf}</p>
          </div>
          
          {/* Tabs for scammer content below the details */}
          <div className="w-full rounded-lg border bg-western-parchment p-4">
            <ScammerContent 
              aliases={scammer.aliases}
              links={scammer.links}
              accomplices={scammer.accomplices}
              officialResponse={scammer.officialResponse}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
