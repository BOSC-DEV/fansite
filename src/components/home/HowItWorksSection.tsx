
import { Ghost, Flame, PartyPopper } from "lucide-react";

export const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-impact text-transparent bg-clip-text bg-gradient-to-r from-meme-purple to-meme-blue mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Book of Scams uses blockchain technology to create a transparent, 
            community-funded system for tracking fraudsters.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card border-4 border-meme-green rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:-rotate-2">
            <div className="w-12 h-12 rounded-full bg-bosc/10 flex items-center justify-center mb-4">
              <Ghost className="h-6 w-6 text-bosc" />
            </div>
            <h3 className="text-xl font-bold mb-2">Report a Scammer</h3>
            <p className="text-muted-foreground">
              Create a listing with evidence for 1 BOSC token. Each listing generates a unique wallet.
            </p>
          </div>
          
          <div className="bg-card border-4 border-meme-yellow rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:rotate-2">
            <div className="w-12 h-12 rounded-full bg-bosc/10 flex items-center justify-center mb-4">
              <Flame className="h-6 w-6 text-bosc" />
            </div>
            <h3 className="text-xl font-bold mb-2">Add to Bounties</h3>
            <p className="text-muted-foreground">
              Contribute additional BOSC tokens to increase the bounty on scammers you want to prioritize.
            </p>
          </div>
          
          <div className="bg-card border-4 border-meme-blue rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:-rotate-2">
            <div className="w-12 h-12 rounded-full bg-bosc/10 flex items-center justify-center mb-4">
              <PartyPopper className="h-6 w-6 text-bosc" />
            </div>
            <h3 className="text-xl font-bold mb-2">Protect the Community</h3>
            <p className="text-muted-foreground">
              Help create a safer crypto space by making scammers identifiable and accountable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
