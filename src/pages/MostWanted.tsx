
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { BookView } from "@/components/BookView";
import { NoResults } from "@/components/scammer/NoResults";
import { MostWantedHeader } from "@/components/scammer/MostWantedHeader";
import { SearchAndFilterControls } from "@/components/search/SearchAndFilterControls";
import { useScammers } from "@/hooks/use-scammers";
import { usePagination } from "@/hooks/use-pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useSortableScammers } from "@/hooks/useSortableScammers";

const MostWanted = () => {
  const { 
    filteredScammers, 
    isLoading, 
    searchQuery,
    handleSearch
  } = useScammers();
  
  const {
    sortedScammers,
    handleSort,
    sortField,
    sortDirection
  } = useSortableScammers(filteredScammers);
  
  const [viewType, setViewType] = useState<"book" | "table">("book");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "bounty">("newest");
  const isMobile = useIsMobile();
  
  // Sort scammers based on sortBy
  useEffect(() => {
    if (sortBy === "newest") {
      handleSort("dateAdded", "desc");
    } else if (sortBy === "oldest") {
      handleSort("dateAdded", "asc");
    } else if (sortBy === "bounty") {
      handleSort("bountyAmount", "desc");
    }
  }, [sortBy, handleSort]);
  
  const { 
    currentPage, 
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    goToNextPage,
    goToPreviousPage
  } = usePagination({
    totalItems: sortedScammers.length,
    viewType
  });
  
  const paginatedScammers = sortedScammers.slice(startIndex, endIndex);

  // Auto-switch to book view on mobile
  useEffect(() => {
    if (isMobile && viewType === "table") {
      setViewType("book");
    }
  }, [isMobile, viewType]);

  const handleViewChange = (view: "book" | "table") => {
    setViewType(view);
  };

  const handleSortChange = (sort: "newest" | "oldest" | "bounty") => {
    setSortBy(sort);
  };

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <main className="pt-20 md:pt-28 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <MostWantedHeader />
          
          <div className="space-y-4 md:space-y-6">
            <SearchAndFilterControls
              searchQuery={searchQuery}
              handleSearch={handleSearch}
              viewType={viewType}
              sortBy={sortBy}
              handleViewChange={handleViewChange}
              handleSortChange={handleSortChange}
            />

            {isLoading ? (
              <div className="flex justify-center items-center py-10 md:py-20">
                <p className="text-western-wood">Loading scammers...</p>
              </div>
            ) : sortedScammers.length === 0 ? (
              <NoResults query={searchQuery} />
            ) : viewType === "table" && !isMobile ? (
              <div className="paper-texture border-2 border-western-wood rounded-sm">
                <ScammerTable 
                  paginatedScammers={paginatedScammers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  itemsPerPage={endIndex - startIndex}
                  setCurrentPage={setCurrentPage}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                  onSort={handleSort}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </div>
            ) : (
              <BookView
                scammers={sortedScammers}
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={goToNextPage}
                onPrevPage={goToPreviousPage}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MostWanted;
