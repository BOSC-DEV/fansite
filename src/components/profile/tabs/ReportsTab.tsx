
import React from "react";
import { Link } from "react-router-dom";
import { Scammer } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { ScammerCard } from "@/components/scammer/card/ScammerCard";
import { Card } from "@/components/ui/card";

interface ReportsTabProps {
  scammers: Scammer[];
}

export function ReportsTab({ scammers }: ReportsTabProps) {
  return (
    <>
      <h2 className="text-xl font-bold mb-4 font-western text-western-accent">Scammer Reports</h2>
      {scammers.length > 0 ? (
        <Card className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scammers.map((scammer, index) => (
              <ScammerCard 
                key={scammer.id} 
                scammer={scammer} 
                rank={index + 1} // Add ranking number to match the main grid
              />
            ))}
          </div>
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <p className="text-western-sand mb-4">No scammer reports yet</p>
          <Link to="/create-listing">
            <Button 
              variant="outline" 
              className="border-western-wood text-western-accent hover:bg-western-wood hover:text-western-parchment transition-colors"
            >
              Report a Scammer
              <ExternalLink className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </Card>
      )}
    </>
  );
}
