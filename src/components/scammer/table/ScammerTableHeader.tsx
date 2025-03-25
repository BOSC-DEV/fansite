
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Award, Eye, MessageSquare, ThumbsUp, User } from "lucide-react";
import { ScammerSortField, SortDirection } from "@/hooks/useSortableScammers";

interface ScammerTableHeaderProps {
  onSort: (field: ScammerSortField) => void;
  sortField: ScammerSortField;
  sortDirection: SortDirection;
}

export const ScammerTableHeader = ({ onSort, sortField, sortDirection }: ScammerTableHeaderProps) => {
  return (
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
            <Award className="h-4 w-4 mr-1" />
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
  );
};
