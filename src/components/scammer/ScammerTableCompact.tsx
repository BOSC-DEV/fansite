
import { Link } from "react-router-dom";
import { ArrowRight, DollarSign } from "lucide-react";
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
    <div className="rounded-md border bg-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-center">#</TableHead>
            <TableHead>Scammer</TableHead>
            <TableHead>Accused Of</TableHead>
            <TableHead className="hidden md:table-cell text-center">Aliases</TableHead>
            <TableHead className="text-right">Bounty</TableHead>
            <TableHead className="hidden md:table-cell text-right">Added</TableHead>
            <TableHead className="w-[80px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scammers.map((scammer, index) => (
            <TableRow key={scammer.id}>
              <TableCell className="font-medium text-center">
                {index + 1}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
                    <AvatarFallback>{scammer.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{scammer.name}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[150px] hidden md:block">
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
                    <Badge variant="outline" className="text-xs">
                      {scammer.aliases[0]}
                      {scammer.aliases.length > 1 && ` +${scammer.aliases.length - 1}`}
                    </Badge>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-sm">-</span>
                )}
              </TableCell>
              <TableCell className="text-right font-medium">
                <div className="flex items-center justify-end">
                  <DollarSign className="h-3.5 w-3.5 text-bosc mr-1" />
                  <span className="text-bosc">{formatCurrency(scammer.bountyAmount)}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell text-right text-muted-foreground text-sm">
                {formatDate(scammer.dateAdded)}
              </TableCell>
              <TableCell>
                <Button asChild size="sm" variant="ghost">
                  <Link to={`/scammer/${scammer.id}`}>
                    <span className="sr-only">View</span>
                    <ArrowRight className="h-4 w-4" />
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
