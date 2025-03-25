
import React from "react";
import { Card } from "@/components/ui/card";

export function BountiesTab() {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Bounties</h2>
      <Card className="p-6 text-center">
        <p className="text-western-sand">No bounties funded yet</p>
      </Card>
    </>
  );
}
