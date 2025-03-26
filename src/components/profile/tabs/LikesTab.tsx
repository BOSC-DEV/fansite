
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Scammer } from "@/lib/types";
import { storageService } from "@/services/storage";

interface LikesTabProps {
  address?: string;
}

export function LikesTab({ address }: LikesTabProps) {
  const [likedScammers, setLikedScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLikedScammers = async () => {
      if (!address) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Get the interactions where the user liked scammers
        const { data: interactions, error } = await supabase
          .from('user_scammer_interactions')
          .select('scammer_id')
          .eq('user_id', address)
          .eq('liked', true);

        if (error) {
          console.error("Error fetching liked scammers:", error);
          setIsLoading(false);
          return;
        }

        if (!interactions || interactions.length === 0) {
          setIsLoading(false);
          return;
        }

        // Get scammer IDs from interactions
        const scammerIds = interactions.map(interaction => interaction.scammer_id);
        
        // Fetch scammer details for each ID
        const allScammers = await storageService.getAllScammers();
        const filteredScammers = allScammers.filter(scammer => 
          scammerIds.includes(scammer.id)
        );
        
        // Convert to Scammer type (with date conversion)
        const convertedScammers = filteredScammers.map(scammer => ({
          ...scammer,
          dateAdded: new Date(scammer.dateAdded)
        }));

        setLikedScammers(convertedScammers);
      } catch (error) {
        console.error("Error in fetchLikedScammers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLikedScammers();
  }, [address]);

  if (isLoading) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Likes</h2>
        <Card className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </Card>
      </>
    );
  }

  if (!likedScammers.length) {
    return (
      <>
        <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Likes</h2>
        <Card className="p-6 text-center">
          <p className="text-western-sand">No liked scammer listings yet</p>
        </Card>
      </>
    );
  }

  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Likes</h2>
      <Card className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {likedScammers.map(scammer => (
            <ScammerCard 
              key={scammer.id}
              scammer={scammer}
            />
          ))}
        </div>
      </Card>
    </>
  );
}
