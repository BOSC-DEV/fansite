
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";

export function ScammerNotFound() {
  return (
    <div className="min-h-screen old-paper">
      <Header />
      <div className="container mx-auto max-w-6xl px-3 sm:px-4 pt-24 sm:pt-32 pb-16 text-center">
        <div className="wanted-poster-border paper-texture p-4 sm:p-8 max-w-md mx-auto">
          <AlertTriangle className="h-12 sm:h-16 w-12 sm:w-16 mx-auto text-western-accent mb-4" />
          <h1 className="text-2xl sm:text-3xl font-wanted text-western-accent mb-4 uppercase tracking-wide">Outlaw Not Found</h1>
          <p className="text-western-wood font-western mb-6 sm:mb-8 px-2">
            This scammer listing doesn't exist or may have been removed.
          </p>
          <Button asChild className="western-btn">
            <Link to="/most-wanted" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Most Wanted
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
