
import React, { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Trophy } from "lucide-react";
import { leaderboardService } from "@/services/storage/leaderboardService";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";

const ITEMS_PER_PAGE = 50;

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [allUsers, setAllUsers] = useState<LeaderboardUser[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeaderboardData = useCallback(async (isInitial = true) => {
    try {
      if (isInitial) {
        setIsLoading(true);
      }
      
      const users = await leaderboardService.getLeaderboardUsers();
      setAllUsers(users);
      
      // For the initial load, show the first 50 users
      const displayUsers = users.slice(0, ITEMS_PER_PAGE * page);
      setLeaderboardUsers(displayUsers);
      
      // Determine if there are more users to load
      setHasMore(users.length > displayUsers.length);
    } catch (err) {
      console.error("Error fetching leaderboard data:", err);
      setError("Failed to load leaderboard data. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  // Initial data load
  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const loadMoreUsers = useCallback(() => {
    if (!hasMore || isLoading) return;
    
    const nextPage = page + 1;
    setPage(nextPage);
    
    const moreUsers = allUsers.slice(0, ITEMS_PER_PAGE * nextPage);
    setLeaderboardUsers(moreUsers);
    setHasMore(allUsers.length > moreUsers.length);
  }, [allUsers, hasMore, isLoading, page]);

  return (
    <div className="min-h-screen flex flex-col bg-western-dark paper-texture">
      <Header />
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-20">
        <div className="mt-8 mb-12">
          <PageHeader
            title="Leaderboards"
            description="The leaderboard will be ordered by total bounty generated once the bounty payment system is live. In the meantime, it's organised chronologically."
            actionIcon={<Trophy className="h-5 w-5 mr-1" />}
          />
        </div>

        {error ? (
          <div className="p-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="wanted-poster-border paper-texture p-6 rounded-sm">
            <LeaderboardTable 
              users={leaderboardUsers} 
              isLoading={isLoading} 
              hasMore={hasMore}
              loadMore={loadMoreUsers}
            />
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
