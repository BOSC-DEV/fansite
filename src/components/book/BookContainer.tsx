
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen } from "lucide-react";
import { BookPage } from "./BookPage";
import { Scammer } from "@/lib/types";

interface BookContainerProps {
  scammers: Scammer[];
  currentPage: number;
  totalPages: number;
  direction: "left" | "right";
  animationKey: number;
  visiblePage: number;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const BookContainer = ({
  scammers,
  currentPage,
  totalPages,
  direction,
  animationKey,
  visiblePage,
  formatCurrency,
  formatDate
}: BookContainerProps) => {
  const [displayedScammerIndex, setDisplayedScammerIndex] = useState(0);
  
  // Get the current scammer to display
  const currentScammer = scammers.length > 0 
    ? scammers[displayedScammerIndex] 
    : null;
  
  // Update the displayed scammer index when the page changes
  useEffect(() => {
    if (scammers.length > 0) {
      // Since we're showing one scammer per page, the displayedScammerIndex is always 0
      // because the pagination already gives us the correct scammer for this page
      setDisplayedScammerIndex(0);
    }
  }, [currentPage, scammers]);

  return (
    <div className="relative w-full max-w-4xl h-[600px] perspective-1000">
      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey}
          className="w-full h-full"
          initial={{
            rotateY: direction === "right" ? -90 : 90,
            opacity: 0.5,
            transformOrigin: direction === "right" ? "left" : "right"
          }}
          animate={{
            rotateY: 0,
            opacity: 1
          }}
          exit={{
            rotateY: direction === "right" ? 90 : -90,
            opacity: 0.5,
            transformOrigin: direction === "right" ? "right" : "left"
          }}
          transition={{
            type: "tween",
            duration: 0.6,
            ease: "easeInOut"
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            {/* Book cover with page effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-muted to-background border-2 border-muted shadow-lg rounded-md"></div>
            
            {/* Book spine */}
            <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-meme-red to-muted transform -skew-y-12 origin-top"></div>
            
            {/* Book page fold effect */}
            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-muted transform -translate-y-2 translate-x-2 rotate-6 opacity-50"></div>
            
            {/* Page content */}
            <div className="absolute inset-0 p-8 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <div className="meme-text text-2xl text-accent">Most Wanted</div>
                <div className="flex items-center text-muted-foreground">
                  <BookOpen className="w-5 h-5 mr-2" />
                  <span>Page {visiblePage} of {totalPages}</span>
                </div>
              </div>
              
              <div className="flex-1 flex items-center justify-center">
                <BookPage 
                  scammer={currentScammer}
                  pageNumber={visiblePage}
                  totalPages={totalPages}
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
