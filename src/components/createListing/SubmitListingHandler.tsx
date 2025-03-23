
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "@/services/storage";
import { scammerService } from "@/services/storage";
import { profileService } from "@/services/storage/profileService";

interface SubmitListingHandlerProps {
  name: string;
  photoUrl: string;
  accusedOf: string;
  links: string[];
  aliases: string[];
  accomplices: string[];
  officialResponse: string;
  xLink?: string;
  turnstileToken: string | null;
  validateForm: () => boolean;
  onSubmitStart: () => void;
  onSubmitEnd: () => void;
}

export function useSubmitListing() {
  const navigate = useNavigate();
  const { isConnected, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (props: SubmitListingHandlerProps) => {
    const {
      name,
      photoUrl,
      accusedOf,
      links,
      aliases,
      accomplices,
      officialResponse,
      xLink,
      turnstileToken,
      validateForm,
      onSubmitStart,
      onSubmitEnd
    } = props;
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!validateForm()) {
      return;
    }

    if (!turnstileToken) {
      toast.error("Please complete the Cloudflare security verification");
      return;
    }
    
    setIsSubmitting(true);
    onSubmitStart();
    
    try {
      console.log("Turnstile token for verification:", turnstileToken);
      
      // Generate scammer ID
      const scammerId = uuidv4();
      
      // Use fallback image if photoUrl is empty
      const finalPhotoUrl = photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
      
      // Create the scammer listing
      const scammerListing = {
        id: scammerId,
        name,
        photoUrl: finalPhotoUrl,
        accusedOf,
        links,
        aliases,
        accomplices,
        officialResponse,
        bountyAmount: 0,
        walletAddress: "",
        dateAdded: new Date().toISOString(),
        addedBy: address || "",
        comments: [],
        likes: 0,
        dislikes: 0,
        views: 0,
        xLink: xLink || ""
      };
      
      // Save to localStorage and try to save to Supabase
      const saved = await storageService.saveScammer(scammerListing);
      
      if (saved) {
        console.log("Successfully saved scammer to Supabase");
      } else {
        console.warn("Failed to save to Supabase, but saved locally");
      }
      
      toast.success("Scammer successfully added to the Book of Scams!");
      
      // Wait briefly for toast to be visible then navigate
      setTimeout(() => navigate(`/scammer/${scammerId}`), 1500);
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast.error(`Failed to create listing: ${error.message || "Please try again"}`);
    } finally {
      setIsSubmitting(false);
      onSubmitEnd();
    }
  };

  return { 
    isSubmitting, 
    handleSubmit 
  };
}
