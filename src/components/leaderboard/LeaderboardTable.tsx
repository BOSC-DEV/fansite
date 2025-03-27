
import React, { useState, useRef, useCallback, useEffect } from "react";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";

interface LeaderboardTableProps {
  users: LeaderboardUser[];
  isLoading: boolean;
  hasMore?: boolean;
  loadMore?: () => void;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ 
  users, 
  isLoading, 
  hasMore = false, 
  loadMore = () => {} 
}) => {
  const { sortedUsers, handleSort, sortField, sortDirection, originalRanks } = useSortableLeaderboard(users);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();
  
  const lastUserElementRef = useCallback((node: HTMLTableRowElement | null) => {
    if (isLoading || isLoadingMore) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, isLoadingMore, hasMore, loadMore]);

  // Reset loading more state when new data comes in
  useEffect(() => {
    setIsLoadingMore(false);
  }, [users]);

  if (isLoading && users.length === 0) {
    return <LeaderboardTableSkeleton />;
  }

  if (users.length === 0) {
    return <EmptyLeaderboard />;
  }

  return (
    <div className="overflow-x-auto paper-texture">
      {isMobile ? (
        <div className="w-full pb-4">
          <ScrollArea orientation="horizontal" className="w-full">
            <div className="min-w-[800px]">
              <Table>
                <LeaderboardHeader onSort={handleSort} sortField={sortField} sortDirection={sortDirection} />
                <TableBody className="divide-y divide-western-wood/20">
                  {sortedUsers.map((user, index) => {
                    const userRank = originalRanks.get(user.id) || index + 1;
                    
                    if (index === sortedUsers.length - 1) {
                      return (
                        <LeaderboardRow 
                          ref={lastUserElementRef}
                          key={user.id} 
                          user={user} 
                          rank={userRank}
                        />
                      );
                    } else {
                      return (
                        <LeaderboardRow 
                          key={user.id} 
                          user={user} 
                          rank={userRank}
                        />
                      );
                    }
                  })}
                </TableBody>
              </Table>
            </div>
          </ScrollArea>
          <div className="text-center py-3 text-xs text-western-wood/70">
            Swipe sideways to see more details
          </div>
        </div>
      ) : (
        <ScrollArea orientation="vertical" className="max-h-[80vh]" type="auto">
          <div>
            <Table className="w-full">
              <LeaderboardHeader onSort={handleSort} sortField={sortField} sortDirection={sortDirection} />
              <TableBody className="divide-y divide-western-wood/20">
                {sortedUsers.map((user, index) => {
                  // Use the original rank from our map
                  const userRank = originalRanks.get(user.id) || index + 1;
                  
                  if (index === sortedUsers.length - 1) {
                    return (
                      <LeaderboardRow 
                        ref={lastUserElementRef}
                        key={user.id} 
                        user={user} 
                        rank={userRank}
                      />
                    );
                  } else {
                    return (
                      <LeaderboardRow 
                        key={user.id} 
                        user={user} 
                        rank={userRank}
                      />
                    );
                  }
                })}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      )}
      
      {(isLoadingMore || (isLoading && users.length > 0)) && (
        <div className="py-4 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-western-accent" />
        </div>
      )}
    </div>
  );
};
