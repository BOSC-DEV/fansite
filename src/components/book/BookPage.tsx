
import { Scammer } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

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
    <div className="meme-card w-full max-w-2xl p-8 flex flex-col items-center bg-card">
      <div className="text-center mb-6">
        <div className="font-impact text-meme-purple text-4xl mb-2">
          #{pageNumber}
        </div>
        <Avatar className="h-32 w-32 border-4 border-meme-blue mx-auto mb-4">
          <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
          <AvatarFallback className="bg-meme-red text-white font-impact text-4xl">
            {scammer.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <h2 className="font-impact text-3xl mb-1">{scammer.name}</h2>
        <div className="text-sm text-muted-foreground break-all max-w-xs mx-auto mb-2">
          {scammer.walletAddress}
        </div>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {scammer.aliases.map((alias, i) => (
            <Badge key={i} variant="outline">
              {alias}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="w-full mb-6">
        <div className="font-bold flex items-center justify-center mb-2">
          <DollarSign className="h-6 w-6 text-meme-green mr-1" />
          <span className="text-meme-green text-2xl">{formatCurrency(scammer.bountyAmount)}</span>
        </div>
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Accused Of:</h3>
          <p>{scammer.accusedOf}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center w-full">
        <div className="text-sm text-muted-foreground">
          Added on {formatDate(scammer.dateAdded)}
        </div>
        <Button asChild>
          <Link to={`/scammer/${scammer.id}`} className="flex items-center">
            View Details
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
