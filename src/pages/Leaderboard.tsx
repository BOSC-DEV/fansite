
import React from "react";
import { Header } from "@/components/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { EmptyLeaderboard } from "@/components/leaderboard/EmptyLeaderboard";
import { LeaderboardSkeleton } from "@/components/leaderboard/LeaderboardSkeleton";
import { useLeaderboard } from "@/hooks/useLeaderboard";

const Leaderboard = () => {
  const { leaderboardData, isLoading } = useLeaderboard();

  return (
    <div className="min-h-screen old-paper flex flex-col">
      <Header />
      <main className="flex-grow py-1 md:py-4">
        <div className="container mx-auto max-w-6xl px-4">
          <PageHeader 
            title="Bounty Leaderboard" 
            description="The highest bounty contributions in the network"
          />

          <div className="paper-texture border-2 border-western-wood rounded-sm p-6">
            {isLoading ? (
              <LeaderboardSkeleton />
            ) : leaderboardData && leaderboardData.length > 0 ? (
              <LeaderboardTable leaderboardData={leaderboardData} />
            ) : (
              <EmptyLeaderboard />
            )}
          </div>
        </div>
      </main>
      {/* SiteFooter is now rendered at the App level */}
    </div>
  );
};

export default Leaderboard;
