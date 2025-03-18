
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Hat } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center old-paper">
      <div className="text-center wanted-poster-border paper-texture p-8 max-w-md">
        <Hat className="h-12 w-12 mx-auto text-western-accent mb-4" />
        <h1 className="text-4xl font-wanted text-western-accent mb-4 uppercase tracking-wide">Wanted Dead or Alive</h1>
        <p className="text-xl text-western-wood font-western mb-4">This page seems to have fled town.</p>
        <p className="text-western-wood/80 mb-6 font-western">
          The sheriff can't find what you're looking for at {location.pathname}
        </p>
        <Button asChild variant="outline" className="western-btn gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Return to Saloon
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
