
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScammers } from "@/hooks/use-scammers";
import { Button } from "@/components/ui/button";
import { ScammerStatsCard } from "@/components/stats/ScammerStatsCard";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Shield, Database } from "lucide-react";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";

export const FeaturedScammers = ({ limit = 3 }: { limit?: number }) => {
  const { filteredScammers, isLoading } = useScammers();
  const [currentPage] = useState(1);
  const isMobile = useIsMobile();
  
  // Get the most recent scammers
  const featuredScammers = filteredScammers
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, limit);

  return (
    <div className="py-12 px-4 bg-hacker-card/30 matrix-pattern relative">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-hacker text-hacker-accent tracking-wide mb-2 neon-glow">
              Featured Scammers
            </h2>
            <p className="text-hacker-text/90 max-w-xl mb-4 md:mb-0 font-mono">
              Explore the latest additions to our registry of known scammers
            </p>
          </div>
          
          <Button asChild size="sm" variant="outline" className="text-hacker-text hover:text-hacker-accent border-hacker-border hover:border-hacker-accent bg-transparent">
            <Link to="/most-wanted" className="flex items-center gap-2">
              View All Scammers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="mb-6">
            <div className="h-32 bg-hacker-dark/50 animate-pulse rounded-sm border border-hacker-border/20"></div>
          </div>
        ) : filteredScammers.length === 0 ? (
          <div className="bg-hacker-card/75 rounded-sm border border-hacker-border/30 p-8 text-center glass-panel">
            <Database className="mx-auto h-12 w-12 text-hacker-text/30 mb-4" />
            <h3 className="text-xl font-hacker text-hacker-text mb-2">Registry is Empty</h3>
            <p className="text-hacker-text/70 mb-4 font-mono">
              No scammers have been added to the registry yet.
            </p>
            <Button asChild variant="outline" className="matrix-button">
              <Link to="/create-listing">Report a Scammer</Link>
            </Button>
          </div>
        ) : (
          <>
            <ScammerStatsCard scammers={filteredScammers} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {featuredScammers.map((scammer, index) => (
                <ScammerCard
                  key={scammer.id}
                  scammer={scammer}
                  rank={index + 1}
                  className="w-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                />
              ))}
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg" className="matrix-button">
            <Link to="/most-wanted">
              View All Scammers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
