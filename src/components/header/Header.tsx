
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "./Logo";
import { ProfileButton } from "../profile/ProfileButton";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { Link } from "react-router-dom";
import { Home, Award, BookOpen, Trophy } from "lucide-react";

export const Header = () => {
  const { isConnected, connectWallet, connecting } = useWallet();
  const isMobile = useIsMobile();

  const handleConnectClick = async () => {
    if (!isConnected) {
      await connectWallet();
    }
  };

  // Navigation links for desktop header
  const navLinks = [
    { to: "/", label: "Home", icon: <Home className="h-4 w-4 mr-1.5" /> },
    { to: "/most-wanted", label: "Most Wanted", icon: <Award className="h-4 w-4 mr-1.5" /> },
    { to: "/leaderboard", label: "Leaderboard", icon: <Trophy className="h-4 w-4 mr-1.5" /> },
    { to: "/create-listing", label: "Report", icon: <BookOpen className="h-4 w-4 mr-1.5" /> }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 wood-texture border-b border-western-wood/50">
      <div className="container px-2 mx-auto flex items-center justify-between">
        {isMobile ? (
          // Mobile header - compact version
          <div className="py-1 flex w-full items-center justify-between">
            <Logo />
            
            {!isConnected ? (
              <Button 
                variant="default" 
                size="sm" 
                onClick={handleConnectClick} 
                disabled={connecting} 
                className="bg-western-accent text-western-parchment hover:bg-western-accent/80 h-6 text-xs"
              >
                <Wallet className="h-3 w-3 mr-1" />
                {connecting ? "..." : "Connect"}
              </Button>
            ) : (
              <ProfileButton />
            )}
          </div>
        ) : (
          // Desktop header - with centered navigation
          <div className="py-2 flex w-full items-center">
            <div className="flex-none">
              <Logo />
            </div>
            
            <div className="flex-1 flex justify-center">
              <nav className="flex space-x-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.to}
                    to={link.to}
                    className="flex items-center text-western-sand hover:text-western-parchment font-western text-sm transition-colors"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            
            <div className="flex-none">
              {!isConnected ? (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={handleConnectClick} 
                  disabled={connecting} 
                  className="bg-western-accent text-western-parchment hover:bg-western-accent/80 h-8 text-sm"
                >
                  <Wallet className="h-3.5 w-3.5 mr-1.5" />
                  {connecting ? "..." : "Connect Wallet"}
                </Button>
              ) : (
                <ProfileButton />
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
