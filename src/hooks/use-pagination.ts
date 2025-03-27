
import { useState, useEffect, useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface UsePaginationOptions {
  totalItems: number;
  viewType?: "grid" | "table" | "book" | "compact";
  initialPage?: number;
  customItemsPerPage?: number;
}

export const usePagination = ({
  totalItems,
  viewType = "grid",
  initialPage = 1,
  customItemsPerPage
}: UsePaginationOptions) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const isMobile = useIsMobile();
  
  // Determine items per page based on view type and device
  const itemsPerPage = useMemo(() => {
    if (customItemsPerPage) return customItemsPerPage;
    
    if (viewType === "grid") {
      return isMobile ? 6 : 12;
    } else if (viewType === "book") {
      return 1;
    } else if (viewType === "compact") {
      return isMobile ? 5 : 10;
    } else { // table
      return isMobile ? 5 : 10;
    }
  }, [viewType, isMobile, customItemsPerPage]);
  
  const totalPages = useMemo(() => 
    Math.max(1, Math.ceil(totalItems / itemsPerPage)),
  [totalItems, itemsPerPage]);
  
  // Reset to page 1 when total items or view type changes
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems, viewType, customItemsPerPage]);
  
  // Make sure we're not on a page that doesn't exist anymore
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);
  
  const startIndex = useMemo(() => 
    (currentPage - 1) * itemsPerPage,
  [currentPage, itemsPerPage]);
  
  const endIndex = useMemo(() => 
    Math.min(startIndex + itemsPerPage, totalItems),
  [startIndex, itemsPerPage, totalItems]);
  
  const paginatedItems = useMemo(() => 
    (items: any[]) => items.slice(startIndex, endIndex),
  [startIndex, endIndex]);
  
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedItems,
    goToNextPage,
    goToPreviousPage,
    goToPage
  };
};
