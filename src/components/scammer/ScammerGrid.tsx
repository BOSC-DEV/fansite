
import { Scammer } from "@/lib/types";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Pagination } from "@/components/pagination/Pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

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
  // Debug output for grid rendering
  useEffect(() => {
    if (!isLoading) {
      console.log(`ScammerGrid: Rendering ${paginatedScammers.length} scammers on page ${currentPage}`);
      paginatedScammers.forEach(scammer => {
        console.log(`Grid scammer: ${scammer.name}, photoUrl: ${Boolean(scammer.photoUrl)}`);
      });
    }
  }, [paginatedScammers, currentPage, isLoading]);

  if (isLoading) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {[1, 2, 3, 4, 5, 6].map((_, index) => (
            <Card key={index} className="overflow-hidden border-western-wood bg-western-parchment/80 w-full">
              <div className="aspect-square relative">
                <Skeleton className="w-full h-full absolute inset-0" />
              </div>
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-8 w-full mt-4" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }
  
  // Handle case where there are no scammers to display
  if (paginatedScammers.length === 0) {
    return (
      <div className="w-full">
        <Card className="p-6 text-center">
          <p className="text-western-wood">No scammers to display</p>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {paginatedScammers.map((scammer, index) => {
          // Calculate absolute position for rank
          const absolutePosition = (currentPage - 1) * paginatedScammers.length + index + 1;
          
          return (
            <ScammerCard
              key={scammer.id || index}
              scammer={scammer}
              rank={absolutePosition}
              className="w-full"
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
