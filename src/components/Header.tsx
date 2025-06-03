
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Wallet, Twitter, Github, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileButton } from "./profile/ProfileButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
import { MobileDrawer } from "./header/MobileDrawer";
import { WalletInfo } from "./header/WalletInfo";
import { useHeaderMenuItems } from "@/hooks/useHeaderMenuItems";

export const Header = () => {
  const {
    isConnected,
    address,
    balance,
    connectWallet,
    connecting,
  } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const menuItems = useHeaderMenuItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnectClick = async () => {
    if (!isConnected) {
      await connectWallet();
    }
  };

  // For mobile, return the navigation plus the social icons at top
  if (isMobile) {
    return (
      <>
        {/* Top Header for Mobile with Social Icons and Burger Menu */}
        <div className="fixed top-0 left-0 right-0 z-50 wood-texture py-2 px-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <a 
              href="https://github.com/BOSC-DEV/BOSC-APP" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-western-parchment hover:text-western-sand transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            
            <a 
              href="https://x.com/bookofscamslol" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-western-parchment hover:text-western-sand transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            
            <a 
              href="mailto:dev@bookofscamslol" 
              className="text-western-parchment hover:text-western-sand transition-colors"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>

          <MobileDrawer menuItems={menuItems} />
        </div>

        {/* Bottom Navigation */}
        <MobileNavigation menuItems={menuItems} connecting={connecting} />
      </>
    );
  }

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out wood-texture", 
      isScrolled ? "py-3 shadow-md" : "py-5")}>
      <div className="container mx-auto px-4 flex items-center">
        <Logo />
        
        <DesktopNavigation menuItems={menuItems} />

        <div className="flex items-center ml-auto">
          {isConnected ? (
            <div className="flex items-center space-x-4">
              {address && <WalletInfo address={address} balance={balance} />}
              <ProfileButton />
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleConnectClick} 
                disabled={connecting} 
                className="h-10 animate-pulse-subtle bg-western-accent text-western-parchment hover:bg-western-accent/80 flex items-center"
              >
                <Wallet className="h-5 w-5" />
              </Button>
              <span className="text-western-sand font-western text-sm mt-1">Connect</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
