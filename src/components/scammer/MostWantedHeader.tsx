
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const MostWantedHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 md:mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-wanted text-western-accent mb-2">Most Wanted Scammers</h1>
        <p className="text-western-wood max-w-xl">Browse the list of reported scammers in the crypto space</p>
      </div>
      <Button asChild className="w-full sm:w-auto">
        <Link to="/create-listing" className="bg-western-accent hover:bg-western-accent/90 text-western-parchment flex items-center justify-center">
          <Plus className="mr-2 h-4 w-4" />
          Report a Scammer
        </Link>
      </Button>
    </div>
  );
};
