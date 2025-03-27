
import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { NoResults } from "@/components/scammer/NoResults";
import { MostWantedHeader } from "@/components/scammer/MostWantedHeader";
import { SearchBar } from "@/components/search/SearchBar";
import { useScammers } from "@/hooks/use-scammers";
import { usePagination } from "@/hooks/use-pagination";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useSortableScammers } from "@/hooks/useSortableScammers";
import { Button } from "@/components/ui/button";
import { List, Grid } from "lucide-react";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";

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
  
  const [viewType, setViewType] = useState<"grid" | "table">("grid");
  const isMobile = useIsMobile();
  
  const { 
    currentPage, 
    setCurrentPage,
    totalPages,
    startIndex,
    endIndex
  } = usePagination({
    totalItems: sortedScammers.length,
    viewType: viewType
  });
  
  const paginatedScammers = sortedScammers.slice(startIndex, endIndex);

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
      <main className="py-4 pb-20">
        <div className="container mx-auto max-w-6xl px-4">
          <MostWantedHeader />
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="w-full md:w-1/2 lg:w-1/3">
                <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
              </div>
              
              {!isMobile && (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-western-wood ${viewType === 'table' ? 'bg-western-wood text-western-parchment' : 'bg-western-parchment text-western-wood'}`}
                    onClick={() => handleViewChange('table')}
                  >
                    <List className="h-4 w-4 mr-1" />
                    Table
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-western-wood ${viewType === 'grid' ? 'bg-western-wood text-western-parchment' : 'bg-western-parchment text-western-wood'}`}
                    onClick={() => handleViewChange('grid')}
                  >
                    <Grid className="h-4 w-4 mr-1" />
                    Grid
                  </Button>
                </div>
              )}
            </div>

            {isLoading ? (
              <ScammerGrid
                paginatedScammers={[]}
                currentPage={1}
                totalPages={1}
                setCurrentPage={() => {}}
                isLoading={true}
              />
            ) : sortedScammers.length === 0 ? (
              <NoResults query={searchQuery} />
            ) : isMobile ? (
              <div className="mt-4">
                <ScammerGrid
                  paginatedScammers={paginatedScammers}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            ) : viewType === "table" ? (
              <div className="w-full">
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
