
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
    <div className="w-full">
      <div className="md:w-full w-full mx-auto">
        <ScammerAvatar name={name} photoUrl={photoUrl} />
      </div>
      
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
