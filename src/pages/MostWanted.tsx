
import React from "react";
import { Helmet } from "react-helmet-async";
import { MostWantedHeader } from "@/components/scammer/MostWantedHeader";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { ScammerTable } from "@/components/scammer/ScammerTable";
import { NoResults } from "@/components/scammer/NoResults";
import { useScammers } from "@/hooks/use-scammers";
import { usePagination } from "@/hooks/use-pagination";
import { formatCurrency, formatDate } from "@/utils/formatters";
import { useSortableScammers } from "@/hooks/useSortableScammers";
import { Button } from "@/components/ui/button";
import { Grid, Scroll, Table } from "lucide-react";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { SearchBar } from "@/components/search/SearchBar";

const MostWanted = () => {
  const isMobile = useIsMobile();
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
  
  const [viewType, setViewType] = React.useState<"grid" | "table" | "compact">("grid");
  
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

  React.useEffect(() => {
    // Only reset to grid if on desktop
    if (!isMobile && viewType === "compact") {
      setViewType("grid");
    }
  }, [isMobile, viewType]);

  const handleViewChange = (view: "grid" | "table" | "compact") => {
    setViewType(view);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Most Wanted Scammers | BOSC</title>
        <meta
          name="description"
          content="Most wanted scammers in the blockchain space. Report and track scammers to protect the community."
        />
      </Helmet>
      
      <div className="container mx-auto px-4 max-w-6xl flex-grow">
        <MostWantedHeader />
        
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-2">
            <div className={isMobile ? "flex-1 max-w-[85%]" : "flex-1 max-w-[90%]"}>
              <SearchBar 
                onSearch={handleSearch} 
                initialQuery={searchQuery}
                placeholder="Search for scammer..."
                className={isMobile ? "pr-16" : ""}
              />
            </div>
            
            {isMobile ? (
              <div className="absolute right-6">
                <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && handleViewChange(value as "grid" | "compact")}>
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

      {!isMobile && <SiteFooter />}
    </div>
  );
};

export default MostWanted;
