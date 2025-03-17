
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterX, Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, aliases or accusation..."
        className="pl-10 w-full"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7"
          onClick={clearSearch}
        >
          <FilterX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
