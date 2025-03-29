
import { useState, useEffect, useCallback } from "react";
import { Scammer } from "@/lib/types";
import { scammerService } from "@/services/storage";
import { storageService } from "@/services/storage/localStorageService";
import { toast } from "sonner";

export const useScammers = () => {
  const [scammers, setScammers] = useState<Scammer[]>([]);
  const [filteredScammers, setFilteredScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Load scammers from both Supabase and localStorage
  const loadScammers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log("[useScammers] Loading scammers...");
      
      // Try to load from Supabase first
      let supabaseScammers: Scammer[] = [];
      try {
        const supabaseData = await scammerService.getAllScammers();
        console.log("[useScammers] Loaded from Supabase:", supabaseData.length, "scammers");
        
        supabaseScammers = supabaseData.map(s => ({
          id: s.id,
          name: s.name,
          photoUrl: s.photoUrl,
          accusedOf: s.accusedOf,
          links: Array.isArray(s.links) ? s.links : [],
          aliases: Array.isArray(s.aliases) ? s.aliases : [],
          accomplices: Array.isArray(s.accomplices) ? s.accomplices : [],
          officialResponse: s.officialResponse || '',
          bountyAmount: s.bountyAmount,
          walletAddress: s.walletAddress || '',
          dateAdded: new Date(s.dateAdded),
          addedBy: s.addedBy || '',
          likes: s.likes || 0,
          dislikes: s.dislikes || 0,
          views: s.views || 0,
          shares: s.shares || 0
        }));
      } catch (err) {
        console.error("[useScammers] Error loading from Supabase:", err);
      }

      // Also load from localStorage
      const localScammers = storageService.getAllScammers();
      console.log("[useScammers] Loaded from localStorage:", localScammers.length, "scammers");
      
      const mappedLocalScammers = localScammers.map(s => ({
        id: s.id,
        name: s.name,
        photoUrl: s.photoUrl,
        accusedOf: s.accusedOf,
        links: Array.isArray(s.links) ? s.links : [],
        aliases: Array.isArray(s.aliases) ? s.aliases : [],
        accomplices: Array.isArray(s.accomplices) ? s.accomplices : [],
        officialResponse: s.officialResponse || '',
        bountyAmount: s.bountyAmount,
        walletAddress: s.walletAddress || '',
        dateAdded: new Date(s.dateAdded),
        addedBy: s.addedBy || '',
        likes: s.likes || 0,
        dislikes: s.dislikes || 0,
        views: s.views || 0,
        shares: s.shares || 0
      }));

      // Create a comprehensive list with all scammers
      const allScammerIds = new Set<string>();
      const allScammers: Scammer[] = [];
      
      // Add all local scammers first
      mappedLocalScammers.forEach(scammer => {
        allScammerIds.add(scammer.id);
        allScammers.push(scammer);
      });
      
      // Add Supabase scammers, overriding any duplicates
      supabaseScammers.forEach(scammer => {
        if (allScammerIds.has(scammer.id)) {
          // Replace existing scammer with Supabase version
          const index = allScammers.findIndex(s => s.id === scammer.id);
          if (index !== -1) {
            allScammers[index] = scammer;
          }
        } else {
          // Add new scammer
          allScammerIds.add(scammer.id);
          allScammers.push(scammer);
        }
      });
      
      if (allScammers.length === 0) {
        console.log("[useScammers] No scammers found in either Supabase or localStorage");
      } else {
        console.log(`[useScammers] Total loaded: ${allScammers.length} scammers`);
      }
      
      // Sort by date, most recent first
      const sortedScammers = [...allScammers].sort((a, b) => 
        b.dateAdded.getTime() - a.dateAdded.getTime()
      );
      
      console.log("[useScammers] Sorted scammers by date:", sortedScammers.map(s => s.id));
      setScammers(sortedScammers);
      setFilteredScammers(sortedScammers);
    } catch (error) {
      console.error("[useScammers] Error loading scammers:", error);
      setError("Failed to load scammers. Please try again later.");
      toast.error("Failed to load scammers. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, [refreshCounter]); // Add refreshCounter to dependencies

  // Initial load
  useEffect(() => {
    loadScammers();
  }, [loadScammers]);

  // Filter scammers based on search query
  useEffect(() => {
    let result = [...scammers];
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        scammer => 
          scammer.name.toLowerCase().includes(query) ||
          scammer.accusedOf.toLowerCase().includes(query) ||
          (Array.isArray(scammer.aliases) && scammer.aliases.some(alias => alias.toLowerCase().includes(query)))
      );
    }
    
    setFilteredScammers(result);
  }, [scammers, searchQuery]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const refreshScammers = useCallback(() => {
    console.log("[useScammers] Manually refreshing scammers...");
    setRefreshCounter(prev => prev + 1); // This will trigger loadScammers through the dependency
  }, []);

  return {
    scammers,
    filteredScammers,
    isLoading,
    error,
    searchQuery,
    handleSearch,
    refreshScammers
  };
};
