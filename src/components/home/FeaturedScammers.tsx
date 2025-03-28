
import { useState } from "react";
import { Link } from "react-router-dom";
import { useScammers } from "@/hooks/use-scammers";
import { Button } from "@/components/ui/button";
import { ScammerGrid } from "@/components/scammer/ScammerGrid";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, Shield } from "lucide-react";

export const FeaturedScammers = ({ limit = 3 }: { limit?: number }) => {
  const { filteredScammers, isLoading } = useScammers();
  const [currentPage] = useState(1);
  const isMobile = useIsMobile();
  
  // Get the most recent scammers
  const featuredScammers = filteredScammers
    .sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime())
    .slice(0, limit);

  return (
    <div className="py-12 px-4 bg-western-leather/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-wanted text-western-wood tracking-wide mb-2">
              Recently Added
            </h2>
            <p className="text-western-wood/80 max-w-xl mb-4 md:mb-0">
              The newest scammers added to our registry. Check back often as the list grows.
            </p>
          </div>
          
          <Button asChild size="sm" variant="ghost" className="text-western-wood hover:text-western-accent">
            <Link to="/most-wanted" className="flex items-center gap-2">
              View All Scammers
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(limit)].map((_, idx) => (
              <div key={idx} className="bg-western-parchment/50 animate-pulse rounded-lg h-64"></div>
            ))}
          </div>
        ) : featuredScammers.length === 0 ? (
          <div className="bg-western-parchment/75 rounded-lg p-8 text-center">
            <Shield className="mx-auto h-12 w-12 text-western-wood/30 mb-4" />
            <h3 className="text-xl font-wanted text-western-wood mb-2">Registry is Empty</h3>
            <p className="text-western-wood/70 mb-4">
              No scammers have been added to the registry yet.
            </p>
            <Button asChild variant="outline" className="border-western-wood text-western-wood hover:bg-western-wood hover:text-western-parchment">
              <Link to="/create-listing">Report a Scammer</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredScammers.map((scammer) => (
              <div key={scammer.id} className="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <Link to={`/scammer/${scammer.id}`}>
                  <div className="bg-western-parchment/75 rounded-lg overflow-hidden shadow-md border border-western-wood/20">
                    <div className="h-48 bg-western-leather/10 relative">
                      {scammer.photoUrl ? (
                        <img 
                          src={scammer.photoUrl} 
                          alt={scammer.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }} 
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-western-leather/10">
                          <span className="text-6xl text-western-leather/30 font-wanted">{scammer.name.charAt(0)}</span>
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-western-wood/80 text-western-parchment p-2 font-semibold">
                        {scammer.name}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-western-wood text-sm line-clamp-2">{scammer.accusedOf}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm text-western-wood/70">
                          {new Date(scammer.dateAdded).toLocaleDateString()}
                        </span>
                        <span className="bg-western-leather/10 text-western-leather px-2 py-1 rounded text-sm">
                          {scammer.bountyAmount ? `${scammer.bountyAmount.toFixed(2)} SOL` : "No bounty"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg" className="border-western-wood text-western-wood hover:bg-western-wood hover:text-western-parchment">
            <Link to="/most-wanted">
              View All Scammers
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
