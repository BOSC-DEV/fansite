
import { Scammer } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, ExternalLink, LinkIcon, Users } from "lucide-react";
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
    <div className="w-full max-w-3xl p-6 flex flex-col bg-[#faf6f1] dark:bg-[#1f1a21] rounded-lg border-2 border-muted shadow-lg">
      {/* Header with page number */}
      <div className="text-right mb-2">
        <div className="inline-block px-3 py-1 bg-meme-blue/10 text-meme-blue rounded-md font-mono text-sm">
          Page {pageNumber} of {totalPages}
        </div>
      </div>
      
      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left column - Profile */}
        <div className="md:col-span-1 flex flex-col items-center border-r border-muted/50 pr-4">
          <Avatar className="h-32 w-32 border-4 border-meme-purple mx-auto mb-4 shadow-lg">
            <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
            <AvatarFallback className="bg-meme-red text-white font-impact text-4xl">
              {scammer.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <h2 className="font-impact text-3xl text-center bg-gradient-to-r from-meme-purple to-meme-blue bg-clip-text text-transparent mb-2">
            {scammer.name}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {scammer.aliases.map((alias, i) => (
              <Badge key={i} variant="outline" className="bg-meme-yellow/10">
                {alias}
              </Badge>
            ))}
          </div>
          
          <div className="mt-auto w-full">
            <div className="font-bold flex items-center justify-center text-meme-green text-2xl">
              <DollarSign className="h-6 w-6 mr-1" />
              {formatCurrency(scammer.bountyAmount)}
            </div>
          </div>
        </div>
        
        {/* Right column - Details */}
        <div className="md:col-span-2">
          <div className="mb-4 p-4 bg-meme-red/5 rounded-lg border border-meme-red/20">
            <h3 className="text-lg font-bold mb-2 text-meme-red">Accused Of:</h3>
            <p className="italic">{scammer.accusedOf}</p>
          </div>
          
          <div className="space-y-4">
            {/* Wallet Address */}
            <div className="flex items-start">
              <div className="bg-muted/50 p-1 rounded mr-3">
                <LinkIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Wallet Address</p>
                <p className="text-xs text-muted-foreground font-mono break-all">
                  {scammer.walletAddress}
                </p>
              </div>
            </div>
            
            {/* Added Date */}
            <div className="flex items-start">
              <div className="bg-muted/50 p-1 rounded mr-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Added on</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(scammer.dateAdded)}
                </p>
              </div>
            </div>
            
            {/* Accomplices */}
            {scammer.accomplices.length > 0 && (
              <div className="flex items-start">
                <div className="bg-muted/50 p-1 rounded mr-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Known Accomplices</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {scammer.accomplices.map((accomplice, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {accomplice}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Official Response */}
            {scammer.officialResponse && (
              <div className="mt-4 p-3 bg-muted/30 rounded-lg text-sm">
                <p className="font-medium mb-1">Official Response:</p>
                <p className="text-muted-foreground text-xs">{scammer.officialResponse}</p>
              </div>
            )}
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button asChild size="sm" variant="default" className="bg-meme-purple hover:bg-meme-purple/90">
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
