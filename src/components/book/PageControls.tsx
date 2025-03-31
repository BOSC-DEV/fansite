
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  return (
    <div className="flex justify-center mt-6 mb-10 space-x-8 sm:space-x-12">
      <Button
        variant="outline"
        size="lg"
        onClick={onPrevPage}
        disabled={currentPage === 1 || isFlipping}
        className="shadow-md hover:shadow-lg transition-all hover:-translate-x-1 border-2 border-[#d1c7b7] dark:border-[#2d2841] bg-[#f8f5f0] dark:bg-[#252136] text-foreground"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        Previous Page
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={onNextPage}
        disabled={currentPage === totalPages || isFlipping}
        className="shadow-md hover:shadow-lg transition-all hover:translate-x-1 border-2 border-[#d1c7b7] dark:border-[#2d2841] bg-[#f8f5f0] dark:bg-[#252136] text-foreground"
      >
        Next Page
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
