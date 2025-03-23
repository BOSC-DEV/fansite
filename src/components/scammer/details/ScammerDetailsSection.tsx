
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2 } from "lucide-react";

interface ScammerDetailsSectionProps {
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  addedByPhotoUrl?: string | null;
  isProfileLoading: boolean;
  formatDate: (date: string) => string;
}

export function ScammerDetailsSection({ 
  dateAdded, 
  addedBy, 
  addedByUsername, 
  addedByPhotoUrl, 
  isProfileLoading, 
  formatDate 
}: ScammerDetailsSectionProps) {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="pt-4 space-y-2">
      <h3 className="text-lg font-semibold mb-2">Details</h3>
      <dl className="space-y-2 text-sm">
        <div className="flex flex-col space-y-1">
          <dt className="text-muted-foreground">Added on</dt>
          <dd>{formatDate(dateAdded)}</dd>
        </div>
        <div className="flex flex-col space-y-1">
          <dt className="text-muted-foreground">Added by</dt>
          <dd className="flex items-center">
            {isProfileLoading ? (
              <span className="text-xs bg-muted px-2 py-1 rounded font-mono animate-pulse">
                Loading...
              </span>
            ) : addedByUsername ? (
              <Link 
                to={`/${addedByUsername}`}
                className="flex items-center gap-2 hover:underline"
              >
                <Avatar className="h-6 w-6">
                  {!imageError && addedByPhotoUrl ? (
                    <AvatarImage 
                      src={addedByPhotoUrl} 
                      alt={addedByUsername}
                      onError={handleImageError}
                    />
                  ) : (
                    <AvatarFallback className="bg-western-sand text-western-wood text-xs">
                      {addedByUsername.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
                <span className="text-xs bg-muted px-2 py-1 rounded font-mono hover:bg-muted/80 transition-colors">
                  {addedByUsername}
                </span>
              </Link>
            ) : addedBy ? (
              <span 
                className="flex items-center gap-2"
                title="User has no profile"
              >
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-western-sand text-western-wood">
                    <User2 className="h-3 w-3" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  {addedBy.slice(0, 6)}...{addedBy.slice(-4)}
                </span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarFallback className="bg-western-sand text-western-wood">
                    <User2 className="h-3 w-3" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
                  Anonymous
                </span>
              </span>
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
