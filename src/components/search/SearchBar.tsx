
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterX, Search } from "lucide-react";
import { useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import debounce from "lodash/debounce";

export interface SearchBarProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  onSearch, 
  initialQuery = "", 
  placeholder,
  className = ""
}: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const isMobile = useIsMobile();
  
  const defaultPlaceholder = isMobile ? "Search..." : "Search by name or accusation...";
  const searchPlaceholder = placeholder || defaultPlaceholder;

  // Debounced search function to improve performance
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      onSearch(value);
    }, 300),
    [onSearch]
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-hacker-muted z-10" />
      <Input
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={searchPlaceholder}
        className="pl-10 w-full h-10 text-sm bg-hacker-dark border-hacker-border focus:border-hacker-accent focus:ring-1 focus:ring-hacker-accent terminal-text"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-hacker-accent/70 hover:text-hacker-accent hover:bg-hacker-dark/50"
          onClick={clearSearch}
        >
          <FilterX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
