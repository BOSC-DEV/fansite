
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
      <Header />
      <HeroSection />
      <FeaturedScammers />
      <HowItWorksSection />
      <WarningSection />
      <HomeFooter />
    </div>
  );
};

export default Index;
