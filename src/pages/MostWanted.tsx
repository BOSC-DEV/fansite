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
import { Grid, Scroll, RefreshCw } from "lucide-react";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";

const MostWanted = () => {
  const { 
    filteredScammers, 
    isLoading, 
    searchQuery,
    handleSearch,
    refreshScammers
  } = useScammers();
  
  const {
    sortedScammers,
    handleSort,
    sortField,
    sortDirection
  } = useSortableScammers(filteredScammers);
  
  const [viewType, setViewType] = useState<"grid" | "table" | "compact">("grid");
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
    refreshScammers();
  }, [refreshScammers]);

  useEffect(() => {
    if (!isMobile && viewType === "compact") {
      setViewType("grid");
    }
  }, [isMobile, viewType]);

  const handleViewChange = (view: "grid" | "table" | "compact") => {
    setViewType(view);
  };

  const handleRefresh = () => {
    refreshScammers();
    toast.success("Refreshed scammer listings");
  };

  return (
    <div className="min-h-screen old-paper flex flex-col">
      <Header />
      <main className="py-1 md:py-4 pb-20 flex-grow">
        <div className="container mx-auto max-w-6xl px-4">
          <MostWantedHeader />
          
          <div className="space-y-4 md:space-y-6">
            <div className="flex items-center gap-2">
              <div className={isMobile ? "flex-1 max-w-[75%]" : "flex-1 max-w-[90%]"}>
                <SearchBar 
                  onSearch={handleSearch} 
                  initialQuery={searchQuery} 
                  placeholder="Search for scammer..." 
                />
              </div>
              
              {isMobile ? (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-western-wood bg-western-parchment text-western-wood"
                    onClick={handleRefresh}
                    title="Refresh listings"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && handleViewChange(value as "grid" | "table" | "compact")}>
                    <ToggleGroupItem value="compact" aria-label="List view">
                      <Scroll className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="grid" aria-label="Grid view">
                      <Grid className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-western-wood bg-western-parchment text-western-wood"
                    onClick={handleRefresh}
                    title="Refresh listings"
                  >
                    <RefreshCw className="h-4 w-4 mr-1" />
                    Refresh
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-western-wood ${viewType === 'table' ? 'bg-western-wood text-western-parchment' : 'bg-western-parchment text-western-wood'}`}
                    onClick={() => handleViewChange('table')}
                  >
                    <Scroll className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`border-western-wood ${viewType === 'grid' ? 'bg-western-wood text-western-parchment' : 'bg-western-parchment text-western-wood'}`}
                    onClick={() => handleViewChange('grid')}
                  >
                    <Grid className="h-4 w-4" />
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
                {viewType === "grid" ? (
                  <ScammerGrid
                    paginatedScammers={paginatedScammers}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                ) : (
                  <ScammerTableCompact
                    scammers={paginatedScammers}
                    formatCurrency={formatCurrency}
                    formatDate={formatDate}
                    onSort={handleSort}
                    sortField={sortField}
                    sortDirection={sortDirection}
                  />
                )}
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
      {/* SiteFooter is now rendered at the App level */}
    </div>
  );
};

export default MostWanted;
