
import React, { useState, useMemo } from 'react';
import { SearchBar } from "@/components/search/SearchBar";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

interface DocsSearchProps {
  onSearchResultClick: (elementId: string) => void;
}

export const DocsSearch = ({ onSearchResultClick }: DocsSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Define searchable sections with their IDs and content
  const searchableSections = useMemo(() => [
    { id: "overview", title: "Overview", content: "Fan Site ultimate fan platform creators thrive low fees decentralized user-owned structure censorship resistance" },
    { id: "market-analysis", title: "Market Analysis", content: "creator economy exponential growth projected market size billion creators earnings platforms exploit" },
    { id: "tokenomics", title: "Tokenomics", content: "FAN utility token medium exchange rewarding content creators incentivizing community participation governance decisions" },
    { id: "utility", title: "Utility", content: "wankers need token user owned decentralised app network ownership governance currency tipping purchasing content verification badges" },
    { id: "ranking-badges", title: "Ranking Badges", content: "badge system permissionless verifications loyalty system higher ranks unlock lower fees enhanced features revenue share" },
    { id: "depin", title: "DePIN", content: "decentralised physical infrastructure network shared computing power host transcode deliver content mine globally mobile phone" },
    { id: "technology-stack", title: "Technology Stack", content: "blockchain technology decentralized storage Ethereum IPFS React Node.js Web3.js AI machine learning" },
    { id: "governance", title: "Governance Model", content: "community-driven platform token holders submit proposals vote decisions council elected members transparency" },
    { id: "roadmap", title: "Development Roadmap", content: "platform development testing beta launch community onboarding mainnet token distribution feature expansion partnerships" },
    { id: "risk-analysis", title: "Risk Analysis", content: "market adoption regulatory uncertainty technological hurdles careful planning proactive communication continuous innovation" },
    { id: "legal-compliance", title: "Legal & Compliance", content: "operating compliance applicable laws regulations legal experts transparency security accountability" },
    { id: "conclusion", title: "Conclusion", content: "bold vision future creator economy blockchain technology community-driven governance empowers content creators" }
  ], []);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    return searchableSections.filter(section => 
      section.title.toLowerCase().includes(query) || 
      section.content.toLowerCase().includes(query)
    );
  }, [searchQuery, searchableSections]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.trim().length > 0);
  };

  const handleResultClick = (elementId: string) => {
    onSearchResultClick(elementId);
    setShowResults(false);
    setSearchQuery("");
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  return (
    <div className="relative">
      <SearchBar
        onSearch={handleSearch}
        initialQuery={searchQuery}
        placeholder="Search documentation..."
        className="w-full max-w-md"
      />
      
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          <div className="flex items-center justify-between p-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-700">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="py-2">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors"
                >
                  <div className="font-medium text-gray-900 text-sm">
                    {result.title}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {result.content.substring(0, 100)}...
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No results found for "{searchQuery}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};
