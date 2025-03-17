
import { Link } from "react-router-dom";

export const SiteFooter = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-bosc">Book of Scams</span>
            <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-medium rounded-full">
              $BOSC
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link to="/most-wanted" className="text-sm text-muted-foreground hover:text-foreground">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-muted-foreground hover:text-foreground">
              Report Scammer
            </Link>
          </div>
          
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>
      </div>
    </footer>
  );
};
