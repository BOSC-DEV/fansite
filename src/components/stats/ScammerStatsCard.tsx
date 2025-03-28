
import { Scammer } from "@/lib/types";
import { ArrowUpRight, Users, DollarSign, Calendar } from "lucide-react";
import { formatCurrency } from "@/utils/formatters";

interface ScammerStatsCardProps {
  scammers: Scammer[];
}

export const ScammerStatsCard = ({ scammers }: ScammerStatsCardProps) => {
  // Calculate total bounty
  const totalBounty = scammers.reduce((acc, scammer) => {
    return acc + (scammer.bountyAmount || 0);
  }, 0);

  // Sort by date to find most recent
  const sortedByDate = [...scammers].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
  
  // Get most recent scammer
  const mostRecent = sortedByDate.length > 0 ? sortedByDate[0] : null;
  
  // Format the most recent date
  const formattedDate = mostRecent 
    ? new Date(mostRecent.dateAdded).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }) 
    : "N/A";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2 mb-6">
      {/* Total Scammers */}
      <div className="bg-hacker-card border border-hacker-border/30 p-4 rounded-sm shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-hacker-accent/5 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <Users className="h-5 w-5 text-hacker-accent mr-2" />
            <h3 className="text-sm text-hacker-text/80 font-mono">Total Scammers</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-hacker text-hacker-accent">{scammers.length}</p>
            <div className="rounded-full p-1.5 bg-hacker-muted/20 text-hacker-accent">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Total Bounty */}
      <div className="bg-hacker-card border border-hacker-border/30 p-4 rounded-sm shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-hacker-accent/5 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <DollarSign className="h-5 w-5 text-hacker-accent mr-2" />
            <h3 className="text-sm text-hacker-text/80 font-mono">Total Bounty</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-hacker text-hacker-accent">{formatCurrency(totalBounty)} SOL</p>
            <div className="rounded-full p-1.5 bg-hacker-muted/20 text-hacker-accent">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Most Recent */}
      <div className="bg-hacker-card border border-hacker-border/30 p-4 rounded-sm shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-hacker-accent/5 to-transparent"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-2">
            <Calendar className="h-5 w-5 text-hacker-accent mr-2" />
            <h3 className="text-sm text-hacker-text/80 font-mono">Most Recent</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-2xl font-hacker text-hacker-accent truncate max-w-[70%]">
              {mostRecent ? mostRecent.name : "N/A"}
            </p>
            <div className="rounded-full p-1.5 bg-hacker-muted/20 text-hacker-text/80">
              <span className="text-xs">{formattedDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
