
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function BountiesTab() {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Bounties</h2>
      <div className="text-center py-12 bg-western-parchment/5 rounded-lg">
        <p className="text-western-wood mb-4">No bounties funded yet</p>
        <Link to="/create-listing">
          <Button 
            variant="outline" 
            className="border-western-wood text-western-accent hover:bg-western-wood/20 hover:text-western-parchment hover:border-western-accent"
          >
            Fund a Bounty
            <ExternalLink className="ml-2 h-3 w-3" />
          </Button>
        </Link>
      </div>
    </>
  );
}
