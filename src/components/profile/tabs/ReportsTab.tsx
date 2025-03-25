
import React from "react";
import { Link } from "react-router-dom";
import { Scammer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";

interface ReportsTabProps {
  scammers: Scammer[];
}

export function ReportsTab({ scammers }: ReportsTabProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Scammer Reports</h2>
      {scammers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scammers.map(scammer => (
            <ScammerCard key={scammer.id} scammer={scammer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-western-parchment/5 rounded-lg">
          <p className="text-western-sand mb-4">No scammer reports yet</p>
          <Link to="/create-listing">
            <Button variant="outline" className="border-western-wood text-western-accent hover:bg-western-sand/20">
              Report a Scammer
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
