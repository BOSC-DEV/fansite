
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileButton } from "./profile/ProfileButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { Logo } from "./header/Logo";
import { DesktopNavigation } from "./header/DesktopNavigation";
import { MobileNavigation } from "./header/MobileNavigation";
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

  return (
    <>
      <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out wood-texture", 
        isScrolled ? "py-3 shadow-md" : "py-5")}>
        <div className="container mx-auto px-4 flex items-center">
          <Logo />
          
          {!isMobile && <DesktopNavigation menuItems={menuItems} />}

          <div className="flex items-center ml-auto">
            {isConnected ? (
              <div className="flex items-center space-x-4">
                {address && !isMobile && <WalletInfo address={address} balance={balance} />}
                <ProfileButton />
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleConnectClick} 
                disabled={connecting} 
                className="h-9 animate-pulse-subtle bg-western-accent text-western-parchment hover:bg-western-accent/80"
              >
                <Wallet className="h-4 w-4 mr-2" />
                {connecting ? "Connecting..." : isMobile ? "Connect" : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </header>
      
      {isMobile && <MobileNavigation menuItems={menuItems} connecting={connecting} />}
    </>
  );
};

export default Header;
