
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Shield, Flame } from "lucide-react";
export const HeroSection = () => {
  return <section className="pt-20 pb-12 md:pt-32 md:pb-24 px-3 sm:px-4 old-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-4 md:space-y-6 md:pr-8 animate-fade-in">
            <h1 className="sm:text-5xl md:text-6xl lg:text-7xl font-wanted text-western-accent uppercase tracking-wide wanted-poster mx-0 my-0 py-[20px] text-7xl px-0">$BOSC</h1>
            
            <p className="sm:text-xl text-western-wood max-w-lg font-western text-xl">Draining the swamp, recording history and bringing whatever justice we can to on-chain terrorists.</p>
            
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
          
          <div className="relative h-[250px] sm:h-[300px] md:h-[400px] animate-fade-in rounded-sm overflow-hidden border-4 border-western-wood transform -rotate-1 shadow-lg wanted-poster-bg mx-auto w-full max-w-[320px] sm:max-w-none">
            <div className="absolute inset-0 bg-gradient-to-br from-western-leather/30 via-western-accent/20 to-western-parchment/50 opacity-70 rounded-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center text-western-wood p-4 sm:p-6">
              <div className="text-center space-y-4">
                <div className="sheriff-badge inline-block p-3 sm:p-4 bg-western-accent/80 rounded-full border-4 border-western-wood flex items-center justify-center animate-bounce-slight py-px px-[2px]">
                  <Star className="h-8 w-8 sm:h-12 sm:w-12 text-western-parchment" />
                </div>
                <h2 className="font-wanted text-2xl sm:text-3xl text-western-leather uppercase tracking-wide py-0 my-[5px] px-0">WANTED: FOR CRIMES AGAINST DEGENERACY</h2>
                <p className="text-western-wood/90 max-w-md font-western text-base sm:text-lg px-2"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
