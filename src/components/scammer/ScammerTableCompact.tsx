
import { Link } from "react-router-dom";
import { ArrowRight, DollarSign, Skull } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Scammer } from "@/lib/types";

interface ScammerTableCompactProps {
  scammers: Scammer[];
  formatCurrency: (amount: number) => string;
  formatDate: (date: Date) => string;
}

export const ScammerTableCompact = ({ 
  scammers, 
  formatCurrency, 
  formatDate 
}: ScammerTableCompactProps) => {
  return (
    <div className="rounded-sm border-western-wood bg-western-parchment/80 overflow-hidden">
      <Table>
        <TableHeader className="bg-western-wood/20">
          <TableRow>
            <TableHead className="w-[60px] text-center text-western-accent font-wanted">№</TableHead>
            <TableHead className="text-western-accent font-wanted">Outlaw</TableHead>
            <TableHead className="text-western-accent font-wanted">Crimes</TableHead>
            <TableHead className="hidden md:table-cell text-center text-western-accent font-wanted">Aliases</TableHead>
            <TableHead className="text-right text-western-accent font-wanted">Bounty</TableHead>
            <TableHead className="hidden md:table-cell text-right text-western-accent font-wanted">Posted</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scammers.map((scammer, index) => (
            <TableRow key={scammer.id} className="border-b border-western-wood/20 hover:bg-western-sand/10">
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="border-2 border-western-wood">
                    <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
                    <AvatarFallback className="bg-western-wood text-western-parchment">{scammer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium font-western">{scammer.name}</div>
                    <div className="text-xs text-western-wood/70 truncate max-w-[150px] hidden md:block">
                      {scammer.walletAddress}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px]">
                <p className="truncate">{scammer.accusedOf}</p>
              </TableCell>
              <TableCell className="hidden md:table-cell text-center">
                {scammer.aliases.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-1">
                    <Badge variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
                      {scammer.aliases[0]}
                      {scammer.aliases.length > 1 && ` +${scammer.aliases.length - 1}`}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-western-wood/50 text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-right font-medium">
                <div className="flex items-center justify-end">
                  <DollarSign className="h-3.5 w-3.5 text-western-accent mr-1" />
                  <span className="text-western-accent font-wanted">{formatCurrency(scammer.bountyAmount)}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-western-wood/70 text-sm">
                {formatDate(scammer.dateAdded)}
              </TableCell>
              <TableCell>
                <Button asChild size="sm" variant="ghost" className="hover:bg-western-sand/20">
                  <Link to={`/scammer/${scammer.id}`}>
                    <span className="sr-only">View</span>
                    <Skull className="h-4 w-4 text-western-accent" />
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
