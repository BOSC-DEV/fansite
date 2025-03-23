
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";
import { storageService } from "@/services/storage";
import { ScammerSidebar } from './details/ScammerSidebar';
import { ScammerContent } from './details/ScammerContent';
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";

interface ScammerDetailsCardProps {
  scammer: Scammer;
  bountyAmount?: number;
  imageLoaded?: boolean;
  setImageLoaded?: React.Dispatch<React.SetStateAction<boolean>>;
  formatDate?: (date: string) => string;
  scammerStats?: {
    likes: number;
    dislikes: number;
    views: number;
  };
  onLikeScammer?: () => void;
  onDislikeScammer?: () => void;
}

export function ScammerDetailsCard({ 
  scammer, 
  imageLoaded, 
  setImageLoaded, 
  formatDate = (date) => new Date(date).toLocaleDateString(),
  scammerStats, 
  onLikeScammer, 
  onDislikeScammer 
}: ScammerDetailsCardProps) {
  const { address } = useWallet();
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [likes, setLikes] = useState(scammer.likes || 0);
  const [dislikes, setDislikes] = useState(scammer.dislikes || 0);
  const [views, setViews] = useState(scammer.views || 0);
  const [addedByUsername, setAddedByUsername] = useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const isCreator = scammer.addedBy === address;

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

  return (
    <Card className="overflow-hidden bg-white/80 backdrop-blur-sm shadow-lg border-western-wood/20">
      <CardHeader className="border-b border-western-wood/10 bg-gradient-to-r from-western-parchment to-western-sand/30">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-western text-western-accent">{scammer.name}</CardTitle>
            <CardDescription className="text-western-wood text-lg mt-1">
              Accused of: {scammer.accusedOf}
            </CardDescription>
          </div>
          {isCreator && (
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-4 border-western-accent/50 hover:bg-western-accent/10"
              asChild
            >
              <Link to={`/edit-listing/${scammer.id}`}>
                <Edit className="h-4 w-4 mr-1" />
                Edit Listing
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-2/5 p-6">
            <ScammerSidebar
              name={scammer.name}
              photoUrl={scammer.photoUrl}
              dateAdded={scammer.dateAdded.toString()}
              addedBy={scammer.addedBy}
              addedByUsername={addedByUsername}
              isProfileLoading={isProfileLoading}
              likes={likes}
              dislikes={dislikes}
              views={views}
              isLiked={isLiked}
              isDisliked={isDisliked}
              onLike={handleLike}
              onDislike={handleDislike}
              formatDate={formatDate}
            />
          </div>
          
          <div className="md:w-3/5 border-t md:border-t-0 md:border-l border-western-wood/10 p-6 bg-gradient-to-br from-transparent to-western-sand/20">
            <ScammerContent 
              aliases={scammer.aliases}
              links={scammer.links}
              accomplices={scammer.accomplices}
              officialResponse={scammer.officialResponse}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
