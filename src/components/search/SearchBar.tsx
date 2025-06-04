
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FilterX, Search } from "lucide-react";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    onSearch("");
  };

  return (
    <div className={`relative w-full ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={searchPlaceholder}
        className="pl-10 w-full h-10 text-sm bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:ring-gray-200"
      />
      {searchQuery && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-gray-600 hover:bg-gray-50"
          onClick={clearSearch}
        >
          <FilterX className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
