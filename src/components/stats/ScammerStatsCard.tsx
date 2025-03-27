
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Scammer } from "@/lib/types";
import { Award, Users, TrendingUp, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { SolAmount } from "@/components/SolAmount";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

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

  return (
    <Card className={cn("mb-6 border-western-wood bg-western-parchment/80 w-full", className)}>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Total Scammers */}
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-western-wood/70">Total Scammers</p>
              <h4 className="text-2xl font-bold text-western-wood">{stats.totalScammers}</h4>
            </div>
          </div>

          {/* Highest Bounty */}
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <Award className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm font-medium text-western-wood/70">Highest Bounty</p>
              <div className="flex items-center gap-2">
                <h4 className="text-2xl font-bold text-western-accent">
                  <SolAmount amount={stats.highestBounty} />
                </h4>
                {stats.highestBountyScammer && (
                  <Link to={`/scammer/${stats.highestBountyScammer?.id}`}>
                    <Avatar className="h-8 w-8 border-2 border-western-accent cursor-pointer hover:ring-2 hover:ring-western-wood/50 transition-all">
                      <AvatarImage 
                        src={stats.highestBountyScammer.photoUrl} 
                        alt={stats.highestBountyScammer.name} 
                      />
                      <AvatarFallback className="bg-western-sand text-western-wood">
                        {stats.highestBountyScammer.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                )}
              </div>
              {/* Removed the scammer name display here */}
            </div>
          </div>

          {/* Total Bounties */}
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

          {/* Recently Added */}
          <div className="flex items-center gap-4">
            <div className="rounded-md bg-western-sand/30 p-2 text-western-accent">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-western-wood/70">Recently Added</p>
              {stats.recentScammer && (
                <div className="flex items-center gap-2">
                  <h4 className="text-2xl font-bold text-western-accent">
                    <Link to={`/scammer/${stats.recentScammer?.id}`} className="hover:underline">
                      {stats.recentScammer?.name}
                    </Link>
                  </h4>
                  <Link to={`/scammer/${stats.recentScammer?.id}`}>
                    <Avatar className="h-8 w-8 border-2 border-western-accent cursor-pointer hover:ring-2 hover:ring-western-wood/50 transition-all">
                      <AvatarImage 
                        src={stats.recentScammer.photoUrl} 
                        alt={stats.recentScammer.name} 
                      />
                      <AvatarFallback className="bg-western-sand text-western-wood">
                        {stats.recentScammer.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
