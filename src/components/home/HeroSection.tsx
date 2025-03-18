
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Flame, Skull, Ghost, Shield } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 md:pr-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-bold bg-bosc/10 text-bosc border-2 border-dashed border-bosc/50">
              <Flame className="h-3.5 w-3.5 mr-1 animate-spin-slow" />
              <span>Powered by $BOSC Token</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-impact text-transparent bg-clip-text bg-gradient-to-r from-meme-red via-bosc to-meme-purple tracking-wide">
              BOOK OF SCAMS
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg">
              A <span className="font-bold text-meme-blue">decentralized registry</span> keeping track of 
              <span className="font-bold text-meme-red"> crypto scammers</span> and 
              <span className="font-bold text-meme-green"> fraudsters</span>, with 
              <span className="font-bold text-bosc"> community-funded bounties</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button asChild size="lg" className="gap-2 animate-bounce-slight">
                <Link to="/most-wanted">
                  View Most Wanted
                  <Skull className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 border-2 border-dashed hover:animate-wiggle">
                <Link to="/create-listing">
                  Report a Scammer
                  <Ghost className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[300px] md:h-[400px] animate-fade-in rounded-2xl overflow-hidden border-4 border-meme-blue transform -rotate-1 shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-bosc opacity-50 rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white p-6">
              <div className="text-center space-y-4">
                <Shield className="h-16 w-16 mx-auto text-white/90 animate-bounce-slight" />
                <h2 className="meme-text text-2xl">Protecting the Community</h2>
                <p className="text-white/80 max-w-md">
                  Join our community-driven effort to identify and track bad actors in the crypto space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
