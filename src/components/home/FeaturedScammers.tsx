import { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scammer } from "@/lib/types";
import { ArrowRight, Grid, List } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { scammerService } from "@/services/storage";
import { useScammers } from "@/hooks/use-scammers";
import { Skeleton } from "@/components/ui/skeleton";
import { ScammerStatsCard } from "@/components/stats/ScammerStatsCard";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useSortableScammers } from "@/hooks/useSortableScammers";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface FeaturedScammersProps {
  limit?: number;
}

const FeaturedScammersComponent = ({ limit = 3 }: FeaturedScammersProps) => {
  const { isLoading, filteredScammers } = useScammers();
  const isMobile = useIsMobile();
  const [viewType, setViewType] = useState<"grid" | "compact">("grid");
  
  const {
    sortedScammers,
    handleSort,
    sortField,
    sortDirection
  } = useSortableScammers(filteredScammers);
  
  const limitedScammers = sortedScammers.slice(0, limit);
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 1;

  useEffect(() => {
    if (!isLoading && limitedScammers.length > 0) {
      console.log("FeaturedScammers - Scammers to display:", limitedScammers);
    }
  }, [isLoading, limitedScammers]);

  return (
    <section className="py-16 bg-western-parchment/30 w-full">
      <div className="container mx-auto max-w-6xl px-4 w-full">
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
        
        {!isLoading && filteredScammers.length > 0 && (
          <ScammerStatsCard scammers={filteredScammers} className="mb-6" />
        )}
        
        {isMobile && limitedScammers.length > 0 && (
          <div className="flex items-center w-full mb-4">
            <div className="flex-1">
              <SearchBar onSearch={() => {}} initialQuery="" placeholder="Search..." />
            </div>
            <div className="ml-2">
              <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && setViewType(value as "grid" | "compact")}>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="compact" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        )}
        
        <div className="w-full pb-12 sm:pb-0">
          {isLoading ? (
            <ScammerGrid
              paginatedScammers={[]}
              currentPage={1}
              totalPages={1}
              setCurrentPage={() => {}}
              isLoading={true}
            />
          ) : limitedScammers.length > 0 ? (
            isMobile && viewType === "compact" ? (
              <ScammerTableCompact
                scammers={limitedScammers}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                onSort={handleSort}
                sortField={sortField}
                sortDirection={sortDirection}
              />
            ) : (
              <ScammerGrid 
                paginatedScammers={limitedScammers}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )
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

import { SearchBar } from "@/components/search/SearchBar";

export const FeaturedScammers = memo(FeaturedScammersComponent);
