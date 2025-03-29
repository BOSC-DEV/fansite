
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ListingFormActionsProps {
  isSubmitting: boolean;
  onCancel?: () => void;
}

export function ListingFormActions({ isSubmitting, onCancel }: ListingFormActionsProps) {
  const navigate = useNavigate();
  
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate("/most-wanted");
    }
  };

  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6 mt-4 py-2">
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleCancel}
        className="border-western-wood/60 text-western-wood hover:bg-western-wood/20 hover:border-western-wood hover:text-western-wood min-w-[120px]"
      >
        Cancel
      </Button>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-western-accent hover:bg-western-leather text-western-parchment font-wanted min-w-[220px]"
      >
        {isSubmitting ? "Creating Listing..." : "Create Listing"}
      </Button>
    </div>
  );
}
