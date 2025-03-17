
import { useState, useEffect } from "react";
import { Scammer } from "@/lib/types";
import { BookContainer } from "./book/BookContainer";
import { PageControls } from "./book/PageControls";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { PlusCircle, DollarSign } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";

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
  const [bountyAmount, setBountyAmount] = useState<string>("");
  const [isAddingBounty, setIsAddingBounty] = useState(false);
  const { isConnected } = useWallet();
  
  // Update the scammer array with the new bounty amount
  const [localScammers, setLocalScammers] = useState<Scammer[]>(scammers);
  
  // Update localScammers when props change
  useEffect(() => {
    setLocalScammers(scammers);
  }, [scammers]);
  
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

  // Handle adding bounty
  const handleAddBounty = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet to add a bounty");
      return;
    }
    
    const amount = Number(bountyAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    setIsAddingBounty(true);
    
    // Simulate transaction processing
    setTimeout(() => {
      // Get the current scammer
      const currentScammer = localScammers[currentPage - 1];
      
      // Create a new array with updated bounty
      const updatedScammers = localScammers.map((scammer, index) => {
        if (index === currentPage - 1) {
          return {
            ...scammer,
            bountyAmount: scammer.bountyAmount + amount
          };
        }
        return scammer;
      });
      
      setLocalScammers(updatedScammers);
      setBountyAmount("");
      setIsAddingBounty(false);
      
      toast.success(`Added ${amount} $BOSC to the bounty for ${currentScammer.name}`);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center py-4">
      <BookContainer
        scammers={localScammers}
        currentPage={currentPage}
        totalPages={totalPages}
        direction={direction}
        animationKey={animationKey}
        visiblePage={visiblePage}
        formatCurrency={formatCurrency}
        formatDate={formatDate}
      />

      {/* Bounty Form */}
      <div className="mt-4 mb-8 flex items-center justify-center gap-3 w-full max-w-xs">
        <Input
          type="number"
          min="1"
          placeholder="Bounty amount"
          value={bountyAmount}
          onChange={(e) => setBountyAmount(e.target.value)}
          className="w-32"
          disabled={!isConnected || isAddingBounty}
        />
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleAddBounty}
          disabled={!isConnected || isAddingBounty || !bountyAmount}
          className="gap-1 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
        >
          {isAddingBounty ? (
            <span>Adding...</span>
          ) : (
            <>
              <PlusCircle className="h-4 w-4" />
              <DollarSign className="h-4 w-4" />
              <span>Add Bounty</span>
            </>
          )}
        </Button>
      </div>

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
