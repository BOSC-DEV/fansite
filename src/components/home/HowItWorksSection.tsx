
import { BookOpen, Shield, PartyPopper, FileText } from "lucide-react";

export const HowItWorksSection = () => {
  return (
    <section className="py-16 relative wood-texture text-western-parchment">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-wanted text-western-parchment mb-4 tracking-wide">The Sheriff's Guide</h2>
          <p className="text-western-parchment/90 max-w-2xl mx-auto font-western">
            Book of Scams uses blockchain technology to create a transparent, 
            community-funded system for tracking outlaws of the crypto frontier.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-western-leather/80 border-4 border-western-accent/70 rounded-sm p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:-rotate-2 paper-texture">
            <div className="w-16 h-16 rounded-full bg-western-parchment/90 flex items-center justify-center mb-4 border-2 border-western-wood">
              <BookOpen className="h-8 w-8 text-western-accent" />
            </div>
            <h3 className="text-xl font-wanted mb-2 text-western-sand">Report an Outlaw</h3>
            <p className="text-western-parchment font-western">
              Post a bounty with evidence for 1 BOSC token. Each listing creates a unique wallet for tracking.
            </p>
          </div>
          
          <div className="bg-western-leather/80 border-4 border-western-accent/70 rounded-sm p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:rotate-2 paper-texture">
            <div className="w-16 h-16 rounded-full bg-western-parchment/90 flex items-center justify-center mb-4 border-2 border-western-wood">
              <FileText className="h-8 w-8 text-western-accent" />
            </div>
            <h3 className="text-xl font-wanted mb-2 text-western-sand">Add to Bounties</h3>
            <p className="text-western-parchment font-western">
              Contribute more BOSC tokens to increase the bounty on outlaws you want brought to justice.
            </p>
          </div>
          
          <div className="bg-western-leather/80 border-4 border-western-accent/70 rounded-sm p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:-rotate-2 paper-texture">
            <div className="w-16 h-16 rounded-full bg-western-parchment/90 flex items-center justify-center mb-4 border-2 border-western-wood">
              <Shield className="h-8 w-8 text-western-accent" />
            </div>
            <h3 className="text-xl font-wanted mb-2 text-western-sand">Protect the Territory</h3>
            <p className="text-western-parchment font-western">
              Help create a safer crypto frontier by making outlaws identifiable and accountable.
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-4 left-4 opacity-30 h-12 w-12 tumbleweed">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#FEF7CD" fillOpacity="0.5"/>
          <path d="M8 9C10 7 15 7 16 9" stroke="#FEF7CD" strokeWidth="1"/>
          <path d="M8 15C10 17 15 17 16 15" stroke="#FEF7CD" strokeWidth="1"/>
          <path d="M9 8C7 10 7 15 9 16" stroke="#FEF7CD" strokeWidth="1"/>
          <path d="M15 8C17 10 17 15 15 16" stroke="#FEF7CD" strokeWidth="1"/>
        </svg>
      </div>
    </section>
  );
};
