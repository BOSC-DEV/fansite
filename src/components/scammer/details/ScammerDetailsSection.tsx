
import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, User } from 'lucide-react';

interface ScammerDetailsSectionProps {
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  isProfileLoading: boolean;
  formatDate: (date: string) => string;
}

export function ScammerDetailsSection({ dateAdded, addedBy, addedByUsername, isProfileLoading, formatDate }: ScammerDetailsSectionProps) {
  return (
    <div className="text-xs space-y-1">
      <div className="flex items-center gap-1">
        <CalendarDays className="h-3 w-3 text-muted-foreground" />
        <span>{formatDate(dateAdded)}</span>
      </div>
      <div className="flex items-center gap-1">
        <User className="h-3 w-3 text-muted-foreground" />
        {isProfileLoading ? (
          <span className="text-xs bg-muted px-1 py-0.5 rounded font-mono animate-pulse">
            Loading...
          </span>
        ) : addedByUsername ? (
          <Link 
            to={`/${addedByUsername}`}
            className="text-xs bg-muted px-1 py-0.5 rounded font-mono hover:bg-muted/80 transition-colors hover:underline"
          >
            {addedByUsername}
          </Link>
        ) : addedBy ? (
          <span 
            className="text-xs bg-muted px-1 py-0.5 rounded font-mono"
            title="User has no profile"
          >
            {addedBy.slice(0, 6)}...{addedBy.slice(-4)}
          </span>
        ) : (
          <span className="text-xs bg-muted px-1 py-0.5 rounded font-mono">
            Anonymous
          </span>
        )}
      </div>
    </div>
  );
}
