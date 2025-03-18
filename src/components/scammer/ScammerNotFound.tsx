
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowLeft } from "lucide-react";

export function ScammerNotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 pt-32 pb-16 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-3xl font-bold mb-4">Scammer Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The scammer you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to="/most-wanted">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Most Wanted
          </Link>
        </Button>
      </div>
    </div>
  );
}
