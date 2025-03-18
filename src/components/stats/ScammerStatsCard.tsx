
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Scammer } from "@/lib/types";
import { Award, Users, TrendingUp, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Card className={cn("mb-8", className)}>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-muted/60 p-2 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Scammers</p>
              <h4 className="text-2xl font-bold">{stats.totalScammers}</h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-md bg-muted/60 p-2 text-meme-red">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Highest Bounty</p>
              <h4 className="text-2xl font-bold">{formatCurrency(stats.highestBounty)} <span className="text-xs text-muted-foreground">BOSC</span></h4>
              <p className="text-xs text-muted-foreground truncate">
                {stats.highestBountyScammer?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-md bg-muted/60 p-2 text-bosc">
              <TrendingUp className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Bounties</p>
              <h4 className="text-2xl font-bold">{formatCurrency(stats.totalBounty)} <span className="text-xs text-muted-foreground">BOSC</span></h4>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="rounded-md bg-muted/60 p-2 text-meme-blue">
              <BarChart className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Recently Added</p>
              <h4 className="text-base font-bold truncate">{stats.recentScammer?.name}</h4>
              <p className="text-xs text-muted-foreground">
                {new Date(stats.recentScammer?.dateAdded).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Statistics updated in real-time</p>
          <p className="text-sm font-medium text-primary">Most Wanted List</p>
        </div>
      </CardContent>
    </Card>
  );
};
