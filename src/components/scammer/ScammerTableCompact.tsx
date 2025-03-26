import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, ThumbsUp, User, Globe } from "lucide-react";
import { Scammer } from "@/lib/types";
import { useScammerProfile } from "@/hooks/useScammerProfile";
import { commentService } from "@/services/storage/localStorageService";
import { SolAmount } from "@/components/SolAmount";

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
            <TableHead className="text-center text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                Bounty
              </div>
            </TableHead>
            <TableHead className="text-western-accent font-wanted">Links</TableHead>
            <TableHead className="text-western-accent font-wanted">Accused Of</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <ThumbsUp className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-center text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <Eye className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-right text-western-accent font-wanted">Posted</TableHead>
            <TableHead className="text-center text-western-accent font-wanted">
              <div className="flex items-center justify-center">
                <User className="h-4 w-4" />
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scammers.map((scammer) => {
            const aliases = Array.isArray(scammer.aliases) ? scammer.aliases : [];
            const links = Array.isArray(scammer.links) ? scammer.links : [];
            const commentsCount = commentService.getCommentsForScammer(scammer.id).length;
            
            return (
              <TableRow 
                key={scammer.id} 
                className="border-b border-western-wood/20 hover:bg-western-sand/10 cursor-pointer"
                onClick={() => window.location.href = `/scammer/${scammer.id}`}
              >
                <TableCell className="font-medium">
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
                </TableCell>
                <TableCell className="text-center font-medium">
                  <SolAmount amount={scammer.bountyAmount} className="text-western-accent font-wanted" />
                </TableCell>
                <TableCell>
                  {links.length > 0 ? (
                    <div className="flex items-center space-x-2">
                      {links.slice(0, 2).map((link, index) => (
                        <a 
                          key={index} 
                          href={link.startsWith('http') ? link : `https://${link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-western-sand/20 text-western-wood hover:bg-western-sand/40 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Globe className="h-3.5 w-3.5" />
                        </a>
                      ))}
                      {links.length > 2 && (
                        <Badge variant="outline" className="text-xs bg-western-sand/20 border-western-wood/30 text-western-wood">
                          +{links.length - 2} more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <span className="text-western-wood/50 text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="max-w-[200px]">
                  <p className="truncate text-sm">{scammer.accusedOf}</p>
                </TableCell>
                <TableCell className="text-center">
                  {scammer.likes || 0}
                </TableCell>
                <TableCell className="text-center">
                  {scammer.views || 0}
                </TableCell>
                <TableCell className="text-right text-western-wood/90 text-sm">
                  {formatDate(scammer.dateAdded)}
                </TableCell>
                <TableCell className="text-center">
                  <UploaderAvatar addedBy={scammer.addedBy} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const UploaderAvatar = ({ addedBy }: { addedBy: string | undefined }) => {
  const { addedByUsername, addedByPhotoUrl, profileId } = useScammerProfile(addedBy);
  
  if (!addedBy) return <div className="flex justify-center">-</div>;
  
  const profileUrl = addedByUsername ? `/${addedByUsername}` : `/user/${profileId}`;
  
  return (
    <div className="flex justify-center">
      <Link 
        to={profileUrl}
        onClick={(e) => e.stopPropagation()}
      >
        <Avatar className="w-8 h-8 border border-western-wood hover:border-western-accent transition-all">
          <AvatarImage src={addedByPhotoUrl || ''} alt={addedByUsername || addedBy} />
          <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
            {(addedByUsername || addedBy).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};
