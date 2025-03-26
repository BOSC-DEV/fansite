
import { useState, useMemo } from "react";
import type { Scammer } from "@/lib/types";

export type ScammerSortField = 'dateAdded' | 'likes' | 'views' | 'bountyAmount';
export type SortDirection = 'asc' | 'desc';

export const useSortableScammers = (scammers: Scammer[]) => {
  const [sortField, setSortField] = useState<ScammerSortField>('dateAdded');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: ScammerSortField, direction?: SortDirection) => {
    if (sortField === field && !direction) {
      // Toggle direction if same field clicked and no direction specified
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field
      setSortField(field);
      // Set direction if provided, otherwise default to descending
      setSortDirection(direction || 'desc');
    }
  };

  const sortedScammers = useMemo(() => {
    const scammersCopy = [...scammers];
    
    scammersCopy.sort((a, b) => {
      // Special handling for date objects
      if (sortField === 'dateAdded') {
        const dateA = new Date(a.dateAdded).getTime();
        const dateB = new Date(b.dateAdded).getTime();
        return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
      }
      
      // For numerical values
      const valueA = a[sortField] || 0;
      const valueB = b[sortField] || 0;
      
      return sortDirection === 'asc' 
        ? (valueA as number) - (valueB as number)
        : (valueB as number) - (valueA as number);
    });
    
    return scammersCopy;
  }, [scammers, sortField, sortDirection]);

  return {
    sortedScammers,
    handleSort,
    sortField,
    sortDirection
  };
};
