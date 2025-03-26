
import { useMemo } from "react";
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
  const formattedBounty = useMemo(() => 
    formatCurrency(scammer.bountyAmount), 
  [scammer.bountyAmount]);
  
  const formattedDate = useMemo(() => 
    formatDate(scammer.dateAdded), 
  [scammer.dateAdded]);
  
  // Get comments count from comment service
  const commentsCount = useMemo(() => {
    const scammerComments = commentService.getCommentsForScammer(scammer.id);
    return scammerComments.length;
  }, [scammer.id]);
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md h-full border-western-wood bg-western-parchment/80",
      className
    )}>
      <ScammerCardImage 
        name={scammer.name}
        photoUrl={scammer.photoUrl}
        likes={scammer.likes || 0}
        dislikes={scammer.dislikes || 0}
        views={scammer.views || 0}
        comments={commentsCount}
        scammerId={scammer.id}
        rank={rank}
      />
      
      <CardContent className="p-0">
        <ScammerCardContent 
          id={scammer.id}
          accusedOf={scammer.accusedOf}
          bountyAmount={scammer.bountyAmount}
          dateAdded={scammer.dateAdded.toString()}
          aliases={scammer.aliases}
          formattedBounty={formattedBounty}
          formattedDate={formattedDate}
        />
      </CardContent>
    </Card>
  );
}
