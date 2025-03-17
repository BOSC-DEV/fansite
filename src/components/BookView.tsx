
import { useState, useEffect } from "react";
import { Scammer } from "@/lib/types";
import { BookContainer } from "./book/BookContainer";
import { PageControls } from "./book/PageControls";

interface BookViewProps {
  scammers: Scammer[];
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const BookView = ({
  scammers,
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  formatCurrency,
  formatDate
}: BookViewProps) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [animationKey, setAnimationKey] = useState(0);
  const [visiblePage, setVisiblePage] = useState(currentPage);
  
  // Update the visible page when currentPage changes from parent
  useEffect(() => {
    setVisiblePage(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (isFlipping || currentPage === totalPages) return;
    
    setIsFlipping(true);
    setDirection("right");
    setAnimationKey(prev => prev + 1);
    
    // Trigger the animation first, then update the page
    setTimeout(() => {
      onNextPage();
    }, 400);
  };

  const handlePrevPage = () => {
    if (isFlipping || currentPage === 1) return;
    
    setIsFlipping(true);
    setDirection("left");
    setAnimationKey(prev => prev + 1);
    
    // Trigger the animation first, then update the page
    setTimeout(() => {
      onPrevPage();
    }, 400);
  };

  // Reset flipping state after animation completes
  useEffect(() => {
    if (isFlipping) {
      const timer = setTimeout(() => setIsFlipping(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isFlipping]);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNextPage();
      } else if (e.key === "ArrowLeft") {
        handlePrevPage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPage, isFlipping, totalPages]);

  return (
    <div className="flex flex-col items-center">
      <BookContainer
        scammers={scammers}
        currentPage={currentPage}
        totalPages={totalPages}
        direction={direction}
        animationKey={animationKey}
        visiblePage={visiblePage}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />

      <PageControls
        currentPage={currentPage}
        totalPages={totalPages}
        isFlipping={isFlipping}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
      />
    </div>
  );
};
