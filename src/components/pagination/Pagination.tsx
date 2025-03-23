
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

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

  return (
    <div className="flex justify-center mt-6 md:mt-8">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <div className="flex items-center space-x-1">
          {totalPages <= 5 ? (
            [...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))
          ) : (
            <>
              {[...Array(Math.min(3, totalPages))].map((_, i) => (
                <Button
                  key={i}
                  variant={currentPage === i + 1 ? "default" : "outline"}
                  className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              {currentPage > 3 && <span className="mx-1">...</span>}
              {currentPage > 3 && currentPage < totalPages - 1 && (
                <Button
                  variant="outline"
                  className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                  onClick={() => setCurrentPage(currentPage)}
                >
                  {currentPage}
                </Button>
              )}
              {currentPage < totalPages - 2 && <span className="mx-1">...</span>}
              {totalPages > 3 && (
                <Button
                  variant={currentPage === totalPages ? "default" : "outline"}
                  className={`${isMobile ? 'w-7 h-7' : 'w-8 h-8'} p-0`}
                  onClick={() => setCurrentPage(totalPages)}
                >
                  {totalPages}
                </Button>
              )}
            </>
          )}
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
