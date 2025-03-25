
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
          {connecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      )}
    </div>
  );
}
