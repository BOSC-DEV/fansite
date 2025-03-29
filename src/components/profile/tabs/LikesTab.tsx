
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/lib/supabase";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";
import { useWallet } from "@/context/WalletContext";

interface LikesTabProps {
  address?: string;
}

export function LikesTab({ address }: LikesTabProps) {
  const [likedScammers, setLikedScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { address: connectedAddress } = useWallet();
  
  // Ensure we have a valid address to work with - use current wallet address if none provided
  const effectiveAddress = address || connectedAddress;

  useEffect(() => {
    const fetchLikedScammers = async () => {
      if (!effectiveAddress) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log("Fetching liked scammers for address:", effectiveAddress);
        
        // Use join query to get liked scammers in one efficient query
        const { data, error } = await supabase
          .from('user_scammer_interactions')
          .select(`
            scammer_id,
            scammers:scammers(*)
          `)
          .eq('user_id', effectiveAddress)
          .eq('liked', true)
          .is('scammers.deleted_at', null);

        if (error) {
          console.error("Error fetching liked scammers:", error);
          toast.error("Failed to load liked scammers");
          setIsLoading(false);
          return;
        }

        console.log("Found liked scammers:", data?.length || 0);
        
        if (!data || data.length === 0) {
          setLikedScammers([]);
          setIsLoading(false);
          return;
        }

        // Convert to Scammer type
        const convertedScammers = data.map(item => {
          const scammer = item.scammers;
          return {
            id: scammer.id,
            name: scammer.name,
            photoUrl: scammer.photo_url,
            accusedOf: scammer.accused_of,
            addedBy: scammer.added_by,
            dateAdded: new Date(scammer.date_added),
            likes: scammer.likes || 0,
            dislikes: scammer.dislikes || 0,
            views: scammer.views || 0,
            shares: scammer.shares || 0,
            bountyAmount: scammer.bounty_amount || 0,
            aliases: scammer.aliases || [],
            links: scammer.links || [],
            officialResponse: scammer.official_response,
            accomplices: scammer.accomplices || [],
            walletAddress: scammer.wallet_address
          };
        });

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
  }, [effectiveAddress]);

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
          <p className="text-western-wood">No liked scammer listings yet</p>
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
              inProfileSection={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}
