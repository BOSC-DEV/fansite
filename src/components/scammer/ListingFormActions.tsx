
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { Wallet } from "lucide-react";

interface ListingFormActionsProps {
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function ListingFormActions({ isSubmitting, onCancel }: ListingFormActionsProps) {
  const navigate = useNavigate();
  const { isConnected, connectWallet, connecting } = useWallet();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/most-wanted");
    }
  };

  const handleConnectWallet = async (e: React.MouseEvent) => {
    // Prevent default to avoid page refresh
    e.preventDefault();
    
    try {
      await connectWallet();
      // The success toast will be shown by the WalletContext
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet. Please try again.");
    }
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6 mt-4 py-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
        className="border-western-wood/60 text-western-wood hover:bg-western-wood/10 hover:border-western-wood/80 min-w-[120px]"
      >
        Cancel
      </Button>
      
      {isConnected ? (
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-western-accent hover:bg-western-accent/90 text-western-parchment font-wanted min-w-[220px]"
        >
          {isSubmitting ? "Creating Listing..." : "Create Listing"}
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={handleConnectWallet}
          disabled={connecting}
          className="bg-western-accent hover:bg-western-accent/90 text-western-parchment font-western min-w-[220px]"
        >
          {connecting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </span>
          ) : (
            <span className="flex items-center">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Phantom Wallet
            </span>
          )}
        </Button>
      )}
    </div>
  );
}
