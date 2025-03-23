
import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Scammer } from "@/lib/types";
import { ScammerDetailsCard } from "@/components/scammer/ScammerDetailsCard";
import { BountyContribution } from "@/components/BountyContribution";
import { CommentSection } from "@/components/comments/CommentSection";

interface ScammerDetailLayoutProps {
  scammer: Scammer;
  imageLoaded: boolean;
  setImageLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  scammerStats: {
    likes: number;
    dislikes: number;
    views: number;
  };
  onLikeScammer: () => void;
  onDislikeScammer: () => void;
  formatDate: (date: string) => string;
}

export function ScammerDetailLayout({
  scammer,
  imageLoaded,
  setImageLoaded,
  scammerStats,
  onLikeScammer,
  onDislikeScammer,
  formatDate
}: ScammerDetailLayoutProps) {
  return (
    <div className="container mx-auto max-w-6xl px-4 pt-28 pb-16">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="mb-8 hover:bg-western-sand/30 text-western-wood hover:text-western-wood"
      >
        <Link to="/most-wanted">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Most Wanted
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ScammerDetailsCard
            scammer={scammer}
            bountyAmount={scammer.bountyAmount}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
            formatDate={formatDate}
            scammerStats={scammerStats}
            onLikeScammer={onLikeScammer}
            onDislikeScammer={onDislikeScammer}
          />
          
          <div className="mt-8">
            <CommentSection scammerId={scammer.id} />
          </div>
        </div>

        <div>
          <BountyContribution 
            scammerId={scammer.id}
            currentBounty={scammer.bountyAmount}
            scammerName={scammer.name}
          />
        </div>
      </div>
    </div>
  );
}
