
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Shield, Flame } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-16 sm:pt-20 md:pt-32 pb-10 sm:pb-12 md:pb-24 px-4 sm:px-6 old-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-4 md:space-y-6 md:pr-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold bg-western-accent/10 text-western-accent border-2 border-dashed border-western-accent/50">
              <Star className="h-3.5 w-3.5 mr-1 animate-spin-slow" />
              <span>Authentic Wild West Bounties</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-wanted text-western-accent uppercase tracking-wide wanted-poster">
              BOOK OF SCAMS
            </h1>
            
            <p className="text-lg sm:text-xl text-western-wood max-w-lg font-western">
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
          
          <div className="relative mx-auto w-full max-w-[340px] sm:max-w-none md:max-w-[400px] animate-fade-in">
            <div className="wanted-poster-card transform -rotate-1 shadow-xl">
              <div className="bg-western-accent rounded-full w-full py-3 mb-4 flex items-center justify-center border-4 border-western-wood">
                <Star className="h-6 w-6 text-western-parchment" />
              </div>
              
              <h2 className="font-wanted text-2xl sm:text-3xl text-western-wood uppercase tracking-wide mb-3">
                WANTED: DEAD <br />OR ALIVE
              </h2>
              
              <p className="text-western-wood/90 max-w-md font-western text-base sm:text-lg px-4 pb-4">
                Join our posse to identify and track down the outlaws of the crypto frontier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
