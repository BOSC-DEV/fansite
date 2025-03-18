
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";

interface ListingFormActionsProps {
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function ListingFormActions({ isSubmitting, onCancel }: ListingFormActionsProps) {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/most-wanted");
    }
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0 sm:space-x-4 mt-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
        className="border-western-wood text-western-wood hover:bg-western-sand/20"
      >
        Cancel
      </Button>
      
      {isConnected ? (
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-western-accent hover:bg-western-accent/90 text-western-parchment font-wanted"
        >
          {isSubmitting ? "Creating Listing..." : "Create Listing (1 $BOSC)"}
        </Button>
      ) : (
        <Button 
          type="button" 
          onClick={connectWallet}
          className="bg-western-wood hover:bg-western-wood/90 text-western-parchment font-western"
        >
          Connect Wallet to Continue
        </Button>
      )}
    </div>
  );
}
