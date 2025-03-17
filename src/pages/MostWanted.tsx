
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { Header } from "@/components/Header";
import { MOCK_SCAMMERS, Scammer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ConnectWallet from "@/components/ConnectWallet";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  FileText, 
  Search, 
  FilterX, 
  SortDesc, 
  AlertTriangle, 
  ExternalLink, 
  DollarSign,
  BookOpen, 
  List
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookView } from "@/components/BookView";

const ITEMS_PER_PAGE = 10;

const MostWanted = () => {
  const { isConnected } = useWallet();
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<"recent" | "bounty">("bounty");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"list" | "book">("list");

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

  // Pagination
  const totalPages = Math.ceil(sortedScammers.length / ITEMS_PER_PAGE);
  const paginatedScammers = sortedScammers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const clearSearch = () => {
    setSearchQuery("");
  };

  const toggleSort = () => {
    setSortOption(sortOption === "recent" ? "bounty" : "recent");
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "book" : "list");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const LoadingSkeletons = () => (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="h-16 bg-card border animate-pulse rounded-md"></div>
      ))}
    </div>
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
          </div>

          {!isConnected ? (
            <ConnectWallet 
              message="Connect your wallet to view and interact with the Most Wanted list"
              className="max-w-2xl mx-auto my-12"
            />
          ) : isLoading ? (
            <LoadingSkeletons />
          ) : sortedScammers.length > 0 ? (
            viewMode === "list" ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[60px] text-center">#</TableHead>
                      <TableHead>Scammer</TableHead>
                      <TableHead>Accused Of</TableHead>
                      <TableHead className="text-center">Aliases</TableHead>
                      <TableHead className="text-right">Bounty</TableHead>
                      <TableHead className="text-right">Added</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedScammers.map((scammer, index) => (
                      <TableRow key={scammer.id}>
                        <TableCell className="font-medium text-center">
                          {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
                              <AvatarFallback>{scammer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{scammer.name}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                                {scammer.walletAddress}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-[200px]">
                          <p className="truncate">{scammer.accusedOf}</p>
                        </TableCell>
                        <TableCell className="text-center">
                          {scammer.aliases.length > 0 ? (
                            <div className="flex flex-wrap justify-center gap-1">
                              <Badge variant="outline" className="text-xs">
                                {scammer.aliases[0]}
                                {scammer.aliases.length > 1 && ` +${scammer.aliases.length - 1}`}
                              </Badge>
                            </div>
                          ) : (
                            <span className="text-muted-foreground text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          <div className="flex items-center justify-end">
                            <DollarSign className="h-3.5 w-3.5 text-bosc mr-1" />
                            <span className="text-bosc">{formatCurrency(scammer.bountyAmount)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground text-sm">
                          {formatDate(scammer.dateAdded)}
                        </TableCell>
                        <TableCell>
                          <Button asChild size="sm" variant="ghost">
                            <Link to={`/scammer/${scammer.id}`}>
                              <span className="sr-only">View</span>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                {totalPages > 1 && (
                  <div className="py-4 border-t">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(p => Math.max(1, p - 1));
                            }}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink 
                              href="#" 
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage(i + 1);
                              }}
                              isActive={currentPage === i + 1}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        
                        <PaginationItem>
                          <PaginationNext 
                            href="#" 
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentPage(p => Math.min(totalPages, p + 1));
                            }}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            ) : (
              <BookView 
                scammers={paginatedScammers} 
                currentPage={currentPage}
                totalPages={totalPages}
                onNextPage={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                onPrevPage={() => setCurrentPage(p => Math.max(1, p - 1))}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            )
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
