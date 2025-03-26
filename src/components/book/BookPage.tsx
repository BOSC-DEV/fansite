
import { Scammer } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, ExternalLink, LinkIcon, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface BookPageProps {
  scammer: Scammer | null;
  pageNumber: number;
  totalPages: number;
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const BookPage = ({
  scammer,
  pageNumber,
  totalPages,
  formatCurrency,
  formatDate
}: BookPageProps) => {
  if (!scammer) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground text-xl">No scammer found</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl p-6 flex flex-col parchment-bg rounded-lg border-2 border-western-wood shadow-lg">
      {/* Header with page number */}
      <div className="text-right mb-2">
        <div className="inline-block px-3 py-1 bg-western-sand/30 text-western-wood rounded-md font-mono text-sm border border-western-wood/20">
          Page {pageNumber} of {totalPages}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile */}
        <div className="md:col-span-1 flex flex-col items-center border-r border-western-wood/30 pr-4">
          <Avatar className="h-32 w-32 border-4 border-western-leather mx-auto mb-4 shadow-lg">
            <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
            <AvatarFallback className="bg-western-accent text-western-parchment font-impact text-4xl">
              {scammer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="font-wanted text-3xl text-center text-western-accent mb-2">
            {scammer.name}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {scammer.aliases.map((alias, i) => (
              <Badge key={i} variant="outline" className="bg-western-sand/20 border-western-wood/30 text-western-wood">
                {alias}
              </Badge>
            ))}
          </div>
          
          <div className="mt-auto w-full">
            <div className="font-bold flex items-center justify-center text-western-accent text-2xl font-wanted">
              {formatCurrency(scammer.bountyAmount)} $BOSC
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="md:col-span-2 pl-2">
          <div className="mb-4 p-4 bg-western-accent/5 rounded-lg border border-western-accent/20">
            <h3 className="text-lg font-bold mb-2 text-western-accent">Accused Of:</h3>
            <p className="italic text-western-wood">{scammer.accusedOf}</p>
          </div>
          
          <div className="space-y-4">
            {/* Wallet Address */}
            <div className="flex items-start">
              <div className="bg-western-sand/30 p-1 rounded mr-3">
                <LinkIcon className="h-4 w-4 text-western-wood" />
              </div>
              <div>
                <p className="text-sm font-medium text-western-wood">Wallet Address</p>
                <p className="text-xs text-western-wood/70 font-mono break-all">
                  {scammer.walletAddress}
                </p>
              </div>
            </div>
            
            {/* Added Date */}
            <div className="flex items-start">
              <div className="bg-western-sand/30 p-1 rounded mr-3">
                <Calendar className="h-4 w-4 text-western-wood" />
              </div>
              <div>
                <p className="text-sm font-medium text-western-wood">Added on</p>
                <p className="text-xs text-western-wood/70">
                  {formatDate(scammer.dateAdded)}
                </p>
              </div>
            </div>
            
            {/* Accomplices */}
            {scammer.accomplices.length > 0 && (
              <div className="flex items-start">
                <div className="bg-western-sand/30 p-1 rounded mr-3">
                  <Users className="h-4 w-4 text-western-wood" />
                </div>
                <div>
                  <p className="text-sm font-medium text-western-wood">Known Accomplices</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scammer.accomplices.map((accomplice, i) => (
                      <Badge key={i} variant="secondary" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
                        {accomplice}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Official Response */}
            {scammer.officialResponse && (
              <div className="mt-4 p-3 bg-western-sand/30 rounded-lg text-sm border border-western-wood/20">
                <p className="font-medium mb-1 text-western-wood">Official Response:</p>
                <p className="text-western-wood/80 text-xs">{scammer.officialResponse}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button asChild size="sm" variant="default" className="bg-western-accent hover:bg-western-accent/90 text-western-parchment">
              <Link to={`/scammer/${scammer.id}`} className="flex items-center">
                View Full Details
                <ExternalLink className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
