
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Scammer } from "@/lib/types";
import { Award, Users, TrendingUp, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { SolAmount } from "@/components/SolAmount";
import { Link } from "react-router-dom";

interface ScammerStatsCardProps {
  scammers: Scammer[];
  className?: string;
}

export const ScammerStatsCard = ({ scammers, className }: ScammerStatsCardProps) => {
  const stats = useMemo(() => {
    if (!scammers.length) return null;
    
    const totalScammers = scammers.length;
    const highestBounty = Math.max(...scammers.map(s => s.bountyAmount));
    const highestBountyScammer = scammers.find(s => s.bountyAmount === highestBounty);
    const totalBounty = scammers.reduce((sum, scammer) => sum + scammer.bountyAmount, 0);
    const recentScammer = [...scammers].sort((a, b) => 
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    )[0];
    
    return {
      totalScammers,
      highestBounty,
      highestBountyScammer,
      totalBounty,
      recentScammer
    };
  }, [scammers]);

  if (!stats) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Card className={cn("mb-6 border-western-wood bg-western-parchment/80 w-full", className)}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-western-wood/70">Total Scammers</p>
              <h4 className="text-2xl font-bold text-western-wood">{stats.totalScammers}</h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-western-wood/70">Highest Bounty</p>
              <h4 className="text-2xl font-bold text-western-accent">
                <SolAmount amount={stats.highestBounty} />
              </h4>
              <Link to={`/scammer/${stats.highestBountyScammer?.id}`} className="text-xs text-western-wood/70 truncate hover:text-western-accent hover:underline">
                {stats.highestBountyScammer?.name}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-western-wood/70">Total Bounties</p>
              <h4 className="text-2xl font-bold text-western-accent">
                <SolAmount amount={stats.totalBounty} />
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <BarChart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-western-wood/70">Recently Added</p>
              <Link to={`/scammer/${stats.recentScammer?.id}`} className="hover:text-western-accent transition-colors">
                <h4 className="text-base font-bold truncate text-western-wood hover:underline">
                  {stats.recentScammer?.name}
                </h4>
              </Link>
              <p className="text-xs text-western-wood/70">
                {new Date(stats.recentScammer?.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
