
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MOCK_SCAMMERS, Scammer } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import { ScammerTable } from "@/components/scammer/ScammerTable";

export const FeaturedScammers = () => {
  const [featuredScammers, setFeaturedScammers] = useState<Scammer[]>(MOCK_SCAMMERS.slice(0, 5));
  const [currentPage, setCurrentPage] = useState(1);

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

  // Always one page for featured scammers
  const totalPages = 1;
  const itemsPerPage = 5;

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
          <ScammerTable 
            paginatedScammers={featuredScammers}
            currentPage={currentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            setCurrentPage={setCurrentPage}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        </div>
      </div>
    </section>
  );
};
