
import { SearchBar } from "@/components/search/SearchBar";
import { SortAndViewControls } from "@/components/sort/SortAndViewControls";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface SearchAndFilterControlsProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  viewType: "book" | "table";
  sortBy: "newest" | "oldest" | "bounty";
  handleViewChange: (view: "book" | "table") => void;
  handleSortChange: (sort: "newest" | "oldest" | "bounty") => void;
}

export const SearchAndFilterControls = ({
  searchQuery,
  handleSearch,
  viewType,
  sortBy,
  handleViewChange,
  handleSortChange
}: SearchAndFilterControlsProps) => {
  const isMobile = useIsMobile();

  return (
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
    </div>
  );
};
