
import React from "react";
import { Home, Award, Trophy, BookOpen, User, Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";

export const useHeaderMenuItems = () => {
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
          setUsername(null);
        }
      } else {
        setUsername(null);
      }
    };

    loadUsername();
  }, [isConnected, address]);

  const menuItems = [{
    path: "/",
    label: "Home",
    icon: <Home className="h-5 w-5" />
  }, {
    path: "/most-wanted",
    label: "Most Wanted",
    icon: <Award className="h-5 w-5" />
  }, {
    path: "/leaderboard",
    label: "Leaderboard",
    icon: <Trophy className="h-5 w-5" />
  }, {
    path: "/create-listing",
    label: "Report",
    icon: <BookOpen className="h-5 w-5" />
  }];

  if (isConnected) {
    menuItems.push({
      path: username ? `/${username}` : address ? `/user/${address}` : "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />
    });
  }

  return menuItems;
};

export default useHeaderMenuItems;
