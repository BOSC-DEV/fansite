
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Wallet, Home, Award, BookOpen, User, Trophy, FileText, Coins } from "lucide-react";
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
    disconnectWallet
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
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjIiIGhlaWdodD0iMTAwIj48cGF0aCBmaWxsPSIjQTY2N0Y4IiBkPSJNOTAuODA3IDUuNDRBNDAuOTM3IDQwLjkzNyAwIDAgMCA5Ny42MDcuODAzYTQyLjQ1NyA0Mi40NTcgMCAwIDEgOC4xMjggMTEuMDQgMTYuOTYzIDE2Ljk2MyAwIDAgMS0xNC45MjgtNi40MDNtLTU5LjU5MyAwYTE2Ljk2OCAxNi45NjggMCAwIDEtMTQuOTMgNi40MDNBNDI0OTUgNDIuNDk1IDAgMCAxIDI0LjQxMy44MDNhNDA5MzcgNDAuOTM3IDAgMCAwIDYuODAxIDQuNjM3TTEzLjI3NiA3MC4xNjJhNDAgNDAgMCAwIDAgMi4zMjggOC4wMTggMzguMjYyIDM4LjI2MiAwIDAgMS05LjEwMSAxLjAyNmMyLjczOC03LjYzIDE0LjcyNS04LjE5MSAxNC43MjUtOC4xOTFhMzguODgyIDM4Ljg4MiAwIDAgMC03Ljk1Mi0uODUzbTk1LjQ2OSAwYTM4LjI5NSAzOC4yOTUgMCAwIDAtNy45NTMuODUzcy4xOTkuMDEgMTQuNzI2IDguMTkxYTM4Ljc0IDM4Ljc0IDAgMCAxLTkuMTAxLTEuMDI2YzEuMTQtMi41ODUgMS45MTctNS4yNjQgMi4zMjgtOC4wMThtLTg3LjMyNS00MGE0MS4zMSA0MS4zMSAwIDAgMC0yLjkxMyA4LjM5OSAzNy45OTYgMzcuOTk2IDAgMCAxLTYuMDQ0LTYuODY0IDQ0LjUxMSA0NC41MTEgMCAwIDEgNi4wMjQtNi4zNDhjLjY0NCAxLjU3MyAxLjYzMiAzLjM1MSAyLjkzMyA0LjgxM20yLjEzMyAzMi40MTNhNDMuNzQ3IDQzLjc0NyAwIDAgMS05Ljk5LTEuNDA4Yy40MzUtMS43MTkgMS4yMDUtMy40MTUgMi4yOS01LjA5QTQ0LjYwMiA0NC42MDIgMCAwIDEgMTkuNSA2MGMxLjYzNy44MjggMy4yNTIgMS4wMiA0LjA1MyAxLjA1OG00MC40NDctNDguNGMtMTAuNDM4IDAtMTIuOTA0LjYyNC0xNi44IDMuOS00LjIxMiAzLjU0OS01LjYxOSA4LjA4MS02LjM5OCAxMC43NjZhMzUuNzIzIDM1LjcyMyAwIDAgMC0uNzU1IDMuMTRoNDcuOTA2Yy0uMTg2LTEuMDgyLS40NC0yLjE1My0uNzU1LTMuMTQtLjc3OS0yLjY4NS0yLjE4Ni03LjIxNy02LjM5OC0xMC43NjYtMy44OTYtMy4yNzYtNi4zNjItMy45LTE2LjgtMy45bTAgNTUuMDc0YzEwLjQzOCAwIDEyLjkwNC0uNjIzIDE2LjgtMy45IDMuNTA3LTIuOTUzIDQuOTM0LTYuNDk2IDUuODUzLTkuMDkyLjk4LTIuNzY3IDEuMzAxLTQuODYyIDEuMy00Ljg1OEgyOS4wNDdjMCAwIC4zMjEgMi4wOTEgMS4zIDQuODU4LjkyIDIuNTk2IDIuMzQ2IDYuMTM5IDUuODUzIDkuMDkyIDMuODk2IDMuMjc3IDYuMzYyIDMuOSAxNi44IDMuOU00My4yOTYgNDMuMTc1SDc4LjcwNHYxMy42MTNINDMuMjk2VjQzLjE3NW01OC4yNjUgMTkuNDAyYy44LjAzNyAyLjQxNi4yMyA0LjA1MiAxLjA1N2E0NC42MDIgNDQuNjAyIDAgMCAxIDMuNjQ4LTQuMTRjMS4wOTcgMS42NzUgMS44NzQgMy4zODQgMi4zMTYgNS4xMjJsLS4wMjUtLjAzMmE0My43NDcgNDMuNzQ3IDAgMCAxLTkuOTkgMS40MDdtNi45ODYtMjQuMTQ3YzAtMS40NjYgMi4yODktMy40NiAyLjkzMy00LjgxM2E0NC41MTEgNDQuNTExIDAgMCAxIDYuMDI0IDYuMzQ4Yy0xLjggMi4zNjUtMy44MTQgNC43My02LjA0NCA2Ljg2NEE0MS4zMSA0MS4zMSAwIDAgMCAxMDguNTQ3IDQyLjQzeiIvPjwvc3ZnPg==" 
                    alt="SOL"
                    className="h-3 w-3 mr-1" 
                  />
                  {balance !== null ? (
                    <span>{balance} SOL</span>
                  ) : (
                    <span>0 SOL</span>
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
