
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BookOpen, List, SortDesc } from "lucide-react";

interface SortAndViewControlsProps {
  sortOption: "recent" | "bounty";
  toggleSort: () => void;
  viewMode: "list" | "book";
  toggleViewMode: () => void;
}

export const SortAndViewControls = ({
  sortOption,
  toggleSort,
  viewMode,
  toggleViewMode
}: SortAndViewControlsProps) => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="outline"
        className="flex-shrink-0"
        onClick={toggleSort}
      >
        <SortDesc className="h-4 w-4 mr-2" />
        Sort by: {sortOption === "recent" ? "Most Recent" : "Highest Bounty"}
      </Button>
      
      <div className="flex items-center space-x-2">
        <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}`} />
        <Switch 
          checked={viewMode === 'book'} 
          onCheckedChange={toggleViewMode} 
          aria-label="Toggle view mode"
        />
        <BookOpen className={`h-4 w-4 ${viewMode === 'book' ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
    </div>
  );
};
