
import { Scammer } from "@/lib/types";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Pagination } from "@/components/pagination/Pagination";
import { Skeleton } from "@/components/ui/skeleton";

interface ScammerGridProps {
  paginatedScammers: Scammer[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isLoading?: boolean;
}

export const ScammerGrid = ({
  paginatedScammers,
  currentPage,
  totalPages,
  setCurrentPage,
  isLoading = false
}: ScammerGridProps) => {
  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Skeleton key={index} className="aspect-[16/9] w-full h-64" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedScammers.map((scammer, index) => {
          // Calculate absolute position for rank
          const absolutePosition = (currentPage - 1) * paginatedScammers.length + index + 1;
          
          return (
            <ScammerCard
              key={scammer.id}
              scammer={scammer}
              rank={absolutePosition}
            />
          );
        })}
      </div>
      
      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};
