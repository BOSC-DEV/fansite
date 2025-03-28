
import React from "react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpDown, Eye, ThumbsUp, User } from "lucide-react";
import { ScammerSortField } from "@/hooks/useSortableScammers";

interface CompactTableHeaderProps {
  isSortable: boolean;
  onSort?: (field: ScammerSortField) => void;
  sortField?: ScammerSortField;
}

export const CompactTableHeader = ({ 
  isSortable, 
  onSort, 
  sortField 
}: CompactTableHeaderProps) => {
  return (
    <TableHeader className="bg-western-sand/60 border-b border-western-wood/30">
      <TableRow>
        <TableHead className="text-western-accent font-wanted">Outlaw</TableHead>
        <TableHead 
          className={`text-center text-western-accent font-wanted ${isSortable ? 'cursor-pointer' : ''}`}
          onClick={() => isSortable && onSort && onSort('bountyAmount')}
        >
          <div className="flex items-center justify-center">
            Bounty
            {isSortable && (
              <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'bountyAmount' ? 'opacity-100' : 'opacity-50'}`} />
            )}
          </div>
        </TableHead>
        <TableHead className="text-western-accent font-wanted">Links</TableHead>
        <TableHead className="text-western-accent font-wanted">Accused Of</TableHead>
        <TableHead 
          className={`text-center text-western-accent font-wanted ${isSortable ? 'cursor-pointer' : ''}`}
          onClick={() => isSortable && onSort && onSort('likes')}
        >
          <div className="flex items-center justify-center">
            <ThumbsUp className="h-4 w-4" />
            {isSortable && (
              <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'likes' ? 'opacity-100' : 'opacity-50'}`} />
            )}
          </div>
        </TableHead>
        <TableHead 
          className={`text-center text-western-accent font-wanted ${isSortable ? 'cursor-pointer' : ''}`}
          onClick={() => isSortable && onSort && onSort('views')}
        >
          <div className="flex items-center justify-center">
            <Eye className="h-4 w-4" />
            {isSortable && (
              <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'views' ? 'opacity-100' : 'opacity-50'}`} />
            )}
          </div>
        </TableHead>
        <TableHead 
          className={`text-right text-western-accent font-wanted ${isSortable ? 'cursor-pointer' : ''}`}
          onClick={() => isSortable && onSort && onSort('dateAdded')}
        >
          <div className="flex items-center justify-end">
            Posted
            {isSortable && (
              <ArrowUpDown className={`ml-1 h-4 w-4 ${sortField === 'dateAdded' ? 'opacity-100' : 'opacity-50'}`} />
            )}
          </div>
        </TableHead>
        <TableHead className="text-center text-western-accent font-wanted">
          <div className="flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
