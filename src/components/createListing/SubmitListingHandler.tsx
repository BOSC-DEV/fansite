
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
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
      
      // Get all existing scammers to determine next sequential ID
      const existingScammers = await storageService.getAllScammers();
      
      // Generate sequential ID
      let nextId = "1";
      if (existingScammers && existingScammers.length > 0) {
        // Find the highest numeric ID
        const numericIds = existingScammers
          .map(s => parseInt(s.id, 10))
          .filter(id => !isNaN(id));
        
        if (numericIds.length > 0) {
          nextId = String(Math.max(...numericIds) + 1);
        }
      }
      
      // Use fallback image if photoUrl is empty
      const finalPhotoUrl = photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
      
      // Create the scammer listing with the sequential ID
      const scammerListing = {
        id: nextId,
        name,
        photoUrl: finalPhotoUrl,
        accusedOf,
        links: Array.isArray(links) ? links : [],
        aliases: Array.isArray(aliases) ? aliases : [],
        accomplices: Array.isArray(accomplices) ? accomplices : [],
        officialResponse,
        bountyAmount: 0,
        walletAddress: "",
        dateAdded: new Date().toISOString(),
        addedBy: address || "",
        comments: [],
        likes: 0,
        dislikes: 0,
        views: 0,
        shares: 0
      };
      
      console.log("[SubmitListingHandler] Saving scammer listing:", scammerListing);
      
      // Save to storage service
      const saved = await storageService.saveScammer(scammerListing);
      
      // Always save to local storage as a backup
      const localStorageService = (await import('@/services/storage/localStorage/scammerService')).scammerService;
      localStorageService.saveScammer(scammerListing);
      
      if (saved) {
        console.log("Successfully saved scammer to Supabase with ID:", nextId);
      } else {
        console.warn("Failed to save to Supabase, but saved locally with ID:", nextId);
      }
      
      // Changed success message from "Scammer successfully added to the Book of Scams!" to "Report filed!"
      toast.success("Report filed!");
      
      // Wait briefly for toast to be visible then navigate
      setTimeout(() => navigate(`/scammer/${nextId}`), 1500);
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast.error(`Failed to create listing: ${error.message || "Please try again"}`);
      
      // Try to save to local storage as a fallback
      try {
        const localStorageService = (await import('@/services/storage/localStorage/scammerService')).scammerService;
        const scammerListing = {
          id: String(Date.now()),
          name,
          photoUrl: photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
          accusedOf,
          links: Array.isArray(links) ? links : [],
          aliases: Array.isArray(aliases) ? aliases : [],
          accomplices: Array.isArray(accomplices) ? accomplices : [],
          officialResponse,
          bountyAmount: 0,
          walletAddress: "",
          dateAdded: new Date().toISOString(),
          addedBy: address || "",
          comments: [],
          likes: 0,
          dislikes: 0,
          views: 0,
          shares: 0
        };
        
        localStorageService.saveScammer(scammerListing);
        console.log("Saved scammer to local storage as fallback after error");
        toast.success("Report saved locally");
        
        // Navigate to the scammer page
        setTimeout(() => navigate(`/scammer/${scammerListing.id}`), 1500);
      } catch (localError) {
        console.error("Failed to save to local storage:", localError);
      }
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
