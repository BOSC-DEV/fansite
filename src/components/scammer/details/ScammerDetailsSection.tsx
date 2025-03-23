
import React from 'react';
import { Link } from 'react-router-dom';

interface ScammerDetailsSectionProps {
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  isProfileLoading: boolean;
  formatDate: (date: string) => string;
}

export function ScammerDetailsSection({ dateAdded, addedBy, addedByUsername, isProfileLoading, formatDate }: ScammerDetailsSectionProps) {
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
          </dd>
        </div>
      </dl>
    </div>
  );
}
