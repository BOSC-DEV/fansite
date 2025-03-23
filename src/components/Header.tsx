import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Link, useLocation } from "react-router-dom";
import { Wallet, Menu, X, Home, BookOpen, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileButton } from "./profile/ProfileButton";
export const Header = () => {
  const {
    isConnected,
    address,
    balance,
    connectWallet,
    connecting
  } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
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
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  const menuItems = [{
    path: "/",
    label: "Home",
    icon: <Home className="h-4 w-4 mr-2" />
  }, {
    path: "/most-wanted",
    label: "Most Wanted",
    icon: <Award className="h-4 w-4 mr-2" />
  }, {
    path: "/create-listing",
    label: "Report Scammer",
    icon: <BookOpen className="h-4 w-4 mr-2" />
  }];
  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out wood-texture", isScrolled ? "py-3 shadow-md" : "py-5")}>
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl">
          <span className="font-wanted text-western-parchment"></span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center text-sm font-bold transition-colors hover:scale-110 transform duration-200 font-western", location.pathname === item.path ? "text-western-parchment" : "text-western-sand hover:text-western-parchment")}>
              {item.icon}
              {item.label}
            </Link>)}
        </nav>

        <div className="flex items-center space-x-4">
          {isConnected ? <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-western-parchment/70">
                  {formatAddress(address || "")}
                </span>
                <span className="text-xs font-bold text-western-sand">
                  {balance} BOSC
                </span>
              </div>
              
              <ProfileButton />
            </div> : <Button variant="default" size="sm" onClick={handleConnectClick} disabled={connecting} className="hidden md:flex h-9 animate-pulse-subtle bg-western-accent text-western-parchment hover:bg-western-accent/80">
              <Wallet className="h-4 w-4 mr-2" />
              {connecting ? "Connecting..." : "Connect Wallet"}
            </Button>}

          <Button variant="ghost" size="icon" className="md:hidden text-western-parchment hover:bg-western-wood/50" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && <div className="fixed inset-0 pt-16 z-40 wood-texture md:hidden animate-fade-in">
          <div className="container px-4 py-6 flex flex-col space-y-6">
            {menuItems.map(item => <Link key={item.path} to={item.path} className={cn("flex items-center text-lg font-bold transition-colors py-2 font-western", location.pathname === item.path ? "text-western-parchment" : "text-western-sand hover:text-western-parchment")} onClick={closeMobileMenu}>
                {item.icon}
                {item.label}
              </Link>)}
            
            <div className="pt-4 border-t border-western-sand/30">
              {isConnected ? <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-western-parchment">Wallet</span>
                    <span className="text-sm text-western-sand">
                      {formatAddress(address || "")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-western-parchment">Balance</span>
                    <span className="text-sm text-western-sand font-bold">{balance} BOSC</span>
                  </div>
                  
                  <Link to="/profile" className="flex items-center justify-between">
                    <span className="text-sm font-medium text-western-parchment">Profile</span>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-western-sand hover:text-western-parchment">
                      <span>Manage</span>
                    </Button>
                  </Link>
                </div> : <Button variant="default" size="sm" onClick={handleConnectClick} disabled={connecting} className="w-full bg-western-accent text-western-parchment hover:bg-western-accent/80">
                  <Wallet className="h-4 w-4 mr-2" />
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </Button>}
            </div>
          </div>
        </div>}
    </header>;
};
export default Header;