
import React from "react";
import { Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const LeaderboardTableSkeleton: React.FC = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="border-b border-western-accent/30">
          <TableHead className="w-12 text-center text-western-accent font-wanted">Rank</TableHead>
          <TableHead className="text-left text-western-accent font-wanted">Hunter</TableHead>
          <TableHead className="text-center text-western-accent font-wanted">Socials</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Reports</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Likes</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Views</TableHead>
          <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">Comments</TableHead>
          <TableHead className="text-center text-western-accent font-wanted">Total Bounty</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i} className="border-b border-western-accent/20">
            <TableCell className="text-center">
              <Skeleton className="h-6 w-6 rounded-full mx-auto" />
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-10 mx-auto" />
            </TableCell>
            <TableCell className="text-center hidden md:table-cell">
              <Skeleton className="h-4 w-8 mx-auto" />
            </TableCell>
            <TableCell className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
