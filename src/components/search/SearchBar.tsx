
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterX, Search } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export const SearchBar = ({ onSearch, initialQuery = "" }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const isMobile = useIsMobile();

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className="relative flex-1">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={isMobile ? "Search scammers..." : "Search by name, aliases or accusation..."}
        className="pl-10 w-full h-12 text-base md:h-10 md:text-sm"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 md:h-7 md:w-7"
          onClick={clearSearch}
        >
          <FilterX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
