
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
import { Link } from "react-router-dom";
import { ArrowUpDown, Eye, LinkIcon, ThumbsUp, User } from "lucide-react";
import { useScammerProfile } from "@/hooks/useScammerProfile";
import { ScammerSortField, SortDirection } from "@/hooks/useSortableScammers";

interface ScammerTableProps {
  paginatedScammers: Scammer[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  setCurrentPage: (page: number) => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
  onSort: (field: ScammerSortField) => void;
  sortField: ScammerSortField;
  sortDirection: SortDirection;
}

export const ScammerTable = ({
  paginatedScammers,
  currentPage,
  totalPages,
  itemsPerPage,
  setCurrentPage,
  formatCurrency,
  formatDate,
  onSort,
  sortField,
  sortDirection
}: ScammerTableProps) => {
  return (
    <div className="rounded-sm border-western-wood bg-western-parchment/80 overflow-hidden">
      <Table>
        <TableHeader className="bg-western-sand/60 border-b border-western-wood/30">
          <TableRow>
            <TableHead className="w-[60px] text-center text-western-accent font-wanted">№</TableHead>
            <TableHead className="text-western-accent font-wanted">Outlaw</TableHead>
            <TableHead className="text-western-accent font-wanted">Socials</TableHead>
            <TableHead className="text-western-accent font-wanted">Accused Of</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">Aliases</TableHead>
            
            <TableHead 
              className="text-center text-western-accent font-wanted cursor-pointer"
              onClick={() => onSort('bountyAmount')}
            >
              <div className="flex items-center justify-center">
                <span>Bounty</span>
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'bountyAmount' ? 'opacity-100' : 'opacity-50'}`} />
              </div>
            </TableHead>
            
            <TableHead 
              className="text-center text-western-accent font-wanted cursor-pointer"
              onClick={() => onSort('likes')}
            >
              <div className="flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Likes</span>
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'likes' ? 'opacity-100' : 'opacity-50'}`} />
              </div>
            </TableHead>
            
            <TableHead 
              className="text-center text-western-accent font-wanted cursor-pointer"
              onClick={() => onSort('views')}
            >
              <div className="flex items-center justify-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>Views</span>
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'views' ? 'opacity-100' : 'opacity-50'}`} />
              </div>
            </TableHead>
            
            <TableHead 
              className="text-right text-western-accent font-wanted cursor-pointer"
              onClick={() => onSort('dateAdded')}
            >
              <div className="flex items-center justify-end">
                <span>Posted</span>
                <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'dateAdded' ? 'opacity-100' : 'opacity-50'}`} />
              </div>
            </TableHead>
            
            <TableHead className="text-center text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <User className="h-4 w-4 mr-1" />
                <span>By</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedScammers.map((scammer, index) => {
            // Ensure aliases is always an array
            const aliases = Array.isArray(scammer.aliases) ? scammer.aliases : [];
            // Ensure links is always an array
            const links = Array.isArray(scammer.links) ? scammer.links : [];
            
            return (
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
                <TableCell>
                  {links.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      {links.slice(0, 3).map((link, index) => (
                        <a 
                          key={index} 
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-western-sand/20 text-western-wood hover:bg-western-sand/40 transition-colors"
                        >
                          <LinkIcon className="h-4 w-4" />
                        </a>
                      ))}
                      {links.length > 3 && (
                        <Badge variant="outline" className="text-sm bg-western-sand/20 border-western-wood/30 text-western-wood">
                          +{links.length - 3} more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-western-wood/50 text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="truncate">{scammer.accusedOf}</p>
                </TableCell>
                <TableCell className="text-center">
                  {aliases.length > 0 ? (
                    <div className="flex flex-wrap justify-center gap-1">
                      <Badge variant="outline" className="text-sm bg-western-sand/20 border-western-wood/30 text-western-wood">
                        {aliases[0]}
                        {aliases.length > 1 && ` +${aliases.length - 1}`}
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
                <TableCell className="text-center">
                  {scammer.likes || 0}
                </TableCell>
                <TableCell className="text-center">
                  {scammer.views || 0}
                </TableCell>
                <TableCell className="text-right text-western-wood/90 text-sm">
                  {formatDate(scammer.dateAdded)}
                </TableCell>
                <TableCell className="text-center">
                  <UploaderAvatar addedBy={scammer.addedBy} />
                </TableCell>
              </TableRow>
            );
          })}
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

// Helper component to display uploader's avatar with link to their profile
const UploaderAvatar = ({ addedBy }: { addedBy: string | undefined }) => {
  const { addedByUsername, addedByPhotoUrl, profileId } = useScammerProfile(addedBy);
  
  if (!addedBy) return <div className="flex justify-center">-</div>;
  
  const profileUrl = addedByUsername ? `/${addedByUsername}` : `/user/${profileId}`;
  
  return (
    <div className="flex justify-center">
      <Link to={profileUrl}>
        <Avatar className="w-8 h-8 border border-western-wood hover:border-western-accent transition-all">
          <AvatarImage src={addedByPhotoUrl || ''} alt={addedByUsername || addedBy} />
          <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
            {(addedByUsername || addedBy).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};
