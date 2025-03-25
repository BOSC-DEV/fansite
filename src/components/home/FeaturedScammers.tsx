
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scammer } from "@/lib/types";
import { ArrowRight, Award, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";
import { useWallet } from "@/context/WalletContext";
import { scammerService } from "@/services/storage";

export const FeaturedScammers = ({ limit = 10 }: { limit?: number }) => {
  const [featuredScammers, setFeaturedScammers] = useState<Scammer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { chainId } = useWallet();

  useEffect(() => {
    const fetchFeaturedScammers = async () => {
      setIsLoading(true);
      try {
        const supabaseScammers = await scammerService.getAllScammers();
        
        const scammers: Scammer[] = supabaseScammers
          .map(s => ({
            id: s.id,
            name: s.name,
            photoUrl: s.photoUrl || '',
            accusedOf: s.accusedOf || '',
            links: s.links || [],
            aliases: Array.isArray(s.aliases) ? s.aliases : [],
            accomplices: s.accomplices || [],
            officialResponse: s.officialResponse || '',
            bountyAmount: Number(s.bountyAmount) || 0,
            walletAddress: s.walletAddress || '',
            dateAdded: new Date(s.dateAdded),
            addedBy: s.addedBy || '',
            likes: s.likes || 0,
            dislikes: s.dislikes || 0,
            views: s.views || 0
          }))
          .sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime())
          .slice(0, limit);
        
        setFeaturedScammers(scammers);
        console.log('Featured scammers loaded:', scammers.length);
      } catch (error) {
        console.error("Error fetching featured scammers:", error);
        setFeaturedScammers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedScammers();
  }, [chainId, limit]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <section className="py-16 bg-western-parchment/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-wanted text-western-accent uppercase tracking-wide">Most Wanted</h2>
            <p className="text-western-wood">Recently added high-profile scammers</p>
          </div>
          <Button asChild variant="ghost" className="gap-1 hover:animate-wiggle border-2 border-dashed border-western-wood/50">
            <Link to="/most-wanted">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <div className="wanted-poster-border paper-texture rounded-sm">
          {isLoading ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Loading scammers...</p>
            </div>
          ) : featuredScammers.length > 0 ? (
            <>
              <ScammerTableCompact 
                scammers={featuredScammers}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
              <div className="p-4 border-t border-western-wood/20 bg-western-sand/20 flex justify-end items-center text-sm text-western-wood">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Award className="h-4 w-4 mr-1 text-western-accent" />
                    <span>Bounty</span>
                  </div>
                  <div className="flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-1 text-western-accent" />
                    <span>Likes</span>
                  </div>
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-1 text-western-accent" />
                    <span>Views</span>
                  </div>
                  <div className="flex items-center">
                    <MessageSquare className="h-4 w-4 mr-1 text-western-accent" />
                    <span>Comments</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No scammers have been reported yet.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/create-listing">Report a Scammer</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
