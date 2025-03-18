
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Hat, Cactus, Shield, Scroll } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 old-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold bg-western-accent/10 text-western-accent border-2 border-dashed border-western-accent/50">
              <Scroll className="h-3.5 w-3.5 mr-1 animate-spin-slow" />
              <span>Authentic Wild West Bounties</span>
            </div>
            
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
                  <Hat className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="western-btn gap-2 border-2 border-dashed border-western-wood hover:animate-wiggle hover:bg-western-parchment/80">
                <Link to="/create-listing">
                  Report a Scammer
                  <Cactus className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[400px] animate-fade-in rounded-sm overflow-hidden border-4 border-western-wood transform -rotate-1 shadow-lg wanted-poster-bg">
            <div className="absolute inset-0 bg-gradient-to-br from-western-leather/30 via-western-accent/20 to-western-parchment/50 opacity-70 rounded-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center text-western-wood p-6">
              <div className="text-center space-y-4">
                <div className="sheriff-badge inline-block p-4 bg-western-accent/80 rounded-full border-4 border-western-wood flex items-center justify-center animate-bounce-slight">
                  <Shield className="h-12 w-12 text-western-parchment" />
                </div>
                <h2 className="font-wanted text-3xl text-western-leather uppercase tracking-wide">Wanted: Dead or Alive</h2>
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
