
import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";
import { Trophy, Award, Medal, ArrowUpDown, Twitter, Globe } from "lucide-react";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";
import { Button } from "@/components/ui/button";
import { ProfileLinks } from "@/components/profile/ProfileLinks";

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  isLoading: boolean;
}

type SortField = 'totalReports' | 'totalLikes' | 'totalViews' | 'totalComments';
type SortDirection = 'asc' | 'desc';

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, isLoading }) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  if (isLoading) {
    return <LeaderboardTableSkeleton />;
  }

  if (users.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-western-sand">No bounty hunters have signed up yet. Be the first!</p>
      </div>
    );
  }

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 1:
        return <Award className="h-6 w-6 text-gray-300" />;
      case 2:
        return <Medal className="h-6 w-6 text-amber-700" />;
      default:
        return <span className="font-bold text-western-parchment/70">{index + 1}</span>;
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field clicked
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and default to descending
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedUsers = [...users];
  if (sortField) {
    sortedUsers.sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      // For ascending, smaller numbers first
      if (sortDirection === 'asc') {
        return (valueA as number) - (valueB as number);
      }
      // For descending, larger numbers first
      return (valueB as number) - (valueA as number);
    });
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-western-accent/30">
            <TableHead className="w-12 text-center text-western-accent font-wanted">Rank</TableHead>
            <TableHead className="text-left text-western-accent font-wanted">Hunter</TableHead>
            <TableHead 
              className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
              onClick={() => handleSort('totalReports')}
            >
              <div className="flex items-center justify-center">
                Reports
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
              onClick={() => handleSort('totalLikes')}
            >
              <div className="flex items-center justify-center">
                Likes
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
              onClick={() => handleSort('totalViews')}
            >
              <div className="flex items-center justify-center">
                Views
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-center hidden md:table-cell text-western-accent font-wanted cursor-pointer"
              onClick={() => handleSort('totalComments')}
            >
              <div className="flex items-center justify-center">
                Comments
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center text-western-accent font-wanted">Socials</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">Total Bounty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUsers.map((user, index) => {
            const originalIndex = users.findIndex(u => u.id === user.id);
            
            return (
              <TableRow key={user.id} className="border-b border-western-accent/20 hover:bg-western-parchment/10">
                <TableCell className="text-center">
                  {getRankIcon(originalIndex)}
                </TableCell>
                <TableCell>
                  <Link to={`/${user.username}`} className="flex items-center space-x-3 hover:text-western-accent">
                    <Avatar className="h-10 w-10 border border-western-accent/20">
                      <AvatarImage src={user.profilePicUrl} alt={user.displayName} />
                      <AvatarFallback className="bg-western-wood text-western-parchment">
                        {user.displayName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium font-western">{user.displayName}</p>
                      <p className="text-xs text-western-parchment/70">@{user.username}</p>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">{user.totalReports}</TableCell>
                <TableCell className="text-center hidden md:table-cell">{user.totalLikes}</TableCell>
                <TableCell className="text-center hidden md:table-cell">{user.totalViews}</TableCell>
                <TableCell className="text-center hidden md:table-cell">{user.totalComments}</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <ProfileLinks xLink={user.xLink} websiteLink={user.websiteLink} />
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold text-western-accent">
                  {formatCurrency(user.totalBounty)} BOSC
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const LeaderboardTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-western-accent/30">
          <TableHead className="w-12 text-center text-western-accent font-wanted">Rank</TableHead>
          <TableHead className="text-left text-western-accent font-wanted">Hunter</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Reports</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Likes</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Views</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Comments</TableHead>
          <TableHead className="text-center text-western-accent font-wanted">Socials</TableHead>
          <TableHead className="text-center text-western-accent font-wanted">Total Bounty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i} className="border-b border-western-accent/20">
            <TableCell className="text-center">
              <Skeleton className="h-6 w-6 rounded-full mx-auto" />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-10 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
