
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const usePagination = (
  totalItems: number, 
  viewType: "grid" | "table"
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  
  const itemsPerPage = viewType === "grid" ? (isMobile ? 6 : 12) : 10;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  
  // Reset to page 1 when total items or view type changes
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems, viewType]);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  return {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    totalPages,
    startIndex,
    endIndex
  };
};
