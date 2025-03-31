
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface PageControlsProps {
  currentPage: number;
  totalPages: number;
  isFlipping: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export const PageControls = ({
  currentPage,
  totalPages,
  isFlipping,
  onPrevPage,
  onNextPage
}: PageControlsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex justify-center mt-6 ${isMobile ? 'mb-28' : 'mb-10'} space-x-4 sm:space-x-12`}>
      <Button
        variant="outline"
        size={isMobile ? "sm" : "lg"}
        onClick={onPrevPage}
        disabled={currentPage === 1 || isFlipping}
        className="shadow-md hover:shadow-lg transition-all hover:-translate-x-1 border-2 border-[#d1c7b7] dark:border-[#2d2841] bg-[#f8f5f0] dark:bg-[#252136] text-foreground"
      >
        <ChevronLeft className={`${isMobile ? 'mr-1 h-4 w-4' : 'mr-2 h-5 w-5'}`} />
        {isMobile ? "Prev" : "Previous Page"}
      </Button>
      
      <Button
        variant="outline"
        size={isMobile ? "sm" : "lg"}
        onClick={onNextPage}
        disabled={currentPage === totalPages || isFlipping}
        className="shadow-md hover:shadow-lg transition-all hover:translate-x-1 border-2 border-[#d1c7b7] dark:border-[#2d2841] bg-[#f8f5f0] dark:bg-[#252136] text-foreground"
      >
        {isMobile ? "Next" : "Next Page"}
        <ChevronRight className={`${isMobile ? 'ml-1 h-4 w-4' : 'ml-2 h-5 w-5'}`} />
      </Button>
    </div>
  );
};
