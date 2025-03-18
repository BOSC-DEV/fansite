
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

export const HomeFooter = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-bosc" />
            <span className="font-impact text-transparent bg-clip-text bg-gradient-to-r from-bosc to-meme-red">Book of Scams</span>
            <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-bold rounded-full border-2 border-dashed border-bosc/50">
              $BOSC
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground hover:scale-110 transform duration-200">
              Home
            </Link>
            <Link to="/most-wanted" className="text-sm text-muted-foreground hover:text-foreground hover:scale-110 transform duration-200">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-muted-foreground hover:text-foreground hover:scale-110 transform duration-200">
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
