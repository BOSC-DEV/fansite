
import React from 'react';
import { ScammerAvatar } from './ScammerAvatar';
import { ScammerDetailsSection } from './ScammerDetailsSection';

interface ScammerSidebarProps {
  name: string;
  photoUrl: string;
  dateAdded: string;
  addedBy: string;
  addedByUsername: string | null;
  addedByPhotoUrl?: string | null;
  isProfileLoading: boolean;
  profileId: string | null;
  formatDate: (date: string) => string;
}

export function ScammerSidebar({
  name,
  photoUrl,
  dateAdded,
  addedBy,
  addedByUsername,
  addedByPhotoUrl,
  isProfileLoading,
  profileId,
  formatDate
}: ScammerSidebarProps) {
  return (
    <div className="w-full relative">
      <div className="space-y-6">
        <ScammerAvatar name={name} photoUrl={photoUrl} />
        
        <ScammerDetailsSection 
          dateAdded={dateAdded}
          addedBy={addedBy}
          addedByUsername={addedByUsername}
          addedByPhotoUrl={addedByPhotoUrl}
          isProfileLoading={isProfileLoading}
          profileId={profileId}
          formatDate={formatDate}
        />
      </div>
    </div>
  );
}
