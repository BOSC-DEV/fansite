
import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scammer } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { scammerService } from "@/services/storage";
import { useScammers } from "@/hooks/use-scammers";
import { Skeleton } from "@/components/ui/skeleton";
import { ScammerStatsCard } from "@/components/stats/ScammerStatsCard";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useSortableScammers } from "@/hooks/useSortableScammers";

interface FeaturedScammersProps {
  limit?: number;
}

const FeaturedScammersComponent = ({ limit = 6 }: FeaturedScammersProps) => {
  const { isLoading, filteredScammers } = useScammers();
  
  // Use the same sorting hook as the Most Wanted page
  const {
    sortedScammers,
    handleSort,
    sortField,
    sortDirection
  } = useSortableScammers(filteredScammers);
  
  // Take only the first 'limit' scammers for performance
  const limitedScammers = sortedScammers.slice(0, limit);

  return (
    <section className="py-16 bg-western-parchment/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-wanted text-western-accent uppercase tracking-wide">Most Wanted</h2>
            <p className="text-western-wood">Recently added high-profile scammers</p>
          </div>
          <Button asChild variant="ghost" className="gap-1 hover:animate-wiggle border-2 border-dashed border-western-wood/50">
            <Link to="/most-wanted">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        {!isLoading && limitedScammers.length > 0 && (
          <ScammerStatsCard scammers={filteredScammers} className="mb-6" />
        )}
        
        <div className="wanted-poster-border paper-texture rounded-sm p-4">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          ) : limitedScammers.length > 0 ? (
            <ScammerTableCompact 
              scammers={limitedScammers}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No scammers have been reported yet.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/create-listing">Report a Scammer</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const FeaturedScammers = memo(FeaturedScammersComponent);
