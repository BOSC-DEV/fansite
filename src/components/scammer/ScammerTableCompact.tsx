
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Eye, MessageSquare, ThumbsUp } from "lucide-react";
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
            <TableHead className="text-western-accent font-wanted">Outlaw</TableHead>
            <TableHead className="text-western-accent font-wanted">Accused Of</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <Award className="h-4 w-4 mr-1" />
                <span>Bounty</span>
              </div>
            </TableHead>
            <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <ThumbsUp className="h-4 w-4 mr-1" />
                <span>Likes</span>
              </div>
            </TableHead>
            <TableHead className="text-center hidden md:table-cell text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <Eye className="h-4 w-4 mr-1" />
                <span>Views</span>
              </div>
            </TableHead>
            <TableHead className="text-right text-western-accent font-wanted">Posted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scammers.map((scammer) => {
            // Ensure aliases is always an array with proper type handling
            const aliases = Array.isArray(scammer.aliases) ? scammer.aliases : [];
            
            return (
              <TableRow key={scammer.id} className="border-b border-western-wood/20 hover:bg-western-sand/10">
                <TableCell className="font-medium">
                  <Link to={`/scammer/${scammer.id}`}>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8 border border-western-wood">
                        <AvatarImage src={scammer.photoUrl} alt={scammer.name} />
                        <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
                          {scammer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium font-western">{scammer.name}</div>
                        {aliases.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            <Badge variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
                              {aliases[0]}
                              {aliases.length > 1 && ` +${aliases.length - 1}`}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="truncate text-sm">{scammer.accusedOf}</p>
                </TableCell>
                <TableCell className="text-center font-medium">
                  <span className="text-western-accent font-wanted">{formatCurrency(scammer.bountyAmount)} $BOSC</span>
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {scammer.likes || 0}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {scammer.views || 0}
                </TableCell>
                <TableCell className="text-right text-western-wood/90 text-sm">
                  {formatDate(scammer.dateAdded)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
