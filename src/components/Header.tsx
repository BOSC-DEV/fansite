
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Wallet, List, FileText, Home, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isConnected, address, balance, connectWallet, disconnectWallet, connecting } = useWallet();
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
    if (isConnected) {
      disconnectWallet();
    } else {
      await connectWallet();
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const menuItems = [
    { path: "/", label: "Home", icon: <Home className="h-4 w-4 mr-2" /> },
    { path: "/most-wanted", label: "Most Wanted", icon: <List className="h-4 w-4 mr-2" /> },
    { path: "/create-listing", label: "Report Scammer", icon: <FileText className="h-4 w-4 mr-2" /> },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled
          ? "bg-white/80 dark:bg-navy/80 backdrop-blur-md py-3 shadow-sm"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
          <span className="text-bosc">Book of Scams</span>
          <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-medium rounded-full">
            $BOSC
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center text-sm font-medium transition-colors",
                location.pathname === item.path
                  ? "text-bosc"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">
                  {formatAddress(address || "")}
                </span>
                <span className="text-xs font-medium text-bosc">
                  {balance} $BOSC
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleConnectClick}
                className="h-9"
              >
                <Wallet className="h-4 w-4 mr-2" />
                Disconnect
              </Button>
            </div>
          ) : (
            <Button
              variant="default"
              size="sm"
              onClick={handleConnectClick}
              disabled={connecting}
              className="hidden md:flex h-9"
            >
              <Wallet className="h-4 w-4 mr-2" />
              {connecting ? "Connecting..." : "Connect Wallet"}
            </Button>
          )}

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 pt-16 z-40 bg-background/95 backdrop-blur-sm md:hidden animate-fade-in">
          <div className="container px-4 py-6 flex flex-col space-y-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center text-lg font-medium transition-colors py-2",
                  location.pathname === item.path
                    ? "text-bosc"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={closeMobileMenu}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t">
              {isConnected ? (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Wallet</span>
                    <span className="text-sm text-muted-foreground">
                      {formatAddress(address || "")}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Balance</span>
                    <span className="text-sm text-bosc font-medium">{balance} $BOSC</span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleConnectClick} className="w-full mt-2">
                    <Wallet className="h-4 w-4 mr-2" />
                    Disconnect
                  </Button>
                </div>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleConnectClick}
                  disabled={connecting}
                  className="w-full"
                >
                  <Wallet className="h-4 w-4 mr-2" />
                  {connecting ? "Connecting..." : "Connect Wallet"}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
