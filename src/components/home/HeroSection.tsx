
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, BookOpen } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 old-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-8 animate-fade-in">            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-wanted text-western-accent uppercase tracking-wide wanted-poster">
              BOOK OF SCAMS
            </h1>
            
            <p className="text-xl text-western-wood max-w-lg font-western">
              A <span className="font-bold text-western-leather">decentralized registry</span> keeping track of 
              <span className="font-bold text-western-accent"> crypto scammers</span> and 
              <span className="font-bold text-western-wood"> fraudsters</span>, with 
              <span className="font-bold text-bosc"> community-funded bounties</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild size="lg" className="western-btn gap-2 hover:animate-wiggle bg-western-leather hover:bg-western-accent text-western-parchment">
                <Link to="/most-wanted">
                  View Most Wanted
                  <Star className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="western-btn gap-2 border-2 border-dashed border-western-wood hover:animate-wiggle hover:bg-western-parchment/80">
                <Link to="/create-listing">
                  Report a Scammer
                  <BookOpen className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[400px] animate-fade-in overflow-hidden transform -rotate-1 shadow-lg">
            <div className="sheriff-badge-large w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-western-leather/30 via-western-accent/20 to-western-parchment/50 opacity-70"></div>
              <div className="relative text-center space-y-4 p-6">
                <h2 className="font-wanted text-3xl text-western-leather uppercase tracking-wide">Wanted: Dead or Alive</h2>
                <div className="flex justify-center">
                  <Star className="h-12 w-12 text-western-parchment/80 animate-spin-slow" />
                </div>
                <p className="text-western-wood/90 max-w-md font-western text-lg">
                  Join our posse to identify and track down the outlaws of the crypto frontier.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
