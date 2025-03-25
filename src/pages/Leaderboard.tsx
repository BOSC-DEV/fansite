
import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { Trophy } from "lucide-react";
import { leaderboardService } from "@/services/storage/leaderboardService";
import type { LeaderboardUser } from "@/services/storage/leaderboardService";

export default function Leaderboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboardUsers, setLeaderboardUsers] = useState<LeaderboardUser[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);
        const users = await leaderboardService.getLeaderboardUsers();
        setLeaderboardUsers(users);
      } catch (err) {
        console.error("Error fetching leaderboard data:", err);
        setError("Failed to load leaderboard data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

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
            <LeaderboardTable users={leaderboardUsers} isLoading={isLoading} />
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
