
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="py-8 border-t border-western-wood wood-texture">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
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
        
        <div className="border-t border-western-wood/20 pt-4 text-center">
          <div className="text-sm text-western-parchment/80 max-w-2xl mx-auto">
            <p className="mb-2 font-wanted">BOSC is a public good. To support it, send any token to our multi-sig</p>
            <div className="flex items-center justify-center space-x-2">
              <code className="bg-western-wood/10 py-1 px-3 rounded text-western-parchment">A6X5A7ZSvez8BK82Z5tnZJC3qarGbsxRVv8Hc3DKBiZx</code>
              <a 
                href="https://solscan.io/account/A6X5A7ZSvez8BK82Z5tnZJC3qarGbsxRVv8Hc3DKBiZx" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-western-sand hover:text-western-accent"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
