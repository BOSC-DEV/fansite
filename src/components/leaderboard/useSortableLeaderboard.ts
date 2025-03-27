
import { useState, useMemo } from "react";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";

export type SortField = 'totalReports' | 'totalLikes' | 'totalViews' | 'totalComments' | 'totalBountyGenerated' | 'totalBountySpent' | 'joinedDuration';
export type SortDirection = 'asc' | 'desc';

export const useSortableLeaderboard = (users: LeaderboardUser[]) => {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

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

  const sortedUsers = useMemo(() => {
    const usersCopy = [...users];
    if (sortField) {
      usersCopy.sort((a, b) => {
        // Special case for joinedDuration sorting
        if (sortField === 'joinedDuration') {
          const dateA = new Date(a.createdAt);
          const dateB = new Date(b.createdAt);
          
          // For ascending, older accounts first (smaller value = longer duration)
          if (sortDirection === 'asc') {
            return dateA.getTime() - dateB.getTime();
          }
          // For descending, newer accounts first (larger value = shorter duration)
          return dateB.getTime() - dateA.getTime();
        }
        
        // For all other fields
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
    return usersCopy;
  }, [users, sortField, sortDirection]);

  return {
    sortedUsers,
    handleSort,
    sortField,
    sortDirection
  };
};
