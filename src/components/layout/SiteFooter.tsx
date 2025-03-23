
import { Link } from "react-router-dom";

export const SiteFooter = () => {
  return <footer className="py-8 border-t border-western-wood wood-texture">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <span className="text-xl font-wanted text-zinc-950">Book of Scams</span>
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-western-parchment hover:text-western-sand font-western">
              Saloon
            </Link>
            <Link to="/most-wanted" className="text-sm text-western-parchment hover:text-western-sand font-western">
              Most Wanted
            </Link>
            <Link to="/create-listing" className="text-sm text-western-parchment hover:text-western-sand font-western">
              Report Outlaw
            </Link>
          </div>
          
          <div className="text-sm text-western-parchment/70 font-western">
            &copy; {new Date().getFullYear()} Book of Scams
          </div>
        </div>
      </div>
    </footer>;
};
