
import React from "react";
import { Header } from "@/components/Header";
import { PageHeader } from "@/components/layout/PageHeader";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { EmptyLeaderboard } from "@/components/leaderboard/EmptyLeaderboard";
import { LeaderboardTableSkeleton } from "@/components/leaderboard/LeaderboardSkeleton";
import { useLeaderboard } from "@/hooks/useLeaderboard";
import { ScammerStatsCard } from "@/components/stats/ScammerStatsCard";
import { useScammers } from "@/hooks/use-scammers";

const Leaderboard = () => {
  const { leaderboardData, isLoading } = useLeaderboard();
  const { scammers } = useScammers();

  return (
    <div className="min-h-screen old-paper flex flex-col">
      <Header />
      <main className="flex-grow py-1 md:py-4 mt-16 md:mt-24">
        <div className="container mx-auto max-w-6xl px-4">
          <PageHeader 
            title="Bounty Leaderboard" 
            description="The highest bounty contributions and most active users in the network"
          />

          {/* Stats card showing overall network stats */}
          {scammers.length > 0 && (
            <ScammerStatsCard scammers={scammers} className="mb-6" />
          )}

          <div className="paper-texture border-2 border-western-wood rounded-sm p-6">
            {isLoading ? (
              <LeaderboardTableSkeleton />
            ) : leaderboardData && leaderboardData.length > 0 ? (
              <LeaderboardTable 
                users={leaderboardData} 
                isLoading={false} 
              />
            ) : (
              <EmptyLeaderboard />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Leaderboard;
