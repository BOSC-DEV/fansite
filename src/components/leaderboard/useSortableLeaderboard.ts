
import { useState, useMemo } from "react";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";

export type SortField = 'totalReports' | 'totalLikes' | 'totalViews' | 'totalComments' | 'totalBounty';
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
