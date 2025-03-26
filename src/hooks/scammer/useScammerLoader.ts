
import { useState, useEffect, useCallback } from "react";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";
import { storageService } from "@/services/storage/localStorageService";
import { scammerService } from "@/services/storage/scammer/scammerService";

/**
 * Hook to handle loading of scammer data with improved performance
 */
export function useScammerLoader(id: string | undefined) {
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load scammer data with improved error handling and caching
  const loadScammer = useCallback(async (scammerId: string) => {
    setIsLoading(true);
    setImageLoaded(false);
    setError(null);
    
    try {
      console.log("Loading scammer with ID:", scammerId);
      
      // Try to load from Supabase
      const supabaseScammer = await scammerService.getScammer(scammerId);
      
      if (supabaseScammer) {
        console.log("Scammer found in Supabase:", supabaseScammer.name);
        
        // Convert to Scammer type
        setScammer({
          id: supabaseScammer.id,
          name: supabaseScammer.name,
          photoUrl: supabaseScammer.photoUrl,
          accusedOf: supabaseScammer.accusedOf,
          links: supabaseScammer.links || [],
          aliases: supabaseScammer.aliases || [],
          accomplices: supabaseScammer.accomplices || [],
          officialResponse: supabaseScammer.officialResponse || "",
          bountyAmount: supabaseScammer.bountyAmount || 0,
          walletAddress: supabaseScammer.walletAddress || "",
          dateAdded: new Date(supabaseScammer.dateAdded),
          addedBy: supabaseScammer.addedBy || "",
          likes: supabaseScammer.likes || 0,
          dislikes: supabaseScammer.dislikes || 0,
          views: supabaseScammer.views || 0
        });
        
        // Record view in background to not block the UI
        scammerService.incrementScammerViews(scammerId).catch(err => 
          console.error("Failed to increment views:", err)
        );
      } else {
        console.log("Scammer not found in Supabase, checking localStorage");
        
        // Fallback to localStorage
        const localScammer = storageService.getScammer(scammerId);
        
        if (localScammer) {
          console.log("Scammer found in localStorage:", localScammer.name);
          
          setScammer({
            id: localScammer.id,
            name: localScammer.name,
            photoUrl: localScammer.photoUrl,
            accusedOf: localScammer.accusedOf,
            links: localScammer.links || [],
            aliases: localScammer.aliases || [],
            accomplices: localScammer.accomplices || [],
            officialResponse: localScammer.officialResponse || "",
            bountyAmount: localScammer.bountyAmount || 0,
            walletAddress: localScammer.walletAddress || "",
            dateAdded: new Date(localScammer.dateAdded),
            addedBy: localScammer.addedBy || "",
            likes: localScammer.likes || 0,
            dislikes: localScammer.dislikes || 0,
            views: localScammer.views || 0
          });
          
          // Record view in localStorage
          storageService.incrementScammerViews(scammerId);
        } else {
          console.error("Scammer not found in either Supabase or localStorage");
          setError("Scammer not found");
          setScammer(null);
        }
      }
    } catch (error) {
      console.error("Error loading scammer:", error);
      
      // Fallback to localStorage if Supabase fails
      try {
        const localScammer = storageService.getScammer(scammerId);
        
        if (localScammer) {
          console.log("Fallback: Using localStorage after Supabase error");
          
          setScammer({
            id: localScammer.id,
            name: localScammer.name,
            photoUrl: localScammer.photoUrl,
            accusedOf: localScammer.accusedOf,
            links: localScammer.links || [],
            aliases: localScammer.aliases || [],
            accomplices: localScammer.accomplices || [],
            officialResponse: localScammer.officialResponse || "",
            bountyAmount: localScammer.bountyAmount || 0,
            walletAddress: localScammer.walletAddress || "",
            dateAdded: new Date(localScammer.dateAdded),
            addedBy: localScammer.addedBy || "",
            likes: localScammer.likes || 0,
            dislikes: localScammer.dislikes || 0,
            views: localScammer.views || 0
          });
          
          // Record view
          storageService.incrementScammerViews(scammerId);
        } else {
          setError("Failed to load scammer details");
          toast.error("Failed to load scammer details");
          setScammer(null);
        }
      } catch (error) {
        console.error("Error in localStorage fallback:", error);
        setError("Failed to load scammer details");
        toast.error("Failed to load scammer details");
        setScammer(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (id) {
      loadScammer(id);
    } else {
      setIsLoading(false);
      setScammer(null);
    }
  }, [id, loadScammer]);

  // Expose a refresh method to manually reload data
  const refreshScammer = useCallback(() => {
    if (id) {
      loadScammer(id);
    }
  }, [id, loadScammer]);

  return {
    scammer,
    isLoading,
    imageLoaded,
    setImageLoaded,
    error,
    refreshScammer
  };
}
