
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Scammer } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ScammerCardImage } from "./image/ScammerCardImage";
import { ScammerCardContent } from "./ScammerCardContent";
import { formatDate } from "@/utils/formatters";

interface ScammerCardProps {
  scammer: Scammer;
  rank?: number;
  className?: string;
  inProfileSection?: boolean;
}

export const ScammerCard: React.FC<ScammerCardProps> = ({ 
  scammer, 
  rank, 
  className = "",
  inProfileSection = false
}) => {
  const { id, name, photoUrl, accusedOf, bountyAmount, dateAdded, aliases, likes, dislikes, views, shares } = scammer;
  
  return (
    <Card className={cn("overflow-hidden border-western-wood bg-western-parchment/80", className)}>
      <ScammerCardImage
        name={name}
        photoUrl={photoUrl}
        likes={likes || 0}
        dislikes={dislikes || 0}
        views={views || 0}
        shares={shares || 0}
        comments={0} // We don't show comments count in cards yet
        scammerId={id}
        rank={rank}
        // Remove the conditional position since we want all cards to have the interactions at the bottom
      />
      <ScammerCardContent
        id={id}
        accusedOf={accusedOf}
        bountyAmount={bountyAmount}
        dateAdded={formatDate(dateAdded)}
        aliases={aliases || []}
        formattedBounty={bountyAmount.toString()}
        formattedDate={formatDate(dateAdded)}
      />
    </Card>
  );
};
