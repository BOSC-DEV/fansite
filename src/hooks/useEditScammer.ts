
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { Scammer } from "@/lib/types";
import { useNavigate } from "react-router-dom";

export function useEditScammer(id: string | undefined) {
  const [isLoading, setIsLoading] = useState(true);
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { address, isConnected } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    const loadScammer = async () => {
      setIsLoading(true);
      
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // Load scammer details
        const scammerData = await storageService.getScammer(id);
        
        if (!scammerData) {
          setIsLoading(false);
          return;
        }

        // Convert to Scammer type
        const scammerObj: Scammer = {
          id: scammerData.id,
          name: scammerData.name,
          photoUrl: scammerData.photoUrl,
          accusedOf: scammerData.accusedOf,
          links: scammerData.links,
          aliases: scammerData.aliases,
          accomplices: scammerData.accomplices,
          officialResponse: scammerData.officialResponse,
          bountyAmount: scammerData.bountyAmount,
          walletAddress: scammerData.walletAddress || "",
          dateAdded: new Date(scammerData.dateAdded),
          addedBy: scammerData.addedBy,
          likes: scammerData.likes || 0,
          dislikes: scammerData.dislikes || 0,
          views: scammerData.views || 0
        };
        
        setScammer(scammerObj);
        
        // Check if user is authorized to edit
        if (isConnected && address === scammerObj.addedBy) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Error loading scammer for editing:", error);
        toast.error("Failed to load scammer details");
      } finally {
        setIsLoading(false);
      }
    };

    loadScammer();
  }, [id, address, isConnected]);

  return {
    isLoading,
    scammer,
    isAuthorized
  };
}
