
import { useState, useEffect } from "react";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";
import { storageService } from "@/services/storage/localStorageService";
import { scammerService } from "@/services/storage/scammer/scammerService";

/**
 * Hook to handle loading of scammer data
 */
export function useScammerLoader(id: string | undefined) {
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load scammer data
  useEffect(() => {
    const loadScammer = async () => {
      setIsLoading(true);
      setImageLoaded(false);
      
      if (id) {
        try {
          console.log("Loading scammer with ID:", id);
          
          // Try to load from Supabase first
          const supabaseScammer = await scammerService.getScammer(id);
          
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
            
            // Record view
            await scammerService.incrementScammerViews(id);
          } else {
            console.log("Scammer not found in Supabase, checking localStorage");
            
            // Fallback to localStorage
            const localScammer = storageService.getScammer(id);
            
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
              storageService.incrementScammerViews(id);
            } else {
              console.error("Scammer not found in either Supabase or localStorage");
              setScammer(null);
            }
          }
        } catch (error) {
          console.error("Error loading scammer:", error);
          
          // Fallback to localStorage if Supabase fails
          try {
            const localScammer = storageService.getScammer(id);
            
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
              storageService.incrementScammerViews(id);
            } else {
              toast.error("Failed to load scammer details");
              setScammer(null);
            }
          } catch (error) {
            console.error("Error in localStorage fallback:", error);
            toast.error("Failed to load scammer details");
            setScammer(null);
          }
        }
      }
      
      setIsLoading(false);
    };

    loadScammer();
  }, [id]);

  return {
    scammer,
    isLoading,
    imageLoaded,
    setImageLoaded
  };
}
