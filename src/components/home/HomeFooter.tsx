
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export const HomeFooter = () => {
  return (
    <footer className="py-8 border-t-2 border-western-leather/30 bg-western-parchment/10">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative w-6 h-6">
              <Leaf className="absolute text-western-accent transform rotate-[30deg] w-5 h-5" />
              <div className="absolute bottom-0 left-0 right-0 h-3 bg-western-parchment rounded-full transform translate-y-1/4 opacity-80"></div>
            </div>
            <span className="font-wanted text-transparent bg-clip-text bg-gradient-to-r from-western-accent to-western-leather">Book of Scams</span>
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
