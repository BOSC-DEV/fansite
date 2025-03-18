
import { Scammer } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, DollarSign, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ScammerCardProps {
  scammer: Scammer;
  className?: string;
}

export function ScammerCard({ scammer, className }: ScammerCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-md h-full", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
          </div>
        )}
        <img
          src={scammer.photoUrl}
          alt={scammer.name}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-white truncate">{scammer.name}</h3>
            <Badge variant="destructive" className="ml-2 shrink-0">
              Wanted
            </Badge>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs text-muted-foreground">Accused of</p>
            <p className="text-sm font-medium line-clamp-2">{scammer.accusedOf}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-bosc mr-1" />
            <span className="text-sm font-bold text-bosc">
              BOSC {formatCurrency(scammer.bountyAmount)}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Added {formatDate(scammer.dateAdded)}
          </div>
        </div>
        
        {scammer.aliases.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scammer.aliases.slice(0, 2).map((alias, i) => (
              <Badge key={i} variant="outline" className="text-xs">
                {alias}
              </Badge>
            ))}
            {scammer.aliases.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{scammer.aliases.length - 2} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="pt-2">
          <Link to={`/scammer/${scammer.id}`}>
            <Button variant="outline" size="sm" className="w-full">
              View Details
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ScammerCard;
