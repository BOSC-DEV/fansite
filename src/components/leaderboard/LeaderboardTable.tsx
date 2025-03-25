
import React from "react";
import { 
  Table, 
  TableBody
} from "@/components/ui/table";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";
import { LeaderboardHeader } from "./LeaderboardHeader";
import { LeaderboardRow } from "./LeaderboardRow";
import { LeaderboardTableSkeleton } from "./LeaderboardSkeleton";
import { EmptyLeaderboard } from "./EmptyLeaderboard";
import { useSortableLeaderboard } from "./useSortableLeaderboard";

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  isLoading: boolean;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ users, isLoading }) => {
  const { sortedUsers, handleSort } = useSortableLeaderboard(users);

  if (isLoading) {
    return <LeaderboardTableSkeleton />;
  }

  if (users.length === 0) {
    return <EmptyLeaderboard />;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <LeaderboardHeader onSort={handleSort} />
        <TableBody>
          {sortedUsers.map((user) => {
            const originalIndex = users.findIndex(u => u.id === user.id);
            return <LeaderboardRow key={user.id} user={user} originalIndex={originalIndex} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};
