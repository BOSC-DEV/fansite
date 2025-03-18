
import { AlertTriangle } from "lucide-react";

export function ListingDisclaimer() {
  return (
    <div className="flex items-center p-4 bg-muted/30 rounded-lg border border-border/50">
      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
      <p className="text-sm text-muted-foreground">
        Creating a listing costs <span className="font-medium text-foreground">1 BOSC token</span>. 
        The total bounty shown will be in BOSC tokens, not USD. 
        All bounty wallets are controlled by the developer for security purposes.
      </p>
    </div>
  );
}
