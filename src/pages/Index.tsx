
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import ScammerCard from "@/components/ScammerCard";
import { MOCK_SCAMMERS } from "@/lib/types";
import { ArrowRight, FileText, List, Shield, DollarSign, AlertTriangle, Zap, Skull, Ghost, PartyPopper, Flame } from "lucide-react";

const Index = () => {
  const { isConnected } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [featuredScammers, setFeaturedScammers] = useState(MOCK_SCAMMERS.slice(0, 3));

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
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

      {/* Featured Scammers Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-impact text-transparent bg-clip-text bg-gradient-to-r from-meme-red to-bosc">Most Wanted</h2>
              <p className="text-muted-foreground">Recently added high-profile scammers</p>
            </div>
            <Button asChild variant="ghost" className="gap-1 hover:animate-wiggle">
              <Link to="/most-wanted">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredScammers.map((scammer) => (
              <ScammerCard key={scammer.id} scammer={scammer} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
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
                Create a listing with evidence for 1 $BOSC token. Each listing generates a unique wallet.
              </p>
            </div>
            
            <div className="bg-card border-4 border-meme-yellow rounded-xl p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform hover:rotate-2">
              <div className="w-12 h-12 rounded-full bg-bosc/10 flex items-center justify-center mb-4">
                <Flame className="h-6 w-6 text-bosc" />
              </div>
              <h3 className="text-xl font-bold mb-2">Add to Bounties</h3>
              <p className="text-muted-foreground">
                Contribute additional $BOSC tokens to increase the bounty on scammers you want to prioritize.
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

      {/* Warning Section */}
      <section className="py-16 bg-alert/5">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-full bg-alert/10 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-8 w-8 text-alert animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Important Disclaimer</h2>
              <p className="text-muted-foreground">
                The Book of Scams is a community-driven platform. All listings should be supported by evidence, 
                but users are encouraged to conduct their own research. False accusations may have legal consequences.
                The $BOSC token is used solely for platform functionality and does not constitute investment advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-5 w-5 text-bosc" />
              <span className="font-impact text-transparent bg-clip-text bg-gradient-to-r from-bosc to-meme-red">Book of Scams</span>
              <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-bold rounded-full border-2 border-dashed border-bosc/50">
                $BOSC
              </span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground hover:scale-110 transform duration-200">
                Home
              </Link>
              <Link to="/most-wanted" className="text-sm text-muted-foreground hover:text-foreground hover:scale-110 transform duration-200">
                Most Wanted
              </Link>
              <Link to="/create-listing" className="text-sm text-muted-foreground hover:text-foreground hover:scale-110 transform duration-200">
                Report Scammer
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Book of Scams
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
