
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ScammerTablePaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const ScammerTablePagination = ({ 
  currentPage, 
  totalPages, 
  setCurrentPage 
}: ScammerTablePaginationProps) => {
  return (
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
  );
};
