
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { Header } from "@/components/Header";
import { MOCK_SCAMMERS, Scammer } from "@/lib/types";
import ScammerCard from "@/components/ScammerCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConnectWallet from "@/components/ConnectWallet";
import { FileText, Search, FilterX, SortDesc, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const MostWanted = () => {
  const { isConnected } = useWallet();
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"recent" | "bounty">("bounty");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch scammers
    const fetchScammers = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setScammers(MOCK_SCAMMERS);
      } catch (error) {
        console.error("Error fetching scammers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchScammers();
  }, []);

  const filteredScammers = scammers.filter(scammer => 
    scammer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scammer.accusedOf.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scammer.aliases.some(alias => alias.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedScammers = [...filteredScammers].sort((a, b) => {
    if (sortOption === "recent") {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else {
      return b.bountyAmount - a.bountyAmount;
    }
  });

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleSort = () => {
    setSortOption(sortOption === "recent" ? "bounty" : "recent");
  };

  const LoadingSkeletons = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-card animate-pulse border rounded-lg overflow-hidden h-[300px]">
          <div className="bg-muted w-full h-[180px]"></div>
          <div className="p-4 space-y-3">
            <div className="h-5 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
            <div className="h-8 bg-muted rounded w-full"></div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Most Wanted</h1>
              <p className="text-muted-foreground">Tracking scammers and fraudsters in the crypto space</p>
            </div>
            <Button asChild>
              <Link to="/create-listing" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Report a Scammer
              </Link>
            </Button>
          </div>

          {/* Search and filter controls */}
          <div className="mb-8 flex flex-col sm:flex-row gap-4">
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
            <Button
              variant="outline"
              className="flex-shrink-0"
              onClick={toggleSort}
            >
              <SortDesc className="h-4 w-4 mr-2" />
              Sort by: {sortOption === "recent" ? "Most Recent" : "Highest Bounty"}
            </Button>
          </div>

          {!isConnected ? (
            <ConnectWallet 
              message="Connect your wallet to view and interact with the Most Wanted list"
              className="max-w-2xl mx-auto my-12"
            />
          ) : isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <LoadingSkeletons />
            </div>
          ) : sortedScammers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedScammers.map(scammer => (
                <ScammerCard key={scammer.id} scammer={scammer} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery
                  ? `No scammers matching "${searchQuery}" were found.`
                  : "There are no scammers in the database yet."}
              </p>
              <Button asChild>
                <Link to="/create-listing">
                  <FileText className="h-4 w-4 mr-2" />
                  Report a Scammer
                </Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-bosc">Book of Scams</span>
              <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-medium rounded-full">
                $BOSC
              </span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/most-wanted" className="text-sm text-muted-foreground hover:text-foreground">
                Most Wanted
              </Link>
              <Link to="/create-listing" className="text-sm text-muted-foreground hover:text-foreground">
                Report Scammer
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Book of Scams
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MostWanted;
