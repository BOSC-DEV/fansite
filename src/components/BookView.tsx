
import { useState, useEffect } from "react";
import { Scammer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DollarSign, BookOpen, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  const [displayedScammerIndex, setDisplayedScammerIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(currentPage);
  
  // Get the current scammer to display (one per page)
  const currentScammer = scammers.length > 0 ? scammers[displayedScammerIndex] : null;

  const handleNextPage = () => {
    if (isFlipping || currentPage === totalPages) return;
    setIsFlipping(true);
    setDirection("right");
    setAnimationKey(prev => prev + 1);
    
    // Delay the actual page change until animation is in progress
    setTimeout(() => {
      onNextPage();
    }, 300); // Half the animation duration for a more natural feel
  };

  const handlePrevPage = () => {
    if (isFlipping || currentPage === 1) return;
    setIsFlipping(true);
    setDirection("left");
    setAnimationKey(prev => prev - 1);
    
    // Delay the actual page change until animation is in progress
    setTimeout(() => {
      onPrevPage();
    }, 300); // Half the animation duration for a more natural feel
  };

  // Reset flipping state after animation completes
  useEffect(() => {
    if (isFlipping) {
      const timer = setTimeout(() => setIsFlipping(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isFlipping]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-4xl h-[600px] perspective-1000">
        <AnimatePresence initial={false} mode="wait">
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
              type: "spring",
              damping: 20,
              stiffness: 100,
              duration: 0.8
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
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  {currentScammer ? (
                    <div className="meme-card w-full max-w-2xl p-8 flex flex-col items-center bg-card">
                      <div className="text-center mb-6">
                        <div className="font-impact text-meme-purple text-4xl mb-2">
                          #{currentPage}
                        </div>
                        <Avatar className="h-32 w-32 border-4 border-meme-blue mx-auto mb-4">
                          <AvatarImage src={currentScammer.photoUrl} alt={currentScammer.name} />
                          <AvatarFallback className="bg-meme-red text-white font-impact text-4xl">
                            {currentScammer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <h2 className="font-impact text-3xl mb-1">{currentScammer.name}</h2>
                        <div className="text-sm text-muted-foreground break-all max-w-xs mx-auto mb-2">
                          {currentScammer.walletAddress}
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {currentScammer.aliases.map((alias, i) => (
                            <Badge key={i} variant="outline">
                              {alias}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="w-full mb-6">
                        <div className="font-bold flex items-center justify-center mb-2">
                          <DollarSign className="h-6 w-6 text-meme-green mr-1" />
                          <span className="text-meme-green text-2xl">{formatCurrency(currentScammer.bountyAmount)}</span>
                        </div>
                        <div className="text-center p-4 bg-muted/50 rounded-lg">
                          <h3 className="text-lg font-semibold mb-2">Accused Of:</h3>
                          <p>{currentScammer.accusedOf}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center w-full">
                        <div className="text-sm text-muted-foreground">
                          Added on {formatDate(currentScammer.dateAdded)}
                        </div>
                        <Button asChild>
                          <Link to={`/scammer/${currentScammer.id}`} className="flex items-center">
                            View Details
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-muted-foreground text-xl">No scammer found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Page controls */}
      <div className="flex justify-center mt-6 space-x-8">
        <Button
          variant="outline"
          size="lg"
          onClick={handlePrevPage}
          disabled={currentPage === 1 || isFlipping}
          className="shadow-md hover:shadow-lg transition-transform hover:-translate-x-1"
        >
          <ChevronLeft className="mr-2 h-5 w-5" />
          Previous Page
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || isFlipping}
          className="shadow-md hover:shadow-lg transition-transform hover:translate-x-1"
        >
          Next Page
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
