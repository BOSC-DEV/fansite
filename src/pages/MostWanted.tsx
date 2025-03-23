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

const MostWanted = () => {
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [filteredScammers, setFilteredScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"grid" | "table">("table");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "bounty">("newest");

  useEffect(() => {
    const loadScammers = () => {
      setIsLoading(true);
      try {
        const storedScammers = storageService.getAllScammers();
        
        const scammersList: Scammer[] = storedScammers.map(s => ({
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
        
        setScammers(scammersList);
        setFilteredScammers(scammersList);
      } catch (error) {
        console.error("Error loading scammers:", error);
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

  const itemsPerPage = viewType === "grid" ? 12 : 10;
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
      <main className="pt-28 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-wanted text-western-accent mb-2">Most Wanted Scammers</h1>
              <p className="text-western-wood max-w-xl">Browse the list of reported scammers in the crypto space</p>
            </div>
            <Button asChild>
              <Link to="/create-listing" className="bg-western-accent hover:bg-western-accent/90 text-western-parchment">
                <Plus className="mr-2 h-4 w-4" />
                Report a Scammer
              </Link>
            </Button>
          </div>
          
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
              <SearchBar 
                onSearch={handleSearch} 
                initialQuery={searchQuery}
              />
              
              <SortAndViewControls
                viewType={viewType}
                sortBy={sortBy}
                onViewChange={handleViewChange}
                onSortChange={handleSortChange}
              />
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <p className="text-western-wood">Loading scammers...</p>
              </div>
            ) : filteredScammers.length === 0 ? (
              <NoResults query={searchQuery} />
            ) : viewType === "table" ? (
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedScammers.map((scammer) => (
                    <ScammerCard
                      key={scammer.id}
                      scammer={scammer}
                    />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center space-x-1">
                        {[...Array(totalPages)].map((_, i) => (
                          <Button
                            key={i}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            className="w-8 h-8 p-0"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
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
