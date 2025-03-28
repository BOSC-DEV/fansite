
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { BookOpen, List, Scroll, SortDesc } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface SortAndViewControlsProps {
  viewType: "grid" | "table";
  sortBy: "newest" | "oldest" | "bounty";
  onViewChange: (view: "grid" | "table") => void;
  onSortChange: (sort: "newest" | "oldest" | "bounty") => void;
}

export const SortAndViewControls = ({
  viewType,
  sortBy,
  onViewChange,
  onSortChange
}: SortAndViewControlsProps) => {
  const isMobile = useIsMobile();
  
  const toggleViewMode = () => {
    onViewChange(viewType === "table" ? "grid" : "table");
  };

  const handleSortChange = () => {
    const nextSort = sortBy === "newest" ? "bounty" : sortBy === "bounty" ? "oldest" : "newest";
    onSortChange(nextSort);
  };

  const getSortLabel = () => {
    if (isMobile) {
      return sortBy === "newest" ? "Recent" : sortBy === "oldest" ? "Oldest" : "Bounty";
    }
    return sortBy === "newest" ? "Most Recent" : sortBy === "oldest" ? "Oldest First" : "Highest Bounty";
  };

  return (
    <div className="flex items-center gap-4 justify-between w-full">
      <Button
        variant="outline"
        className="flex-shrink-0 text-sm"
        onClick={handleSortChange}
      >
        <SortDesc className="h-4 w-4 mr-2" />
        Sort by: {getSortLabel()}
      </Button>
      
      <div className="flex items-center space-x-2">
        <List className={`h-4 w-4 ${viewType === 'table' ? 'text-primary' : 'text-muted-foreground'}`} />
        <Switch 
          checked={viewType === 'grid'} 
          onCheckedChange={toggleViewMode} 
          aria-label="Toggle view mode"
        />
        <Scroll className={`h-4 w-4 ${viewType === 'grid' ? 'text-primary' : 'text-muted-foreground'}`} />
      </div>
    </div>
  );
};
