
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scammer } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  User,
  Link2,
  Users,
  MessageSquare,
  ExternalLink,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { profileService } from "@/services/storage/profileService";
import { storageService } from "@/services/storage/localStorageService";

interface ScammerDetailsCardProps {
  scammer: Scammer;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  formatDate: (date: Date) => string;
  bountyAmount: number;
  scammerStats: {
    likes: number;
    dislikes: number;
    views: number;
  };
  onLikeScammer: () => void;
  onDislikeScammer: () => void;
}

export function ScammerDetailsCard({
  scammer,
  imageLoaded,
  setImageLoaded,
  formatDate,
  bountyAmount,
  scammerStats,
  onLikeScammer,
  onDislikeScammer,
}: ScammerDetailsCardProps) {
  const [addedByUsername, setAddedByUsername] = useState<string | null>(null);
  const [isLoadingUsername, setIsLoadingUsername] = useState(true);

  // Fetch the username of the person who added the scammer
  useEffect(() => {
    const fetchAddedByProfile = async () => {
      if (scammer.addedBy) {
        try {
          setIsLoadingUsername(true);
          const profile = await profileService.getProfile(scammer.addedBy);
          if (profile) {
            setAddedByUsername(profile.displayName || profile.username);
          }
        } catch (error) {
          console.error("Failed to fetch profile for addedBy:", error);
        } finally {
          setIsLoadingUsername(false);
        }
      } else {
        setIsLoadingUsername(false);
      }
    };

    fetchAddedByProfile();
  }, [scammer.addedBy]);

  return (
    <Card>
      <div className="relative">
        <div className="aspect-video overflow-hidden bg-muted rounded-t-lg">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
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
            onError={(e) => {
              // If image fails to load, show a fallback
              const target = e.target as HTMLImageElement;
              target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(scammer.name) + "&background=random";
              setImageLoaded(true);
            }}
          />
        </div>
        
        {/* Stats bar below image */}
        <div className="flex items-center justify-between px-6 py-3 bg-muted/20 border-b">
          <div className="flex space-x-4">
            <button 
              onClick={onLikeScammer}
              className="flex items-center space-x-1 text-sm hover:text-green-600 transition-colors"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>{scammerStats.likes}</span>
            </button>

            <button 
              onClick={onDislikeScammer}
              className="flex items-center space-x-1 text-sm hover:text-red-600 transition-colors"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>{scammerStats.dislikes}</span>
            </button>
          </div>

          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{scammerStats.views} views</span>
          </div>
        </div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <span className="text-xl font-bold text-bosc">
              {bountyAmount.toLocaleString()} $BOSC
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Added on {formatDate(scammer.dateAdded)}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            Added by:
          </div>
          {isLoadingUsername ? (
            <div className="text-xs bg-muted px-2 py-1 rounded animate-pulse">
              Loading...
            </div>
          ) : (
            <Link 
              to={`/${addedByUsername || scammer.addedBy}`}
              className="text-xs bg-muted px-2 py-1 rounded font-mono hover:bg-muted/80 transition-colors hover:underline"
            >
              {addedByUsername || scammer.addedBy}
            </Link>
          )}
        </div>

        <Separator className="my-6" />

        {scammer.aliases.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              Known Aliases
            </h3>
            <div className="flex flex-wrap gap-2">
              {scammer.aliases.map((alias, i) => (
                <Badge key={i} variant="outline">
                  {alias}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {scammer.accomplices.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              Known Accomplices
            </h3>
            <div className="flex flex-wrap gap-2">
              {scammer.accomplices.map((accomplice, i) => (
                <Badge key={i} variant="secondary">
                  {accomplice}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {scammer.links.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
              Evidence Links
            </h3>
            <ul className="space-y-2">
              {scammer.links.map((link, i) => (
                <li key={i} className="flex items-center">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bosc hover:underline flex items-center"
                  >
                    {link}
                    <ExternalLink className="h-3 w-3 ml-1 inline-block" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {scammer.officialResponse && (
          <div>
            <h3 className="flex items-center text-sm font-medium mb-3">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              Official Response
            </h3>
            <div className="bg-muted/50 border border-border/50 rounded-md p-4 text-sm">
              {scammer.officialResponse}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
