
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DollarSign, ExternalLink } from "lucide-react";
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
                {(currentPage - 1) * itemsPerPage + index + 1}
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
                  <span className="text-bosc">{formatCurrency(scammer.bountyAmount)} $BOSC</span>
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
