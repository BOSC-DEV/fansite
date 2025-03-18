
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
        <TableHeader className="bg-western-sand/60 border-b border-western-wood/30">
          <TableRow>
            <TableHead className="text-center text-western-accent font-wanted w-1/2">Aliases</TableHead>
            <TableHead className="text-western-accent font-wanted text-center">Bounty</TableHead>
            <TableHead className="text-western-accent font-wanted text-right">Posted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scammers.map((scammer, index) => (
            <TableRow key={scammer.id} className="border-b border-western-wood/20 hover:bg-western-sand/10">
              <TableCell className="font-medium py-4">
                <div className="flex justify-center">
                  {scammer.aliases.length > 0 ? (
                    <Badge variant="outline" className="text-sm bg-western-sand/20 border-western-wood/30 text-western-wood px-4 py-2 font-medium">
                      {scammer.aliases[0]}
                      {scammer.aliases.length > 1 && ` +${scammer.aliases.length - 1}`}
                    </Badge>
                  ) : (
                    <span className="text-western-wood/50 text-sm">-</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center font-medium py-4">
                <div className="flex items-center justify-center">
                  <span className="text-western-accent font-wanted">{formatCurrency(scammer.bountyAmount)} $BOSC</span>
                </div>
              </TableCell>
              <TableCell className="text-right text-western-wood/90 text-sm py-4">
                {formatDate(scammer.dateAdded)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
