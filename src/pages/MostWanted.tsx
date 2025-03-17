
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { Header } from "@/components/Header";
import { MOCK_SCAMMERS, Scammer } from "@/lib/types";
import ConnectWallet from "@/components/ConnectWallet";
import { BookView } from "@/components/BookView";
import { SearchBar } from "@/components/search/SearchBar";
import { SortAndViewControls } from "@/components/sort/SortAndViewControls";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { NoResults } from "@/components/scammer/NoResults";
import { PageHeader } from "@/components/layout/PageHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScammerStatsCard } from "@/components/stats/ScammerStatsCard";
import { FileText } from "lucide-react";

// Change this to 1 for the book view to show one scammer per page
const ITEMS_PER_PAGE = 1;

const MostWanted = () => {
  const { isConnected } = useWallet();
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"recent" | "bounty">("bounty");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "book">("list");

  useEffect(() => {
    // Simulate API call to fetch scammers
    const fetchScammers = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setScammers(MOCK_SCAMMERS);
      } catch (error) {
        console.error("Error fetching scammers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScammers();
  }, []);

  // Reset to page 1 when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, viewMode]);

  const filteredScammers = scammers.filter(scammer => 
    scammer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scammer.accusedOf.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scammer.aliases.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedScammers = [...filteredScammers].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else {
      return b.bountyAmount - a.bountyAmount;
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedScammers.length / ITEMS_PER_PAGE);
  const paginatedScammers = sortedScammers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const toggleSort = () => {
    setSortOption(sortOption === "recent" ? "bounty" : "recent");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "book" : "list");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const LoadingSkeletons = () => (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-16 bg-card border animate-pulse rounded-md"></div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <PageHeader 
            title="Most Wanted"
            description="Tracking scammers and fraudsters in the crypto space"
            actionLink="/create-listing"
            actionLabel="Report a Scammer"
            actionIcon={<FileText className="h-4 w-4 mr-2" />}
          />

          {/* Stats card */}
          {isConnected && !isLoading && sortedScammers.length > 0 && (
            <ScammerStatsCard scammers={sortedScammers} />
          )}

          {/* Search and filter controls */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            <SortAndViewControls 
              sortOption={sortOption}
              toggleSort={toggleSort}
              viewMode={viewMode}
              toggleViewMode={toggleViewMode}
            />
          </div>

          {!isConnected ? (
            <ConnectWallet 
              message="Connect your wallet to view and interact with the Most Wanted list"
              className="max-w-2xl mx-auto my-12"
            />
          ) : isLoading ? (
            <LoadingSkeletons />
          ) : sortedScammers.length > 0 ? (
            viewMode === "list" ? (
              <ScammerTable 
                paginatedScammers={sortedScammers.slice(
                  (currentPage - 1) * 10,  // Keep list view at 10 per page
                  currentPage * 10
                )}
                currentPage={currentPage}
                totalPages={Math.ceil(sortedScammers.length / 10)}  // Keep list view at 10 per page
                itemsPerPage={10}  // Keep list view at 10 per page
                setCurrentPage={setCurrentPage}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            ) : (
              <BookView 
                scammers={paginatedScammers} 
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                onPrevPage={() => setCurrentPage(p => Math.max(1, p - 1))}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            )
          ) : (
            <NoResults searchQuery={searchQuery} />
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default MostWanted;
