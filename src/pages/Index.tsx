
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedScammers } from "@/components/home/FeaturedScammers";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { WarningSection } from "@/components/home/WarningSection";
import { Helmet } from "react-helmet-async";
import { useSolanaPrice } from "@/utils/priceUtils";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { isConnected } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();
  
  // Preload Solana price on the homepage
  const { data: solPrice } = useSolanaPrice();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Make sure image URLs are absolute for Twitter cards
  const logoUrl = "https://bookofscams.lol/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png";
  const bannerUrl = "https://bookofscams.lol/lovable-uploads/35ca060f-4b79-4d9a-b6df-72323cdf7506.png";
  const siteUrl = "https://bookofscams.lol/";

  return (
    <div className="flex flex-col min-h-screen old-paper cowboy-pattern">
      <Helmet>
        <title>BOSC - Book of Scams</title>
        <meta name="description" content="BOSC - Draining the swamp, recording history and bringing whatever justice we can to on-chain terrorists" />
        <link rel="canonical" href={siteUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="BOSC - Book of Scams" />
        <meta property="og:description" content="BOSC - Draining the swamp, recording history and bringing whatever justice we can to on-chain terrorists" />
        <meta property="og:image" content={bannerUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@bookofscamslol" />
        <meta name="twitter:creator" content="@bookofscamslol" />
        <meta name="twitter:url" content={siteUrl} />
        <meta name="twitter:title" content="BOSC - Book of Scams" />
        <meta name="twitter:description" content="BOSC - Draining the swamp, recording history and bringing whatever justice we can to on-chain terrorists" />
        <meta name="twitter:image" content={bannerUrl} />
        <meta name="twitter:image:alt" content="Book of Scams - BOSC" />
      </Helmet>
      
      <div className="dust-swirl"></div>
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-repeat" 
           style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B4513' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
      
      <main className="flex-grow">
        <HeroSection />
        <div className="relative">
          <div className="torn-edge-top"></div>
          <FeaturedScammers limit={6} />
          <div className="torn-edge-bottom"></div>
        </div>
        <HowItWorksSection />
        <WarningSection />
      </main>
    </div>
  );
};

export default Index;
