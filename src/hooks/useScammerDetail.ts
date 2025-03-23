
import { useState, useEffect } from "react";
import { storageService } from "@/services/storage/storageService";
import { scammerService } from "@/services/storage";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";

export function useScammerDetail(id: string | undefined) {
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scammerStats, setScammerStats] = useState({
    likes: 0,
    dislikes: 0,
    views: 0
  });
  const [ipHash, setIpHash] = useState<string | null>(null);

  // Get IP address and create a hash for view tracking
  useEffect(() => {
    const getIp = async () => {
      try {
        // Use a service to get the user's IP
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        if (data && data.ip) {
          // Hash the IP for privacy
          const hash = storageService.hashIpAddress(data.ip);
          setIpHash(hash);
        }
      } catch (error) {
        console.error("Error getting IP:", error);
        // Fallback to a session-based identifier if IP can't be retrieved
        const sessionId = sessionStorage.getItem('viewerSessionId') || 
                          Math.random().toString(36).substring(2, 15);
        sessionStorage.setItem('viewerSessionId', sessionId);
        setIpHash(storageService.hashIpAddress(sessionId));
      }
    };
    
    getIp();
  }, []);

  useEffect(() => {
    const loadScammer = async () => {
      setIsLoading(true);
      setImageLoaded(false); // Reset image loaded state when loading a new scammer
      
      if (id) {
        try {
          console.log("Attempting to load scammer with ID:", id);
          
          // First try to load from Supabase - properly await the Promise
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
              officialResponse: supabaseScammer.officialResponse,
              bountyAmount: supabaseScammer.bountyAmount,
              walletAddress: supabaseScammer.walletAddress || "",
              dateAdded: new Date(supabaseScammer.dateAdded),
              addedBy: supabaseScammer.addedBy,
              xLink: supabaseScammer.xLink || ""
            });
            
            setScammerStats({
              likes: supabaseScammer.likes || 0,
              dislikes: supabaseScammer.dislikes || 0,
              views: supabaseScammer.views || 0
            });
            
            // Track view using IP hash if available
            if (ipHash) {
              try {
                await scammerService.recordScammerView(id, ipHash);
              } catch (error) {
                console.error("Failed to record view with IP hash:", error);
                // Fallback to the old method
                await scammerService.incrementScammerViews(id);
              }
            } else {
              // Fallback to the old method if IP hash is not available
              await scammerService.incrementScammerViews(id);
            }
          } else {
            console.log("Scammer not found in Supabase, checking localStorage");
            
            // If not found in Supabase, try localStorage
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
                officialResponse: localScammer.officialResponse,
                bountyAmount: localScammer.bountyAmount,
                walletAddress: localScammer.walletAddress || "",
                dateAdded: new Date(localScammer.dateAdded),
                addedBy: localScammer.addedBy,
                xLink: localScammer.xLink || ""
              });
              
              setScammerStats({
                likes: localScammer.likes || 0,
                dislikes: localScammer.dislikes || 0,
                views: localScammer.views || 0
              });
              
              // Track view in localStorage
              storageService.incrementScammerViews(id);
              
              // Try to save to Supabase for next time
              try {
                console.log("Attempting to save localStorage scammer to Supabase");
                await scammerService.saveScammer(localScammer);
              } catch (err) {
                console.error("Failed to save localStorage scammer to Supabase:", err);
              }
            } else {
              console.error("Scammer not found in either Supabase or localStorage");
            }
          }
        } catch (error) {
          console.error("Error loading scammer:", error);
          
          // Fallback to localStorage if Supabase fails
          const localScammer = storageService.getScammer(id);
          
          if (localScammer) {
            console.log("Fallback: Loading scammer from localStorage after Supabase error");
            
            setScammer({
              id: localScammer.id,
              name: localScammer.name,
              photoUrl: localScammer.photoUrl,
              accusedOf: localScammer.accusedOf,
              links: localScammer.links || [],
              aliases: localScammer.aliases || [],
              accomplices: localScammer.accomplices || [],
              officialResponse: localScammer.officialResponse,
              bountyAmount: localScammer.bountyAmount,
              walletAddress: localScammer.walletAddress || "",
              dateAdded: new Date(localScammer.dateAdded),
              addedBy: localScammer.addedBy,
              xLink: localScammer.xLink || ""
            });
            
            setScammerStats({
              likes: localScammer.likes || 0,
              dislikes: localScammer.dislikes || 0,
              views: localScammer.views || 0
            });
            
            // Track view in localStorage
            storageService.incrementScammerViews(id);
          } else {
            toast.error("Failed to load scammer details");
          }
        }
      }
      setIsLoading(false);
    };

    loadScammer();
  }, [id, ipHash]);

  const handleLikeScammer = async () => {
    if (id) {
      await scammerService.likeScammer(id);
      // Also update in localStorage for redundancy
      storageService.likeScammer(id);
      
      // Update the local state with the new stats
      const updatedStats = {
        ...scammerStats,
        likes: scammerStats.likes + 1
      };
      setScammerStats(updatedStats);
    }
  };

  const handleDislikeScammer = async () => {
    if (id) {
      await scammerService.dislikeScammer(id);
      // Also update in localStorage for redundancy
      storageService.dislikeScammer(id);
      
      // Update the local state with the new stats
      const updatedStats = {
        ...scammerStats,
        dislikes: scammerStats.dislikes + 1
      };
      setScammerStats(updatedStats);
    }
  };

  return {
    scammer,
    isLoading,
    imageLoaded,
    setImageLoaded,
    scammerStats,
    handleLikeScammer,
    handleDislikeScammer
  };
}
