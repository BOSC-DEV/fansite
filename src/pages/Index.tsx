
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedScammers } from "@/components/home/FeaturedScammers";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { WarningSection } from "@/components/home/WarningSection";
import { HomeFooter } from "@/components/home/HomeFooter";

const Index = () => {
  const { isConnected } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col old-paper cowboy-pattern">
      <div className="dust-swirl"></div>
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat" 
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      
      <Header />
      
      <main className="flex-grow">
        <HeroSection />
        <div className="relative">
          <div className="torn-edge-top"></div>
          <FeaturedScammers />
          <div className="torn-edge-bottom"></div>
        </div>
        <HowItWorksSection />
        <WarningSection />
      </main>
      
      <div className="relative mt-auto">
        <div className="absolute left-0 opacity-30 bottom-20 h-16 w-16 tumbleweed">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#8B4513" fillOpacity="0.5"/>
            <path d="M8 9C10 7 15 7 16 9" stroke="#6B4226" strokeWidth="1"/>
            <path d="M8 15C10 17 15 17 16 15" stroke="#6B4226" strokeWidth="1"/>
            <path d="M9 8C7 10 7 15 9 16" stroke="#6B4226" strokeWidth="1"/>
            <path d="M15 8C17 10 17 15 15 16" stroke="#6B4226" strokeWidth="1"/>
          </svg>
        </div>
        <HomeFooter />
      </div>
    </div>
  );
};

export default Index;
