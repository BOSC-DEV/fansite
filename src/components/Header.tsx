import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, Home, Award, BookOpen, User, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileButton } from "./profile/ProfileButton";
import { useIsMobile } from "@/hooks/use-mobile";
import { toast } from "sonner";
import { storageService } from "@/services/storage";
import { SolAmount } from "./SolAmount";

export const Header = () => {
  const {
    isConnected,
    address,
    balance,
    connectWallet,
    connecting,
  } = useWallet();
  const [isScrolled, setIsScrolled] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const location = useLocation();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (isConnected && address) {
        try {
          const profile = await storageService.getProfile(address);
          setUsername(profile?.username || null);
        } catch (error) {
          console.error("Error fetching profile for username:", error);
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
    };

    fetchProfile();
  }, [isConnected, address]);

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
    icon: <Home className="h-4 w-4" />
  }, {
    path: "/most-wanted",
    label: "Most Wanted",
    icon: <Award className="h-4 w-4" />
  }, {
    path: "/leaderboard",
    label: "Leaderboard",
    icon: <Trophy className="h-4 w-4" />
  }, {
    path: "/create-listing",
    label: "Report",
    icon: <BookOpen className="h-4 w-4" />
  }];

  if (isConnected) {
    menuItems.push({
      path: username ? `/${username}` : address ? `/user/${address}` : "/profile",
      label: "Profile",
      icon: <User className="h-4 w-4" />
    });
  }

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out wood-texture", 
      isScrolled ? "py-3 shadow-md" : "py-5")}>
      <div className="container mx-auto px-4 flex items-center">
        <div className="flex-shrink-0 mr-8">
          <Link to="/" className="flex items-center space-x-2 text-xl">
            <span className="font-wanted text-western-parchment"></span>
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center">
          <div className="flex space-x-10">
            {menuItems.map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className={cn(
                  "flex items-center text-sm font-bold transition-colors hover:scale-110 transform duration-200 font-western", 
                  location.pathname === item.path ? "text-western-parchment" : "text-western-sand hover:text-western-parchment"
                )}
              >
                {item.icon}
                <span className="ml-2">{item.label}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className="flex items-center ml-auto">
          {isConnected ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-western-parchment/70">
                  {formatAddress(address || "")}
                </span>
                <div className="flex items-center text-xs font-bold text-western-sand">
                  <img 
                    src="/lovable-uploads/b56ce7fa-4bb2-4920-b10e-4b0c6907f0ec.png" 
                    alt="SOL"
                    className="h-4 w-4 mr-1" 
                    style={{ objectFit: "contain" }}
                  />
                  {balance !== null ? (
                    <span><SolAmount amount={balance} /></span>
                  ) : (
                    <span>0.00 SOL</span>
                  )}
                </div>
              </div>
              <ProfileButton />
            </div>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleConnectClick} 
              disabled={connecting} 
              className="hidden md:flex h-9 animate-pulse-subtle bg-western-accent text-western-parchment hover:bg-western-accent/80"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {connecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}

          {isMobile && (
            <div className="md:hidden flex items-center">
              <div className="fixed bottom-0 left-0 right-0 flex justify-around items-center bg-western-wood/90 backdrop-blur-sm shadow-lg py-3 px-2 z-50">
                {menuItems.map(item => (
                  <Link 
                    key={item.path} 
                    to={item.path} 
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-lg transition-colors", 
                      location.pathname === item.path ? "text-western-parchment bg-western-accent/30" : "text-western-sand hover:text-western-parchment"
                    )}
                  >
                    {item.icon}
                    <span className="text-xs mt-1 font-western">{item.label}</span>
                  </Link>
                ))}
                
                {!isConnected && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleConnectClick} 
                    disabled={connecting} 
                    className="flex flex-col items-center justify-center p-2 h-auto text-western-sand hover:text-western-parchment"
                  >
                    <Wallet className="h-4 w-4" />
                    <span className="text-xs mt-1 font-western">
                      {connecting ? "..." : "Connect"}
                    </span>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
