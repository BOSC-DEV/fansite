
import React from "react";

export function ProfileSkeleton() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="animate-pulse space-y-6">
        <div className="flex items-center space-x-4">
          <div className="rounded-full bg-western-sand h-20 w-20"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-western-sand rounded w-1/4"></div>
            <div className="h-4 bg-western-sand rounded w-1/2"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-western-sand/20 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
