
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

  const handleNextPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setDirection("right");
    onNextPage();
  };

  const handlePrevPage = () => {
    if (isFlipping) return;
    setIsFlipping(true);
    setDirection("left");
    onPrevPage();
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
            key={currentPage}
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
              
              {/* Page content */}
              <div className="absolute inset-0 p-8 flex flex-col">
                <div className="flex justify-between items-center mb-6">
                  <div className="meme-text text-2xl text-accent">Most Wanted</div>
                  <div className="flex items-center text-muted-foreground">
                    <BookOpen className="w-5 h-5 mr-2" />
                    <span>Page {currentPage} of {totalPages}</span>
                  </div>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  {scammers.length > 0 ? (
                    <div className="space-y-4">
                      {scammers.map((scammer, index) => (
                        <div 
                          key={scammer.id} 
                          className="meme-card bg-card p-4 flex justify-between items-center"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="font-impact text-meme-purple text-2xl">
                              #{(currentPage - 1) * 10 + index + 1}
                            </div>
                            <Avatar className="h-14 w-14 border-2 border-meme-blue">
                              <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
                              <AvatarFallback className="bg-meme-red text-white font-impact">
                                {scammer.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-impact text-xl">{scammer.name}</h3>
                              <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {scammer.walletAddress}
                              </div>
                              <div className="flex space-x-2 mt-1">
                                {scammer.aliases.length > 0 && (
                                  <Badge variant="outline" className="text-xs">
                                    {scammer.aliases[0]}
                                    {scammer.aliases.length > 1 && ` +${scammer.aliases.length - 1}`}
                                  </Badge>
                                )}
                                <span className="text-xs text-muted-foreground">
                                  {formatDate(scammer.dateAdded)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-end space-y-2">
                            <div className="text-right">
                              <div className="font-bold flex items-center justify-end">
                                <DollarSign className="h-4 w-4 text-meme-green mr-1" />
                                <span className="text-meme-green">{formatCurrency(scammer.bountyAmount)}</span>
                              </div>
                              <div className="text-sm text-muted-foreground line-clamp-1 max-w-[250px]">
                                {scammer.accusedOf}
                              </div>
                            </div>
                            <Button asChild size="sm" variant="outline" className="w-8 h-8 p-0">
                              <Link to={`/scammer/${scammer.id}`}>
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-muted-foreground text-lg">No scammers on this page</p>
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
