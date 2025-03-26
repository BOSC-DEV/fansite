
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface BountyHeaderProps {
  scammerName: string;
}

export function BountyHeader({ scammerName }: BountyHeaderProps) {
  return (
    <CardHeader className="border-b border-western-wood/20">
      <CardTitle className="text-western-accent font-wanted">Contribute to Bounty</CardTitle>
      <CardDescription className="text-western-wood">
        Add SOL tokens to increase the bounty for {scammerName}
      </CardDescription>
    </CardHeader>
  );
}
