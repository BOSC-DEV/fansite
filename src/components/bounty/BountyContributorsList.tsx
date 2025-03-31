
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SolAmount } from "@/components/SolAmount";
import { CalendarDays } from "lucide-react";

// Define the contributor type
export interface BountyContributor {
  id: string;
  profileId: string;
  username: string;
  profilePicUrl?: string;
  amount: number;
  message?: string;
  contributedAt: Date;
}

interface BountyContributorsListProps {
  scammerId: string;
  contributors: BountyContributor[];
  isLoading?: boolean;
}

export function BountyContributorsList({ 
  scammerId, 
  contributors, 
  isLoading = false 
}: BountyContributorsListProps) {
  if (isLoading) {
    return (
      <Card className="border-western-wood bg-western-parchment/70 mt-6">
        <CardHeader className="border-b border-western-wood/20 bg-western-sand/20">
          <CardTitle className="text-western-accent font-western text-lg">Bounty Contributors</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-center p-8">
            <p className="text-western-wood/70 text-sm">Loading contributors...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (contributors.length === 0) {
    return (
      <Card className="border-western-wood bg-western-parchment/70 mt-6">
        <CardHeader className="border-b border-western-wood/20 bg-western-sand/20">
          <CardTitle className="text-western-accent font-western text-lg">Bounty Contributors</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex justify-center p-8">
            <p className="text-western-wood/70 text-sm">No contributors yet. Be the first to add to this bounty!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-western-wood bg-western-parchment/70 mt-6">
      <CardHeader className="border-b border-western-wood/20 bg-western-sand/20">
        <CardTitle className="text-western-accent font-western text-lg">Bounty Contributors</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-y divide-western-wood/10">
          {contributors.map((contributor) => (
            <li key={contributor.id} className="p-4 hover:bg-western-sand/10 transition-colors">
              <div className="flex items-center space-x-3">
                <Link to={`/profile/${contributor.profileId}`} className="shrink-0">
                  <Avatar className="h-10 w-10 border border-western-wood/20 bg-western-sand">
                    <AvatarImage src={contributor.profilePicUrl} alt={contributor.username} />
                    <AvatarFallback className="bg-western-accent/20 text-western-wood">
                      {contributor.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Link>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link 
                        to={`/profile/${contributor.profileId}`}
                        className="font-medium text-western-wood hover:text-western-accent hover:underline"
                      >
                        {contributor.username}
                      </Link>
                      
                      <div className="flex items-center text-xs text-western-wood/60 mt-1">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        <span>
                          {new Date(contributor.contributedAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="font-medium text-western-accent">
                      <SolAmount amount={contributor.amount} showIcon={true} className="text-sm" />
                    </div>
                  </div>
                  
                  {contributor.message && (
                    <p className="mt-2 text-sm text-western-wood/80 break-words">
                      {contributor.message}
                    </p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
