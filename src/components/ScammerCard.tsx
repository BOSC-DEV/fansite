
import { Scammer } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ExternalLink, EyeIcon, ThumbsUp, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatDate, truncateText } from "@/utils/formatters";

interface ScammerCardProps {
  scammer: Scammer;
  className?: string;
}

export function ScammerCard({ scammer, className }: ScammerCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const formattedBounty = useMemo(() => 
    formatCurrency(scammer.bountyAmount), 
  [scammer.bountyAmount]);
  
  const formattedDate = useMemo(() => 
    formatDate(scammer.dateAdded), 
  [scammer.dateAdded]);
  
  const truncatedAccusation = useMemo(() => 
    truncateText(scammer.accusedOf, 100), 
  [scammer.accusedOf]);

  // Reset image states when scammer changes
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [scammer.id, scammer.photoUrl]);

  const handleImageError = () => {
    console.log(`Image failed to load for scammer: ${scammer.name}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Fallback URL when image fails to load
  const fallbackImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(scammer.name)}&background=random&size=200`;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-md h-full border-western-wood bg-western-parchment/80",
      className
    )}>
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
            <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
          </div>
        )}
        <img
          src={imageError ? fallbackImageUrl : scammer.photoUrl}
          alt={scammer.name}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
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
            <p className="text-xs text-western-wood/70">Accused of</p>
            <p className="text-sm font-medium line-clamp-2 text-western-wood">{truncatedAccusation}</p>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-sm font-bold text-western-accent font-wanted">
              {formattedBounty} $BOSC
            </span>
          </div>
          <div className="text-xs text-western-wood/70">
            Added {formattedDate}
          </div>
        </div>
        
        {scammer.aliases.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {scammer.aliases.slice(0, 2).map((alias, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
                {alias}
              </Badge>
            ))}
            {scammer.aliases.length > 2 && (
              <Badge variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
                +{scammer.aliases.length - 2} more
              </Badge>
            )}
          </div>
        )}
        
        <div className="pt-2">
          <Link to={`/scammer/${scammer.id}`}>
            <Button variant="outline" size="sm" className="w-full border-western-wood text-western-accent hover:bg-western-sand/20">
              View Details
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
