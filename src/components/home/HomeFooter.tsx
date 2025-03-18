
import { Link } from "react-router-dom";
import { Flame, Scroll } from "lucide-react";

export const HomeFooter = () => {
  return (
    <footer className="py-8 border-t-2 border-western-leather/30 bg-western-parchment/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <Scroll className="h-5 w-5 text-western-accent" />
            <span className="font-wanted text-transparent bg-clip-text bg-gradient-to-r from-western-accent to-western-leather">Book of Scams</span>
            <span className="px-2 py-1 bg-western-accent/10 text-western-accent text-xs font-bold rounded-full border-2 border-dashed border-western-accent/50">
              BOSC
            </span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Home
            </Link>
            <Link to="/most-wanted" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-western-wood hover:text-western-accent hover:scale-110 transform duration-200 font-western">
              Report Scammer
            </Link>
          </div>
          
          <div className="text-sm text-western-wood font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>
      </div>
    </footer>
  );
}
