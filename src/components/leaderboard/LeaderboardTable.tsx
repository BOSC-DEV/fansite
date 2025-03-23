
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  isLoading: boolean;
}

export function LeaderboardTable({ users, isLoading }: LeaderboardTableProps) {
  console.log("LeaderboardTable rendering with users:", users);
  
  if (isLoading) {
    return <LeaderboardTableSkeleton />;
  }

  if (!users || users.length === 0) {
    return (
      <div className="text-center p-8">
        <p className="text-western-dark text-lg">No bounty hunters found yet. Be the first to sign up!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-western-light">
            <th className="py-3 px-4 text-left">Hunter</th>
            <th className="py-3 px-4 text-left">Joined</th>
            <th className="py-3 px-4 text-center">Reports</th>
            <th className="py-3 px-4 text-center hidden md:table-cell">Likes</th>
            <th className="py-3 px-4 text-center hidden md:table-cell">Views</th>
            <th className="py-3 px-4 text-center hidden md:table-cell">Comments</th>
            <th className="py-3 px-4 text-center">Bounty</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr 
              key={user.id || index} 
              className="border-b border-western-light hover:bg-western-sand/10 transition-colors"
            >
              <td className="py-3 px-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-western-light">
                    <AvatarImage src={user.profilePicUrl || ''} alt={user.displayName} />
                    <AvatarFallback className="bg-western-sand text-western-dark">
                      {user.displayName?.substring(0, 2).toUpperCase() || "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-western-dark">{user.displayName}</p>
                    <p className="text-sm text-western-dark/70">@{user.username}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4 text-western-dark/70" />
                  <span>{user.createdAt ? format(new Date(user.createdAt), 'MMM d, yyyy') : 'Unknown'}</span>
                </div>
              </td>
              <td className="py-3 px-4 text-center">{user.totalReports}</td>
              <td className="py-3 px-4 text-center hidden md:table-cell">{user.totalLikes}</td>
              <td className="py-3 px-4 text-center hidden md:table-cell">{user.totalViews}</td>
              <td className="py-3 px-4 text-center hidden md:table-cell">{user.totalComments}</td>
              <td className="py-3 px-4 text-center">${user.totalBounty.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LeaderboardTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-3 border-b border-western-light">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-32" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="ml-auto flex space-x-8">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12 hidden md:block" />
            <Skeleton className="h-4 w-12 hidden md:block" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
