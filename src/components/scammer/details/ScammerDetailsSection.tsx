
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarIcon, UserIcon } from 'lucide-react';

interface ScammerDetailsSectionProps {
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  isProfileLoading: boolean;
  formatDate: (date: string) => string;
}

export function ScammerDetailsSection({ dateAdded, addedBy, addedByUsername, isProfileLoading, formatDate }: ScammerDetailsSectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <span>{formatDate(dateAdded)}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm">
        <UserIcon className="h-4 w-4 text-muted-foreground" />
        <span>
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
          ) : addedBy ? (
            <span 
              className="text-xs bg-muted px-2 py-1 rounded font-mono"
              title="User has no profile"
            >
              {addedBy.slice(0, 6)}...{addedBy.slice(-4)}
            </span>
          ) : (
            <span className="text-xs bg-muted px-2 py-1 rounded font-mono">
              Anonymous
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
