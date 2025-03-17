
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
    <div className="flex justify-center mt-6 space-x-8">
      <Button
        variant="outline"
        size="lg"
        onClick={onPrevPage}
        disabled={currentPage === 1 || isFlipping}
        className="shadow-md hover:shadow-lg transition-transform hover:-translate-x-1"
      >
        <ChevronLeft className="mr-2 h-5 w-5" />
        Previous Page
      </Button>
      
      <Button
        variant="outline"
        size="lg"
        onClick={onNextPage}
        disabled={currentPage === totalPages || isFlipping}
        className="shadow-md hover:shadow-lg transition-transform hover:translate-x-1"
      >
        Next Page
        <ChevronRight className="ml-2 h-5 w-5" />
      </Button>
    </div>
  );
};
