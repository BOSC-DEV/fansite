
import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircle2 } from "lucide-react";
import { formatWalletAddress } from "@/utils/formatters";

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
  return (
    <div className="flex items-center justify-between mt-3 border-t pt-3">
      <div className="text-sm text-muted-foreground">
        Added on {formatDate(dateAdded)}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">by</span>
        {isProfileLoading ? (
          <div className="h-6 w-6 rounded-full bg-muted animate-pulse" />
        ) : (
          addedByUsername ? (
            <Link to={`/${addedByUsername}`} className="hover:opacity-80 transition-opacity">
              <Avatar className="h-6 w-6">
                <AvatarImage 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(addedByUsername)}&background=random`} 
                  alt={addedByUsername} 
                />
                <AvatarFallback className="text-xs">
                  {addedByUsername.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : addedBy ? (
            <Avatar className="h-6 w-6" title={formatWalletAddress(addedBy)}>
              <AvatarImage 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(addedBy.slice(0, 2))}&background=random`} 
                alt="Anonymous" 
              />
              <AvatarFallback className="text-xs bg-muted">
                {addedBy.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
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
