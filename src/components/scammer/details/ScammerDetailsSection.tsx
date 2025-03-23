
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { formatWalletAddress } from "@/utils/formatters";
import { storageService } from "@/services/storage";

interface ScammerDetailsSectionProps {
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  isProfileLoading: boolean;
  formatDate: (date: string) => string;
}

export function ScammerDetailsSection({ 
  dateAdded, 
  addedBy, 
  addedByUsername, 
  isProfileLoading, 
  formatDate 
}: ScammerDetailsSectionProps) {
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (!addedBy || isProfileLoading) return;
      
      try {
        const profile = await storageService.getProfile(addedBy);
        if (profile && profile.profilePicUrl) {
          setProfilePicUrl(profile.profilePicUrl);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
        setImageError(true);
      }
    };

    fetchProfilePic();
  }, [addedBy, isProfileLoading]);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex items-center justify-between mt-3 border-t pt-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Added on {formatDate(dateAdded)}</span>
        <span className="text-sm text-muted-foreground mx-1">•</span>
        <span className="text-sm text-muted-foreground mr-2">by</span>
        {isProfileLoading ? (
          <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
        ) : (
          addedBy ? (
            <Link to={`/user/${addedBy}`} className="hover:opacity-80 transition-opacity">
              <Avatar className="h-6 w-6" title={addedByUsername || formatWalletAddress(addedBy)}>
                {!imageError && profilePicUrl ? (
                  <AvatarImage 
                    src={profilePicUrl} 
                    alt={addedByUsername || "User"} 
                    onError={handleImageError}
                    className="object-cover"
                  />
                ) : addedByUsername ? (
                  <AvatarImage 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(addedByUsername)}&background=random`} 
                    alt={addedByUsername} 
                  />
                ) : (
                  <AvatarImage 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(addedBy.slice(0, 2))}&background=random`} 
                    alt="User" 
                  />
                )}
                <AvatarFallback className="text-xs bg-muted">
                  {addedByUsername ? addedByUsername.slice(0, 2).toUpperCase() : addedBy.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs bg-muted">
                <UserCircle2 className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          )
        )}
      </div>
    </div>
  );
}
