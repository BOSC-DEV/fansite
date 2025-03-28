
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Scammer } from "@/lib/types";
import { storageService } from "@/services/storage";
import { toast } from "sonner";

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
          toast.error("Failed to load liked scammers");
          setIsLoading(false);
          return;
        }

        if (!interactions || interactions.length === 0) {
          setLikedScammers([]);
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
        toast.error("Failed to load liked scammers");
        setLikedScammers([]);
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
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((_, index) => (
              <Card key={index} className="overflow-hidden border-western-wood bg-western-parchment/80 w-full">
                <div className="aspect-square relative">
                  <Skeleton className="w-full h-full absolute inset-0" />
                </div>
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full mt-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
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
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedScammers.map((scammer, index) => (
            <ScammerCard 
              key={scammer.id}
              scammer={scammer}
              rank={index + 1}
            />
          ))}
        </div>
      </div>
    </>
  );
}
