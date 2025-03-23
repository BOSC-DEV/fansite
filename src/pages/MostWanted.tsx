
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { NoResults } from "@/components/scammer/NoResults";
import { MostWantedHeader } from "@/components/scammer/MostWantedHeader";
import { SearchAndFilterControls } from "@/components/search/SearchAndFilterControls";
import { useScammers } from "@/hooks/use-scammers";
import { usePagination } from "@/hooks/use-pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency, formatDate } from "@/utils/formatters";

const MostWanted = () => {
  const { 
    filteredScammers, 
    isLoading, 
    searchQuery, 
    sortBy,
    handleSearch,
    handleSortChange
  } = useScammers();
  
  const [viewType, setViewType] = useState<"grid" | "table">("table");
  const isMobile = useIsMobile();
  
  const { 
    currentPage, 
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex
  } = usePagination({
    totalItems: filteredScammers.length,
    viewType: viewType
  });
  
  const paginatedScammers = filteredScammers.slice(startIndex, endIndex);

  // Auto-switch to grid view on mobile
  useEffect(() => {
    if (isMobile && viewType === "table") {
      setViewType("grid");
    }
  }, [isMobile, viewType]);

  const handleViewChange = (view: "grid" | "table") => {
    setViewType(view);
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
            ) : filteredScammers.length === 0 ? (
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
                />
              </div>
            ) : (
              <ScammerGrid
                paginatedScammers={paginatedScammers}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MostWanted;
