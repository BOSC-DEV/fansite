
import { AlertTriangle } from "lucide-react";

export function ListingDisclaimer() {
  return (
    <div className="flex items-center p-4 bg-western-sand/30 rounded-lg border border-western-wood/30">
      <AlertTriangle className="h-5 w-5 text-western-accent mr-2 flex-shrink-0" />
      <p className="text-sm text-western-wood">
        Creating a listing is free. 
        The total bounty shown will be in BOSC tokens, not USD. 
        All bounty wallets are controlled by the developer for security purposes.
      </p>
    </div>
  );
}
