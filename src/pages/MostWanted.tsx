
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/search/SearchBar";
import { SortAndViewControls } from "@/components/sort/SortAndViewControls";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { NoResults } from "@/components/scammer/NoResults";
import { ScammerCard } from "@/components/ScammerCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Scammer } from "@/lib/types";
import { storageService } from "@/services/storage/localStorageService";
import { scammerService } from "@/services/storage/scammerService";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

const MostWanted = () => {
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [filteredScammers, setFilteredScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "table">("table");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "bounty">("newest");
  const isMobile = useIsMobile();

  useEffect(() => {
    const loadScammers = async () => {
      setIsLoading(true);
      try {
        // Try to load from Supabase first
        let supabaseScammers: Scammer[] = [];
        try {
          const supabaseData = await scammerService.getAllScammers();
          supabaseScammers = supabaseData.map(s => ({
            id: s.id,
            name: s.name,
            photoUrl: s.photoUrl,
            accusedOf: s.accusedOf,
            links: s.links,
            aliases: s.aliases,
            accomplices: s.accomplices,
            officialResponse: s.officialResponse,
            bountyAmount: s.bountyAmount,
            walletAddress: s.walletAddress,
            dateAdded: new Date(s.dateAdded),
            addedBy: s.addedBy
          }));
        } catch (err) {
          console.error("Error loading from Supabase:", err);
        }

        // Also load from localStorage as a fallback
        const localScammers = storageService.getAllScammers().map(s => ({
          id: s.id,
          name: s.name,
          photoUrl: s.photoUrl,
          accusedOf: s.accusedOf,
          links: s.links,
          aliases: s.aliases,
          accomplices: s.accomplices,
          officialResponse: s.officialResponse,
          bountyAmount: s.bountyAmount,
          walletAddress: s.walletAddress,
          dateAdded: new Date(s.dateAdded),
          addedBy: s.addedBy
        }));

        // Merge the scammers, preferring Supabase versions but including local-only ones
        const supabaseIds = supabaseScammers.map(s => s.id);
        const uniqueLocalScammers = localScammers.filter(s => !supabaseIds.includes(s.id));
        
        const allScammers = [...supabaseScammers, ...uniqueLocalScammers];
        
        if (allScammers.length === 0) {
          console.log("No scammers found in either Supabase or localStorage");
        } else {
          console.log(`Loaded ${allScammers.length} scammers (${supabaseScammers.length} from Supabase, ${uniqueLocalScammers.length} local-only)`);
        }
        
        setScammers(allScammers);
        setFilteredScammers(allScammers);
      } catch (error) {
        console.error("Error loading scammers:", error);
        toast.error("Failed to load scammers. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    loadScammers();
  }, []);

  useEffect(() => {
    let result = [...scammers];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        scammer => 
          scammer.name.toLowerCase().includes(query) ||
          scammer.accusedOf.toLowerCase().includes(query) ||
          scammer.aliases.some(alias => alias.toLowerCase().includes(query))
      );
    }
    
    result = [...result].sort((a, b) => {
      if (sortBy === "newest") {
        return b.dateAdded.getTime() - a.dateAdded.getTime();
      } else if (sortBy === "oldest") {
        return a.dateAdded.getTime() - b.dateAdded.getTime();
      } else if (sortBy === "bounty") {
        return b.bountyAmount - a.bountyAmount;
      }
      return 0;
    });
    
    setFilteredScammers(result);
    setCurrentPage(1);
  }, [scammers, searchQuery, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sort: "newest" | "oldest" | "bounty") => {
    setSortBy(sort);
  };

  const handleViewChange = (view: "grid" | "table") => {
    setViewType(view);
  };

  // Auto-switch to grid view on mobile
  useEffect(() => {
    if (isMobile && viewType === "table") {
      setViewType("grid");
    }
  }, [isMobile, viewType]);

  const itemsPerPage = viewType === "grid" ? (isMobile ? 6 : 12) : 10;
  const totalPages = Math.max(1, Math.ceil(filteredScammers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedScammers = filteredScammers.slice(startIndex, startIndex + itemsPerPage);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="pt-20 md:pt-28 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-wanted text-western-accent mb-2">Most Wanted Scammers</h1>
              <p className="text-western-wood max-w-xl">Browse the list of reported scammers in the crypto space</p>
            </div>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/create-listing" className="bg-western-accent hover:bg-western-accent/90 text-western-parchment flex items-center justify-center">
                <Plus className="mr-2 h-4 w-4" />
                Report a Scammer
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col gap-4">
              <SearchBar 
                onSearch={handleSearch} 
                initialQuery={searchQuery}
              />
              
              {!isMobile && (
                <SortAndViewControls
                  viewType={viewType}
                  sortBy={sortBy}
                  onViewChange={handleViewChange}
                  onSortChange={handleSortChange}
                />
              )}
              
              {isMobile && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => handleSortChange(
                      sortBy === "newest" ? "bounty" : sortBy === "bounty" ? "oldest" : "newest"
                    )}
                  >
                    Sort by: {sortBy === "newest" ? "Most Recent" : sortBy === "oldest" ? "Oldest First" : "Highest Bounty"}
                  </Button>
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-10 md:py-20">
                <p className="text-western-wood">Loading scammers...</p>
              </div>
            ) : filteredScammers.length === 0 ? (
              <NoResults query={searchQuery} />
            ) : viewType === "table" && !isMobile ? (
              <div className="paper-texture border-2 border-western-wood rounded-sm">
                <ScammerTable 
                  paginatedScammers={paginatedScammers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={itemsPerPage}
                  setCurrentPage={setCurrentPage}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {paginatedScammers.map((scammer) => (
                    <ScammerCard
                      key={scammer.id}
                      scammer={scammer}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-6 md:mt-8">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size={isMobile ? "sm" : "default"}
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {totalPages <= 5 ? (
                          [...Array(totalPages)].map((_, i) => (
                            <Button
                              key={i}
                              variant={currentPage === i + 1 ? "default" : "outline"}
                              className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                              onClick={() => setCurrentPage(i + 1)}
                            >
                              {i + 1}
                            </Button>
                          ))
                        ) : (
                          <>
                            {[...Array(Math.min(3, totalPages))].map((_, i) => (
                              <Button
                                key={i}
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                                onClick={() => setCurrentPage(i + 1)}
                              >
                                {i + 1}
                              </Button>
                            ))}
                            {currentPage > 3 && <span className="mx-1">...</span>}
                            {currentPage > 3 && currentPage < totalPages - 1 && (
                              <Button
                                variant="outline"
                                className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                                onClick={() => setCurrentPage(currentPage)}
                              >
                                {currentPage}
                              </Button>
                            )}
                            {currentPage < totalPages - 2 && <span className="mx-1">...</span>}
                            {totalPages > 3 && (
                              <Button
                                variant={currentPage === totalPages ? "default" : "outline"}
                                className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                                onClick={() => setCurrentPage(totalPages)}
                              >
                                {totalPages}
                              </Button>
                            )}
                          </>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size={isMobile ? "sm" : "default"}
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MostWanted;
