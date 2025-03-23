
import React from 'react';
import { ScammerAvatar } from './ScammerAvatar';
import { ScammerDetailsSection } from './ScammerDetailsSection';

interface ScammerSidebarProps {
  name: string;
  photoUrl: string;
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  isProfileLoading: boolean;
  formatDate: (date: string) => string;
}

export function ScammerSidebar({
  name,
  photoUrl,
  dateAdded,
  addedBy,
  addedByUsername,
  isProfileLoading,
  formatDate
}: ScammerSidebarProps) {
  return (
    <div className="w-full space-y-6">
      <ScammerAvatar name={name} photoUrl={photoUrl} />
      
      <ScammerDetailsSection 
        dateAdded={dateAdded}
        addedBy={addedBy}
        addedByUsername={addedByUsername}
        isProfileLoading={isProfileLoading}
        formatDate={formatDate}
      />
    </div>
  );
}
