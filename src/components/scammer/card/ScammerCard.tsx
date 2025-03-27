
import { useMemo, useEffect } from "react";
import { Scammer } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { ScammerCardImage } from "./image/ScammerCardImage";
import { ScammerCardContent } from "./ScammerCardContent";
import { commentService } from "@/services/storage/localStorageService";

interface ScammerCardProps {
  scammer: Scammer;
  className?: string;
  rank?: number;
}

export function ScammerCard({ scammer, className, rank }: ScammerCardProps) {
  // Handle potential invalid scammer data
  if (!scammer || !scammer.id) {
    console.error("Invalid scammer data:", scammer);
    return null;
  }

  // Debug the scammer data
  useEffect(() => {
    console.log(`ScammerCard rendering for ${scammer.name}:`, {
      id: scammer.id,
      photoUrl: scammer.photoUrl,
      hasPhoto: Boolean(scammer.photoUrl)
    });
  }, [scammer]);

  const formattedBounty = useMemo(() => 
    formatCurrency(scammer.bountyAmount), 
  [scammer.bountyAmount]);
  
  const formattedDate = useMemo(() => 
    formatDate(scammer.dateAdded), 
  [scammer.dateAdded]);
  
  // Get comments count from comment service
  const commentsCount = useMemo(() => {
    try {
      const scammerComments = commentService.getCommentsForScammer(scammer.id);
      return scammerComments.length;
    } catch (error) {
      console.error(`Failed to get comments for scammer ${scammer.id}:`, error);
      return 0;
    }
  }, [scammer.id]);
  
  // Prepare fallback photo URL in case photoUrl is undefined
  const safePhotoUrl = scammer.photoUrl || "";
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md h-full border-western-wood bg-western-parchment/80 w-full",
      className
    )}>
      <ScammerCardImage 
        name={scammer.name}
        photoUrl={safePhotoUrl}
        likes={scammer.likes || 0}
        dislikes={scammer.dislikes || 0}
        views={scammer.views || 0}
        shares={scammer.shares || 0}
        comments={commentsCount}
        scammerId={scammer.id}
        rank={rank}
      />
      
      <CardContent className="p-0">
        <ScammerCardContent 
          id={scammer.id}
          accusedOf={scammer.accusedOf}
          bountyAmount={scammer.bountyAmount || 0}
          dateAdded={scammer.dateAdded.toString()}
          aliases={scammer.aliases || []}
          formattedBounty={formattedBounty}
          formattedDate={formattedDate}
        />
      </CardContent>
    </Card>
  );
}
