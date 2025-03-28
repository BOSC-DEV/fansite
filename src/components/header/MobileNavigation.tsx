
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Wallet, Home, Award, Trophy, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileNavigationProps {
  menuItems: MenuItem[];
  connecting: boolean;
}

export const MobileNavigation = ({ menuItems, connecting }: MobileNavigationProps) => {
  const location = useLocation();
  const { isConnected, connectWallet } = useWallet();

  const handleConnectClick = async () => {
    if (!isConnected) {
      await connectWallet();
    }
  };

  // Create a simplified menu with the new labels
  const simplifiedMenu = [
    {
      path: "/",
      label: "Home",
      icon: <Home className="h-4 w-4" />
    },
    {
      path: "/most-wanted",
      label: "Wanted",
      icon: <Award className="h-4 w-4" />
    },
    {
      path: "/leaderboard",
      label: "Stats",
      icon: <Trophy className="h-4 w-4" />
    },
    {
      path: "/create-listing",
      label: "Report",
      icon: <BookOpen className="h-4 w-4" />
    }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center bg-western-wood/90 backdrop-blur-sm shadow-lg py-3 px-2 z-50">
      {simplifiedMenu.map(item => (
        <Link 
          key={item.path} 
          to={item.path} 
          className={cn(
            "flex flex-col items-center justify-center p-2 rounded-lg transition-colors flex-1 mx-1", 
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
          className="flex flex-col items-center justify-center p-2 h-auto text-western-sand hover:text-western-parchment flex-1 mx-1"
        >
          <Wallet className="h-4 w-4" />
          <span className="text-xs mt-1 font-western">
            {connecting ? "..." : "Connect"}
          </span>
        </Button>
      )}
    </div>
  );
};

export default MobileNavigation;
