
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface NoResultsProps {
  searchQuery: string;
}

export const NoResults = ({ searchQuery }: NoResultsProps) => {
  return (
    <div className="text-center py-16">
      <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-xl font-medium mb-2">No results found</h3>
      <p className="text-muted-foreground mb-6">
        {searchQuery
          ? `No scammers matching "${searchQuery}" were found.`
          : "There are no scammers in the database yet."}
      </p>
      <Button asChild>
        <Link to="/create-listing">
          <FileText className="h-4 w-4 mr-2" />
          Report a Scammer
        </Link>
      </Button>
    </div>
  );
};
