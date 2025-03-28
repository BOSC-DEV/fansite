
import React from 'react';
import { Link } from "react-router-dom";
import { CalendarIcon, UserRound } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ScammerAvatar } from './ScammerAvatar';
import { ScammerInteractionButtons } from './ScammerInteractionButtons';

interface ScammerSidebarProps {
  name: string;
  photoUrl: string;
  dateAdded: string;
  addedBy: string;
  addedByUsername?: string;
  addedByPhotoUrl?: string;
  isProfileLoading?: boolean;
  profileId?: string;
  formatDate?: (date: string) => string;
  scammerStats?: {
    likes: number;
    dislikes: number;
    views: number;
    shares: number;
    comments?: number;
  };
  isLiked?: boolean;
  isDisliked?: boolean;
  onLike?: () => void;
  onDislike?: () => void;
  scammerId?: string;
}

export function ScammerSidebar({
  name,
  photoUrl,
  dateAdded,
  addedBy,
  addedByUsername = "Anonymous",
  addedByPhotoUrl,
  isProfileLoading = false,
  profileId,
  formatDate = (date) => new Date(date).toLocaleDateString(),
  scammerStats,
  isLiked = false,
  isDisliked = false,
  onLike,
  onDislike,
  scammerId
}: ScammerSidebarProps) {
  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        <div className="w-full sm:w-auto max-w-[250px]">
          <ScammerAvatar 
            name={name}
            photoUrl={photoUrl}
          />
          
          {/* Interaction buttons below the image */}
          {scammerStats && scammerId && onLike && onDislike && (
            <div className="w-full">
              <ScammerInteractionButtons
                scammerId={scammerId}
                likes={scammerStats.likes}
                dislikes={scammerStats.dislikes}
                views={scammerStats.views}
                shares={scammerStats.shares}
                comments={scammerStats.comments}
                isLiked={isLiked}
                isDisliked={isDisliked}
                onLike={onLike}
                onDislike={onDislike}
                className="justify-center mt-2"
              />
            </div>
          )}
        </div>
        
        <div className="rounded-lg border bg-western-parchment p-4 w-full">
          <h3 className="font-semibold text-western-wood mb-3">Listing Info</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-western-wood/70" />
              <div className="text-sm">
                <span className="block text-western-wood/70">Added on</span>
                <span className="font-medium text-western-wood">{formatDate(dateAdded)}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-western-wood/70" />
              <div className="text-sm">
                <span className="block text-western-wood/70">Added by</span>
                {isProfileLoading ? (
                  <Skeleton className="h-5 w-24" />
                ) : profileId ? (
                  <Link 
                    to={`/profile/${profileId}`} 
                    className="font-medium text-western-accent hover:underline"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar className="h-4 w-4">
                        <AvatarImage src={addedByPhotoUrl} alt={addedByUsername} />
                        <AvatarFallback className="text-[10px]">
                          {addedByUsername?.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span>{addedByUsername}</span>
                    </div>
                  </Link>
                ) : (
                  <span className="font-medium text-western-wood">{addedByUsername}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
