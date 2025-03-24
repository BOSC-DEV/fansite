
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

interface ScammerDetailsSectionProps {
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  addedByPhotoUrl?: string | null;
  isProfileLoading: boolean;
  profileId: string | null;
  formatDate: (date: string) => string;
}

export function ScammerDetailsSection({
  dateAdded,
  addedBy,
  addedByUsername,
  addedByPhotoUrl,
  isProfileLoading,
  profileId,
  formatDate
}: ScammerDetailsSectionProps) {
  const formattedDate = formatDate(dateAdded);
  
  // Determine profile URL
  const profileUrl = addedByUsername 
    ? `/${addedByUsername}` 
    : profileId 
      ? `/user/${profileId}` 
      : "#";
      
  // Display name prioritizes username, only fallback to wallet address if necessary
  const displayName = addedByUsername || "Unknown";

  return (
    <div className="p-4 border border-western-wood/20 rounded-md bg-western-sand/10">
      <h3 className="text-lg font-semibold mb-3">Details</h3>
      
      <div className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground">Added on</p>
          <p className="font-medium">{formattedDate}</p>
        </div>
        
        <div>
          <p className="text-sm text-muted-foreground">Added by</p>
          {isProfileLoading ? (
            <div className="flex items-center gap-2 mt-1">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ) : (
            <Link to={profileUrl} className="flex items-center gap-2 mt-1 hover:underline">
              <Avatar className="h-8 w-8">
                <AvatarImage src={addedByPhotoUrl || undefined} alt={displayName} />
                <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
                  {displayName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium truncate max-w-[180px]">{displayName}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
