
import { Badge } from "@/components/ui/badge";

interface ScammerCardBadgeProps {
  name: string;
  rank?: number;
}

export function ScammerCardBadge({ name, rank }: ScammerCardBadgeProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-white truncate">{name}</h3>
        <Badge variant="destructive" className="ml-2 shrink-0">
          {rank ? `#${rank} Most Wanted` : 'Wanted'}
        </Badge>
      </div>
    </div>
  );
}
