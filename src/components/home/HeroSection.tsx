import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
export const HeroSection = () => {
  const isMobile = useIsMobile();
  return <section className="pt-12 pb-10 md:pt-24 md:pb-20 px-3 sm:px-4 old-paper">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="space-y-3 md:space-y-4 md:pr-8 animate-fade-in flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="font-wanted uppercase tracking-wide wanted-poster mx-auto md:mx-0 my-0 py-[15px] px-0 text-western-accent">
              <span className="block text-5xl md:text-6xl lg:text-7xl">BOOK OF</span>
              <span className="block text-[4.2rem] md:text-[4.9rem] lg:text-[5.6rem] -mt-2">SCAMS</span>
            </h1>
            
            <p className="sm:text-xl text-western-wood max-w-lg font-western text-xl -mt-10 md:-mt-14 mb-0 -mb-2 mx-auto md:mx-0">Book of Scams is a decentralised criminal registry bringing accountability and justice to The Wild West of crypto.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-4 w-full justify-center md:justify-start">
              <Button asChild size="default" className="western-btn gap-2 hover:animate-wiggle bg-western-leather hover:bg-western-accent text-western-parchment">
                <Link to="/most-wanted">
                  Most Wanted
                </Link>
              </Button>
              <Button asChild variant="outline" size="default" className="western-btn gap-2 border-2 border-dashed border-western-wood text-western-wood hover:animate-wiggle hover:bg-western-wood hover:text-western-parchment">
                <Link to="/create-listing">
                  Report Scammer
                  <BookOpen className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative h-[250px] sm:h-[350px] md:h-[450px] animate-fade-in mx-auto w-full max-w-[320px] sm:max-w-[400px] md:max-w-[500px] mt-6 md:mt-0">
            {/* Wanted poster */}
            <div className="absolute inset-0 transform rotate-1 bg-western-parchment border-4 border-western-wood rounded-sm shadow-lg">
              {/* Nail at the top center - even smaller on mobile */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
                <div className="w-4 h-4 sm:w-8 sm:h-8 bg-gray-600 rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-2.5 h-2.5 sm:w-6 sm:h-6 bg-gradient-to-br from-gray-500 to-gray-700 rounded-full shadow-inner flex items-center justify-center">
                    <div className="w-1 h-1 sm:w-3 sm:h-3 bg-gray-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              
              {/* Poster content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 mt-5">
                <h2 className="font-wanted uppercase text-center">
                  <div className="text-5xl sm:text-6xl text-western-accent font-bold tracking-wider mb-4">WANTED:</div>
                  <div className="text-xl sm:text-2xl md:text-3xl text-western-leather tracking-wide py-0 my-6 px-0 text-center">
                    SCAMMERS, GRIFTERS &<br />
                    PONZI SCHEMES
                  </div>
                </h2>
                
                {/* Optional: Decorative elements */}
                <div className="absolute top-0 left-0 right-0 h-8 bg-western-parchment opacity-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-western-parchment opacity-20 pointer-events-none"></div>
                
                {/* Cross pattern overlay for texture */}
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
              }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};