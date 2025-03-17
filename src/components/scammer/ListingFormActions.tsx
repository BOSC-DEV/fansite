
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";
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
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
      <Button type="button" variant="outline" onClick={handleCancel}>
        Cancel
      </Button>
      
      {isConnected ? (
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="space-x-2"
        >
          <DollarSign className="h-4 w-4 mr-1" />
          {isSubmitting ? "Creating Listing..." : "Create Listing (1 $BOSC)"}
        </Button>
      ) : (
        <Button type="button" onClick={connectWallet}>
          Connect Wallet to Continue
        </Button>
      )}
    </div>
  );
}
