
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scammer } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";
import { useWallet } from "@/context/WalletContext";
import { scammerService } from "@/services/storage";
import { useScammers } from "@/hooks/use-scammers";

export const FeaturedScammers = ({ limit = 10 }: { limit?: number }) => {
  const { isLoading, filteredScammers } = useScammers();
  const limitedScammers = filteredScammers?.slice(0, limit) || [];

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
              <div className="animate-pulse flex flex-col items-center space-y-4">
                <div className="h-4 bg-western-wood/20 rounded w-3/4"></div>
                <div className="h-4 bg-western-wood/20 rounded w-1/2"></div>
                <div className="h-4 bg-western-wood/20 rounded w-2/3"></div>
              </div>
            </div>
          ) : limitedScammers.length > 0 ? (
            <ScammerTableCompact 
              scammers={limitedScammers}
              formatCurrency={formatCurrency}
              formatDate={formatDate}
            />
          ) : (
            <div className="p-6 text-center">
              <p className="text-western-wood font-western">Searching for outlaws...</p>
              <Button asChild variant="outline" className="mt-4 western-btn">
                <Link to="/create-listing">
                  Report a Scammer
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
