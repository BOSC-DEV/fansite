
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Award, BookOpen, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useWallet } from "@/context/WalletContext";

export const MobileNavigation = () => {
  const location = useLocation();
  const { isConnected, address } = useWallet();
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadUsername = async () => {
      if (isConnected && address) {
        try {
          const { storageService } = await import("@/services/storage");
          const profile = await storageService.getProfile(address);
          setUsername(profile?.username || null);
        } catch (error) {
          console.error("Error fetching profile for username:", error);
        }
      }
    };

    loadUsername();
  }, [isConnected, address]);

  const menuItems = [
    {
      path: "/",
      label: "Home",
      icon: <Home className="h-3.5 w-3.5" />
    },
    {
      path: "/most-wanted",
      label: "Most Wanted",
      icon: <Award className="h-3.5 w-3.5" />
    },
    {
      path: "/leaderboard",
      label: "Leaderboard",
      icon: <Trophy className="h-3.5 w-3.5" />
    },
    {
      path: "/create-listing",
      label: "Report",
      icon: <BookOpen className="h-3.5 w-3.5" />
    }
  ];

  if (isConnected) {
    menuItems.push({
      path: username ? `/${username}` : address ? `/user/${address}` : "/profile",
      label: "Profile",
      icon: <User className="h-3.5 w-3.5" />
    });
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-western-wood/90 backdrop-blur-sm border-t border-western-wood/50">
      <div className="flex justify-around">
        {menuItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex flex-col items-center py-1.5 px-2", 
              location.pathname === item.path 
                ? "text-western-parchment" 
                : "text-western-sand hover:text-western-parchment"
            )}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5 font-western">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
