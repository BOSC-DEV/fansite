
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const EmptyLeaderboard: React.FC = () => {
  return (
    <div className="p-8 text-center paper-texture border-2 border-western-wood rounded-sm flex flex-col items-center">
      <p className="text-western-wood text-lg mb-4">No bounty hunters have signed up yet. Be the first!</p>
      <Link to="/create-listing">
        <Button className="bg-western-accent hover:bg-western-leather text-western-parchment font-western">
          Create Listing
        </Button>
      </Link>
    </div>
  );
};
