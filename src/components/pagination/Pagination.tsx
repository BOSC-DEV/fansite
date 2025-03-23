
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { formatNumberRange } from "@/utils/formatters";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, setCurrentPage }: PaginationProps) => {
  const isMobile = useIsMobile();

  const handlePrevious = () => {
    setCurrentPage(Math.max(1, currentPage - 1));
  };

  const handleNext = () => {
    setCurrentPage(Math.min(totalPages, currentPage + 1));
  };

  const renderPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
          onClick={() => setCurrentPage(i + 1)}
        >
          {i + 1}
        </Button>
      ));
    }

    // Complex pagination with ellipses
    const pageNumbers = [];
    
    // Always show first page
    pageNumbers.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </Button>
    );
    
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Show ellipsis if needed before middle pages
    if (startPage > 2) {
      pageNumbers.push(<span key="startEllipsis" className="mx-1">...</span>);
    }
    
    // Middle pages
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </Button>
        );
      }
    }
    
    // Show ellipsis if needed after middle pages
    if (endPage < totalPages - 1) {
      pageNumbers.push(<span key="endEllipsis" className="mx-1">...</span>);
    }
    
    // Always show last page
    if (totalPages > 1) {
      pageNumbers.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </Button>
      );
    }
    
    return pageNumbers;
  };

  return (
    <div className="flex justify-center mt-6 md:mt-8">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        
        <div className="flex items-center space-x-1">
          {renderPageNumbers()}
        </div>
        
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
