
import React from "react";
import { Link } from "react-router-dom";
import { Scammer } from "@/lib/types";
import { ScammerImageLoader } from "./image/ScammerImageLoader";
import { HeartIcon, MessageSquare, Eye } from "lucide-react";
import { InteractionButton } from "./image/InteractionButton";
import { formatCurrency } from "@/utils/formatters";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

export interface ScammerCardProps {
  scammer: Scammer;
  rank?: number;
  className?: string;
  inProfileSection?: boolean;
}

export const ScammerCard = React.memo(({ 
  scammer, 
  rank, 
  className = "",
  inProfileSection = false
}: ScammerCardProps) => {
  const isMobile = useIsMobile();
  const dateAdded = useMemo(() => {
    return typeof scammer.dateAdded === "string"
      ? new Date(scammer.dateAdded)
      : scammer.dateAdded;
  }, [scammer.dateAdded]);

  // Format the date in a more readable format
  const formattedDate = useMemo(() => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(dateAdded);
  }, [dateAdded]);

  // Ensure comments is an array before trying to get its length
  const commentsCount = useMemo(() => {
    if (!scammer.comments) return 0;
    return Array.isArray(scammer.comments) ? scammer.comments.length : 0;
  }, [scammer.comments]);

  return (
    <div className={`rounded-sm overflow-hidden ${className} matrix-card`}>
      <Link to={`/scammer/${scammer.id}`} className="block">
        <div className="relative">
          <ScammerImageLoader 
            name={scammer.name} 
            photoUrl={scammer.photoUrl} 
            onImageLoaded={() => {}}
            className="w-full h-48 object-cover bg-hacker-dark"
            fallback={
              <div className="w-full h-48 flex items-center justify-center bg-hacker-dark">
                <span className="text-4xl text-hacker-accent/70 font-hacker uppercase">
                  {scammer.name.charAt(0)}
                </span>
              </div>
            }
          />
          
          {/* Green scanline effect over the image */}
          <div className="absolute inset-0 pointer-events-none crt-scanline"></div>
          
          {/* Overlay with rank if provided */}
          {rank && (
            <div className="absolute top-2 left-2 bg-hacker-card/80 border border-hacker-border/40 text-hacker-accent px-2 py-1 text-sm font-mono">
              #{rank}
            </div>
          )}
          
          {/* Interaction buttons */}
          <div className="absolute bottom-2 right-2 flex gap-1.5">
            <InteractionButton 
              icon={Eye} 
              count={scammer.views || 0}
              title="Views"
              isViewOrComment={true}
            />
            <InteractionButton 
              icon={HeartIcon} 
              count={scammer.likes || 0}
              title="Likes"
            />
            <InteractionButton 
              icon={MessageSquare} 
              count={commentsCount}
              title="Comments"
              isViewOrComment={true}
            />
          </div>
          
          {/* Name overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-hacker-dark/90 border-t border-hacker-border text-hacker-text p-2 font-mono">
            <div className="text-hacker-accent truncate">{scammer.name}</div>
          </div>
        </div>
        
        <div className="p-3 bg-hacker-card">
          <p className="text-hacker-text/90 text-sm line-clamp-2 mb-2 font-mono h-10">
            {scammer.accusedOf}
          </p>
          
          <div className="flex justify-between items-center">
            <div className="text-xs text-hacker-text/70 font-mono">
              {formattedDate}
            </div>
            
            {scammer.bountyAmount > 0 ? (
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-hacker-dark/70 text-hacker-highlight border-hacker-border">
                {formatCurrency(scammer.bountyAmount)} SOL
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs px-2 py-0.5 bg-hacker-dark/70 text-hacker-text/50 border-hacker-muted">
                No bounty
              </Badge>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
});

ScammerCard.displayName = "ScammerCard";
