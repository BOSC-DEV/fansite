
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MOCK_SCAMMERS, Scammer } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { ScammerTableCompact } from "@/components/scammer/ScammerTableCompact";

export const FeaturedScammers = () => {
  const [featuredScammers, setFeaturedScammers] = useState<Scammer[]>(MOCK_SCAMMERS.slice(0, 5));

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
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-impact text-transparent bg-clip-text bg-gradient-to-r from-meme-red to-bosc">Most Wanted</h2>
            <p className="text-muted-foreground">Recently added high-profile scammers</p>
          </div>
          <Button asChild variant="ghost" className="gap-1 hover:animate-wiggle">
            <Link to="/most-wanted">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </div>
        
        <ScammerTableCompact 
          scammers={featuredScammers}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
        />
      </div>
    </section>
  );
};
