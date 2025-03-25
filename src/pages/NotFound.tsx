
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, FileText } from "lucide-react";
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
    <div className="min-h-screen flex items-center justify-center old-paper px-3 sm:px-4 py-8">
      <div className="text-center wanted-poster-border paper-texture p-4 sm:p-8 max-w-md">
        <FileText className="h-10 sm:h-12 w-10 sm:w-12 mx-auto text-western-accent mb-4" />
        <h1 className="text-3xl sm:text-4xl font-wanted text-western-accent mb-4 uppercase tracking-wide">Page Not Found</h1>
        <p className="text-lg sm:text-xl text-western-wood font-western mb-4">This page doesn't exist.</p>
        <p className="text-western-wood/80 mb-6 font-western text-sm sm:text-base">
          The path "{location.pathname}" doesn't lead anywhere in this town.
        </p>
        <Button asChild variant="outline" className="western-btn gap-2">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
