
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, ThumbsDown, UserCircle2, Link as LinkIcon, AlertCircle, View } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Scammer } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { toast } from "sonner";
import { storageService } from "@/services/storage";

interface ScammerDetailsCardProps {
  scammer: Scammer;
  bountyAmount?: number;
  imageLoaded?: boolean;
  setImageLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  formatDate?: (date: Date) => string;
  scammerStats?: {
    likes: number;
    dislikes: number;
    views: number;
  };
  onLikeScammer?: () => void;
  onDislikeScammer?: () => void;
}

export function ScammerDetailsCard({ scammer, bountyAmount, imageLoaded, setImageLoaded, formatDate = (date) => date.toLocaleDateString(), scammerStats, onLikeScammer, onDislikeScammer }: ScammerDetailsCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(scammer.likes || 0);
  const [dislikes, setDislikes] = useState(scammer.dislikes || 0);
  const [views, setViews] = useState(scammer.views || 0);
  const [addedByUsername, setAddedByUsername] = useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Fetch profile information for the addedBy user
    const fetchAddedByProfile = async () => {
      if (!scammer.addedBy) {
        setIsProfileLoading(false);
        return;
      }
      
      try {
        const profile = await storageService.getProfile(scammer.addedBy);
        if (profile && profile.username) {
          setAddedByUsername(profile.username);
        }
      } catch (error) {
        console.error("Error fetching profile for addedBy:", error);
      } finally {
        setIsProfileLoading(false);
      }
    };

    fetchAddedByProfile();
    
    // Initialize stats from props if available
    if (scammerStats) {
      setLikes(scammerStats.likes);
      setDislikes(scammerStats.dislikes);
      setViews(scammerStats.views);
    }
  }, [scammer.addedBy, scammerStats]);

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      setLikes(likes - 1);
      toast.info("Like removed");
    } else {
      if (isDisliked) {
        setIsDisliked(false);
        setDislikes(dislikes - 1);
      }
      setIsLiked(true);
      setLikes(likes + 1);
      toast.success("Scammer liked");
    }

    try {
      // Update in local storage and Supabase
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes + 1,
        dislikes: isDisliked ? dislikes - 1 : dislikes,
      });
      
      // Call parent handler if provided
      if (onLikeScammer) {
        onLikeScammer();
      }
    } catch (error) {
      console.error("Error updating likes:", error);
      toast.error("Failed to update likes");
    }
  };

  const handleDislike = async () => {
    if (isDisliked) {
      setIsDisliked(false);
      setDislikes(dislikes - 1);
      toast.info("Dislike removed");
    } else {
      if (isLiked) {
        setIsLiked(false);
        setLikes(likes - 1);
      }
      setIsDisliked(true);
      setDislikes(dislikes + 1);
      toast.success("Scammer disliked");
    }

    try {
      // Update in local storage and Supabase
      await storageService.updateScammerStats(scammer.id, {
        likes: isLiked ? likes - 1 : likes,
        dislikes: isDisliked ? dislikes - 1 : dislikes + 1,
      });
      
      // Call parent handler if provided
      if (onDislikeScammer) {
        onDislikeScammer();
      }
    } catch (error) {
      console.error("Error updating dislikes:", error);
      toast.error("Failed to update dislikes");
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl">{scammer.name}</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Accused of: {scammer.accusedOf}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex-shrink-0 w-full sm:w-1/3 lg:w-1/4">
            <div className="space-y-3">
              <Avatar className="h-32 w-32 mx-auto rounded-lg">
                {!imageError ? (
                  <AvatarImage 
                    src={scammer.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(scammer.name)}&background=random`} 
                    alt={scammer.name} 
                    className="object-cover"
                    onError={handleImageError}
                  />
                ) : (
                  <AvatarFallback className="rounded-lg bg-western-sand text-western-wood">
                    <UserCircle2 className="h-16 w-16" />
                  </AvatarFallback>
                )}
              </Avatar>
              
              {/* Thumbs up/down buttons */}
              <div className="flex justify-center gap-4 mt-3">
                <div className="flex flex-col items-center">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={`h-10 w-10 rounded-full ${isLiked ? 'bg-green-100 border-green-500 text-green-700' : ''}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp className="h-5 w-5" />
                  </Button>
                  <span className="text-sm mt-1">{likes}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button 
                    variant="outline"
                    size="sm"
                    className={`h-10 w-10 rounded-full ${isDisliked ? 'bg-red-100 border-red-500 text-red-700' : ''}`}
                    onClick={handleDislike}
                  >
                    <ThumbsDown className="h-5 w-5" />
                  </Button>
                  <span className="text-sm mt-1">{dislikes}</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 rounded-full border flex items-center justify-center">
                    <View className="h-5 w-5" />
                  </div>
                  <span className="text-sm mt-1">{views}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Details</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex flex-col space-y-1">
                  <dt className="text-muted-foreground">Added on</dt>
                  <dd>{formatDate(scammer.dateAdded)}</dd>
                </div>
                <div className="flex flex-col space-y-1">
                  <dt className="text-muted-foreground">Added by</dt>
                  <dd>
                    {isProfileLoading ? (
                      <span className="text-xs bg-muted px-2 py-1 rounded font-mono animate-pulse">
                        Loading...
                      </span>
                    ) : addedByUsername ? (
                      <Link 
                        to={`/${addedByUsername}`}
                        className="text-xs bg-muted px-2 py-1 rounded font-mono hover:bg-muted/80 transition-colors hover:underline"
                      >
                        {addedByUsername}
                      </Link>
                    ) : scammer.addedBy ? (
                      <span 
                        className="text-xs bg-muted px-2 py-1 rounded font-mono"
                        title="User has no profile"
                      >
                        {scammer.addedBy.slice(0, 6)}...{scammer.addedBy.slice(-4)}
                      </span>
                    ) : (
                      <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                        Anonymous
                      </span>
                    )}
                  </dd>
                </div>
              </dl>
            </div>

            {scammer.aliases && scammer.aliases.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Known Aliases</h3>
                <div className="flex flex-wrap gap-2">
                  {scammer.aliases.map((alias, index) => (
                    <Badge key={index} variant="outline" className="bg-western-sand/10">
                      {alias}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {scammer.accomplices && scammer.accomplices.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Known Accomplices</h3>
                <div className="flex flex-wrap gap-2">
                  {scammer.accomplices.map((accomplice, index) => (
                    <Badge key={index} variant="outline" className="bg-western-sand/10">
                      {accomplice}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {scammer.links && scammer.links.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Associated Links</h3>
                <ul className="space-y-1">
                  {scammer.links.map((link, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                      <a 
                        href={link.startsWith('http') ? link : `https://${link}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm hover:underline truncate max-w-[300px]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {scammer.officialResponse && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Official Response</h3>
            <div className="bg-western-accent/10 border border-western-accent/30 p-4 rounded-md">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-western-accent mt-1 flex-shrink-0" />
                <p className="text-sm">{scammer.officialResponse}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
