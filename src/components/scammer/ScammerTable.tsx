
import { Scammer } from "@/lib/types";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface ScammerTableProps {
  paginatedScammers: Scammer[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const ScammerTable = ({
  paginatedScammers,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  formatCurrency,
  formatDate
}: ScammerTableProps) => {
  return (
    <div className="rounded-sm border-western-wood bg-western-parchment/80 overflow-hidden">
      <Table>
        <TableHeader className="bg-western-sand/60 border-b border-western-wood/30">
          <TableRow>
            <TableHead className="w-[60px] text-center text-western-accent font-wanted">№</TableHead>
            <TableHead className="text-western-accent font-wanted">Outlaw</TableHead>
            <TableHead className="text-western-accent font-wanted">Crimes</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">Aliases</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">Bounty</TableHead>
            <TableHead className="text-right text-western-accent font-wanted">Posted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedScammers.map((scammer, index) => (
            <TableRow key={scammer.id} className="border-b border-western-wood/20 hover:bg-western-sand/10">
              <TableCell className="font-medium text-center">
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <Link to={`/scammer/${scammer.id}`}>
                  <div className="flex items-center space-x-3">
                    <Avatar className="border-2 border-western-wood">
                      <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
                      <AvatarFallback className="bg-western-wood text-western-parchment">{scammer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium font-western">{scammer.name}</div>
                      <div className="text-xs text-western-wood/70 truncate max-w-[150px] hidden md:block">
                        {scammer.walletAddress}
                      </div>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="max-w-[200px]">
                <p className="truncate">{scammer.accusedOf}</p>
              </TableCell>
              <TableCell className="text-center">
                {scammer.aliases.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-1">
                    <Badge variant="outline" className="text-sm bg-western-sand/20 border-western-wood/30 text-western-wood">
                      {scammer.aliases[0]}
                      {scammer.aliases.length > 1 && ` +${scammer.aliases.length - 1}`}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-western-wood/50 text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-center font-medium">
                <div className="flex items-center justify-center">
                  <span className="text-western-accent font-wanted">{formatCurrency(scammer.bountyAmount)} $BOSC</span>
                </div>
              </TableCell>
              <TableCell className="text-right text-western-wood/90 text-sm">
                {formatDate(scammer.dateAdded)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {totalPages > 1 && (
        <div className="py-4 border-t border-western-wood/20 bg-western-sand/20">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(Math.max(1, currentPage - 1));
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
                    className={currentPage === i + 1 ? "bg-western-wood text-western-parchment" : "hover:bg-western-sand/30"}
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
                    setCurrentPage(Math.min(totalPages, currentPage + 1));
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
