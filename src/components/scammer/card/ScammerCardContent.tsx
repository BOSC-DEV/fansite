
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { SolAmount } from "@/components/SolAmount";

interface ScammerCardContentProps {
  id: string;
  accusedOf: string;
  bountyAmount: number;
  dateAdded: string;
  aliases: string[];
  formattedBounty: string;
  formattedDate: string;
}

export function ScammerCardContent({
  id,
  accusedOf,
  bountyAmount,
  dateAdded,
  aliases,
  formattedBounty,
  formattedDate
}: ScammerCardContentProps) {
  // Make sure aliases is always an array, even if it's null or undefined
  const aliasesArray = Array.isArray(aliases) ? aliases : [];
  
  return (
    <div className="p-4 space-y-3">
      <div className="flex justify-between items-start">
        <div className="w-3/5">
          <p className="text-xs text-western-wood/70">Accused of</p>
          <p className="text-sm font-medium line-clamp-2 text-western-wood">{accusedOf}</p>
        </div>
        <div className="text-xs text-western-wood/70 text-right">
          Added {formattedDate}
        </div>
      </div>
      
      <div className="flex justify-start items-center">
        <div className="flex items-center">
          <SolAmount 
            amount={bountyAmount}
            className="text-sm font-bold text-western-accent font-wanted"
          />
        </div>
      </div>
      
      {aliasesArray.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {aliasesArray.slice(0, 2).map((alias, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
              {alias}
            </Badge>
          ))}
          {aliasesArray.length > 2 && (
            <Badge variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
              +{aliasesArray.length - 2} more
            </Badge>
          )}
        </div>
      )}
      
      <div className="pt-2">
        <Link to={`/scammer/${id}`}>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full border-western-wood text-western-accent hover:bg-western-wood hover:text-western-parchment transition-colors"
          >
            View Details
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
