
import { AlertTriangle } from "lucide-react";
export function ListingDisclaimer() {
  return <div className="flex items-center p-4 bg-western-sand/10 rounded-lg border border-western-wood/10">
      <AlertTriangle className="h-5 w-5 text-western-wood/60 mr-2 flex-shrink-0" />
      <p className="text-sm text-western-wood/70">Creating a listing is free currently however will cost $BOSC in future. Funding bounties is currently disabled, but will commence soon, stay tuned for imminent updates.</p>
    </div>;
}
