
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
  const { id, name, photoUrl, description, bountyAmount, dateAdded, likes, dislikes, views, shares } = scammer;
  
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
        interactionsPosition={inProfileSection ? "bottomRight" : "topRight"}
      />
      <ScammerCardContent
        name={name}
        description={description}
        bountyAmount={bountyAmount}
        dateAdded={formatDate(dateAdded)}
        scammerId={id}
      />
    </Card>
  );
};
