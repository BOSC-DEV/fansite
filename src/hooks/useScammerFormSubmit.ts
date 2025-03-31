
import { useState } from "react";
import { storageService } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function useScammerFormSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const submitScammerUpdate = async (
    scammerId: string,
    scammer: Scammer,
    updatedFields: {
      name: string;
      photoUrl: string;
      accusedOf: string;
      links: string[];
      aliases: string[];
      accomplices: string[];
      officialResponse: string;
    }
  ) => {
    if (!scammerId) {
      toast.error("No scammer ID provided");
      return false;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update scammer data
      const updatedScammer = {
        ...scammer,
        name: updatedFields.name,
        photoUrl: updatedFields.photoUrl,
        accusedOf: updatedFields.accusedOf,
        links: updatedFields.links,
        aliases: updatedFields.aliases,
        accomplices: updatedFields.accomplices,
        officialResponse: updatedFields.officialResponse,
        // Keep original date and other stats
        dateAdded: scammer.dateAdded.toISOString(),
        likes: scammer.likes,
        dislikes: scammer.dislikes,
        views: scammer.views,
        shares: scammer.shares || 0,
        addedBy: scammer.addedBy,
        // Include comments property for ScammerListing compatibility
        comments: [], // Initialize as empty array since it doesn't exist in Scammer type
        deletedAt: null // Add this property to conform to the ScammerListing type
      };
      
      // Convert date to string for storage
      const scammerToSave = {
        ...updatedScammer,
        dateAdded: updatedScammer.dateAdded,
      };
      
      const saved = await storageService.saveScammer(scammerToSave);
      
      if (saved) {
        toast.success("Scammer listing updated successfully!");
        setTimeout(() => navigate(`/scammer/${scammerId}`), 1500);
        return true;
      } else {
        toast.error("Failed to update scammer listing");
        return false;
      }
    } catch (error) {
      console.error("Error updating scammer:", error);
      toast.error("Failed to update scammer listing");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    submitScammerUpdate
  };
}
