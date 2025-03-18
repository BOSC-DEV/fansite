
import { Scammer } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  User,
  Copy,
  CheckCircle2,
  Link2,
  Users,
  MessageSquare,
  ExternalLink,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ScammerDetailsCardProps {
  scammer: Scammer;
  imageLoaded: boolean;
  setImageLoaded: (loaded: boolean) => void;
  formatDate: (date: Date) => string;
  bountyAmount: number;
}

export function ScammerDetailsCard({
  scammer,
  imageLoaded,
  setImageLoaded,
  formatDate,
  bountyAmount,
}: ScammerDetailsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(scammer.walletAddress);
    setCopied(true);
    toast.success("Wallet address copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card>
      <div className="relative aspect-video overflow-hidden bg-muted rounded-t-lg">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}
        <img
          src={scammer.photoUrl}
          alt={scammer.name}
          className={cn(
            "object-cover w-full h-full transition-opacity duration-300",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-bosc mr-1" />
            <span className="text-xl font-bold text-bosc">
              {bountyAmount.toLocaleString()} $BOSC
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Added on {formatDate(scammer.dateAdded)}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            Added by:
          </div>
          <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
            {scammer.addedBy}
          </code>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">
            Listing Wallet Address:
          </h3>
          <div className="flex items-center gap-2">
            <code className="text-xs bg-muted px-2 py-1 rounded font-mono flex-1 overflow-x-auto">
              {scammer.walletAddress}
            </code>
            <Button
              variant="outline"
              size="icon"
              className="h-7 w-7"
              onClick={handleCopyAddress}
            >
              {copied ? (
                <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
            </Button>
          </div>
        </div>

        <Separator className="my-6" />

        {scammer.aliases.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <User className="h-4 w-4 mr-2 text-muted-foreground" />
              Known Aliases
            </h3>
            <div className="flex flex-wrap gap-2">
              {scammer.aliases.map((alias, i) => (
                <Badge key={i} variant="outline">
                  {alias}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {scammer.accomplices.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <Users className="h-4 w-4 mr-2 text-muted-foreground" />
              Known Accomplices
            </h3>
            <div className="flex flex-wrap gap-2">
              {scammer.accomplices.map((accomplice, i) => (
                <Badge key={i} variant="secondary">
                  {accomplice}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {scammer.links.length > 0 && (
          <div className="mb-6">
            <h3 className="flex items-center text-sm font-medium mb-3">
              <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
              Evidence Links
            </h3>
            <ul className="space-y-2">
              {scammer.links.map((link, i) => (
                <li key={i} className="flex items-center">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-bosc hover:underline flex items-center"
                  >
                    {link}
                    <ExternalLink className="h-3 w-3 ml-1 inline-block" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {scammer.officialResponse && (
          <div>
            <h3 className="flex items-center text-sm font-medium mb-3">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              Official Response
            </h3>
            <div className="bg-muted/50 border border-border/50 rounded-md p-4 text-sm">
              {scammer.officialResponse}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
