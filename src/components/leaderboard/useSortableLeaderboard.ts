
import { useState, useMemo } from 'react';
import type { LeaderboardUser } from '@/services/storage/leaderboardService';

type SortField = 'rank' | 'name' | 'reports' | 'likes' | 'views' | 'comments' | 'bountyGenerated' | 'bountySpent' | 'joined' | 'points';
type SortDirection = 'asc' | 'desc';

interface UseSortableLeaderboardReturn {
  sortedUsers: LeaderboardUser[];
  handleSort: (field: SortField) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  // Add a map to track original ranks based on points
  originalRanks: Map<string, number>;
}

export const useSortableLeaderboard = (users: LeaderboardUser[]): UseSortableLeaderboardReturn => {
  // Default sort by points (descending)
  const [sortField, setSortField] = useState<SortField>('points');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // New field, set to descending by default (most common expectation)
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // First create ranks based on points
  const originalRanks = useMemo(() => {
    const rankMap = new Map<string, number>();
    
    // First, sort users by points in descending order
    const pointsSorted = [...users].sort((a, b) => b.points - a.points);
    
    // Assign ranks based on this initial points sorting
    pointsSorted.forEach((user, index) => {
      rankMap.set(user.id, index + 1);
    });
    
    return rankMap;
  }, [users]);

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'rank':
          // Use the pre-calculated ranks based on points
          comparison = originalRanks.get(a.id)! - originalRanks.get(b.id)!;
          break;
        case 'name':
          comparison = a.displayName.localeCompare(b.displayName);
          break;
        case 'reports':
          comparison = a.totalReports - b.totalReports;
          break;
        case 'likes':
          comparison = a.totalLikes - b.totalLikes;
          break;
        case 'views':
          comparison = a.totalViews - b.totalViews;
          break;
        case 'comments':
          comparison = a.totalComments - b.totalComments;
          break;
        case 'bountyGenerated':
          comparison = a.totalBountyGenerated - b.totalBountyGenerated;
          break;
        case 'bountySpent':
          comparison = a.totalBountySpent - b.totalBountySpent;
          break;
        case 'joined':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'points':
          comparison = a.points - b.points;
          break;
        default:
          comparison = 0;
      }

      // Flip the comparison result for descending order
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [users, sortField, sortDirection, originalRanks]);

  return {
    sortedUsers,
    handleSort,
    sortField,
    sortDirection,
    originalRanks
  };
};
