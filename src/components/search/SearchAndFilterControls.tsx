
import { SearchBar } from "@/components/search/SearchBar";
import { SortAndViewControls } from "@/components/sort/SortAndViewControls";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Grid, List } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface SearchAndFilterControlsProps {
  searchQuery: string;
  handleSearch: (query: string) => void;
  viewType: "grid" | "table";
  sortBy: "newest" | "oldest" | "bounty";
  handleViewChange: (view: "grid" | "table") => void;
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
        {isMobile ? (
          <div className="flex items-center gap-2 relative">
            <div className="flex-1">
              <SearchBar 
                onSearch={handleSearch} 
                initialQuery={searchQuery}
                placeholder="Search..."
                className="pr-16"
              />
            </div>
            <div className="absolute right-0">
              <ToggleGroup type="single" value={viewType} onValueChange={(value) => value && handleViewChange(value as "grid" | "table")}>
                <ToggleGroupItem value="grid" aria-label="Grid view">
                  <Grid className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="table" aria-label="List view">
                  <List className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        ) : (
          <>
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
          </>
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
