
import React from "react";
import { TableHeader, TableRow, TableHead } from "@/components/ui/table";
import { ChevronDown, ChevronUp, Award } from "lucide-react";

type SortField = 'rank' | 'name' | 'reports' | 'likes' | 'views' | 'comments' | 'bountyGenerated' | 'bountySpent' | 'joined' | 'points';

interface LeaderboardHeaderProps {
  onSort: (field: SortField) => void;
  sortField?: SortField;
  sortDirection?: 'asc' | 'desc';
}

export const LeaderboardHeader: React.FC<LeaderboardHeaderProps> = ({ 
  onSort, 
  sortField = 'points', 
  sortDirection = 'desc' 
}) => {
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1 inline" /> 
      : <ChevronDown className="h-4 w-4 ml-1 inline" />;
  };
  
  const sortableHeader = (field: SortField, label: string) => (
    <button 
      onClick={() => onSort(field)} 
      className="flex items-center font-bold cursor-pointer hover:text-western-accent"
    >
      {label}
      {renderSortIndicator(field)}
    </button>
  );

  return (
    <TableHeader className="bg-western-light-wood/30 sticky top-0 z-10">
      <TableRow>
        <TableHead className="text-center">
          <div className="flex items-center justify-center">
            <Award className="h-4 w-4 mr-1 text-yellow-500" />
            {sortableHeader('points', 'Rank (Points)')}
          </div>
        </TableHead>
        <TableHead>
          <div className="flex items-center">
            {sortableHeader('name', 'User')}
            <span className="ml-2 text-xs text-western-wood/60 hidden md:inline">
              Sort by: name
            </span>
          </div>
        </TableHead>
        <TableHead className="text-center">Links</TableHead>
        <TableHead className="text-center hidden md:table-cell">
          {sortableHeader('reports', 'Reports')}
        </TableHead>
        <TableHead className="text-center hidden md:table-cell">
          {sortableHeader('likes', 'Likes')}
        </TableHead>
        <TableHead className="text-center hidden md:table-cell">
          {sortableHeader('views', 'Views')}
        </TableHead>
        <TableHead className="text-center hidden md:table-cell">
          {sortableHeader('comments', 'Comments')}
        </TableHead>
        <TableHead className="text-center">
          {sortableHeader('bountyGenerated', 'Bounty Generated')}
        </TableHead>
        <TableHead className="text-center">
          {sortableHeader('bountySpent', 'Bounty Spent')}
        </TableHead>
        <TableHead className="text-center">
          {sortableHeader('joined', 'Joined')}
        </TableHead>
      </TableRow>
      <TableRow className="md:hidden">
        <TableHead className="py-1 px-2" colSpan={7}>
          <div className="text-xs text-western-wood/80 italic text-center">
            Swipe to see more details — Tap column headers to sort
          </div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
};
