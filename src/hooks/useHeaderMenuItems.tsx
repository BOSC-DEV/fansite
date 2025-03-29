
import React from "react";
import { Home, Award, Trophy, BookOpen, User, Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/integrations/supabase/client";

export const useHeaderMenuItems = () => {
  const { isConnected, address } = useWallet();
  const [username, setUsername] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadUsername = async () => {
      if (!isConnected || !address) {
        setUsername(null);
        return;
      }
      
      try {
        // Check Supabase first
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('wallet_address', address)
          .maybeSingle();
          
        if (data && data.username) {
          console.log("Found username in Supabase:", data.username);
          setUsername(data.username);
          return;
        }
        
        // Fallback to localStorage
        try {
          const localData = localStorage.getItem(`profile_${address}`);
          if (localData) {
            const parsed = JSON.parse(localData);
            if (parsed.username) {
              console.log("Found username in localStorage:", parsed.username);
              setUsername(parsed.username);
              return;
            }
          }
          
          // Check all localStorage keys in case wallet address format is different
          const allStorageKeys = Object.keys(localStorage);
          const profileKeys = allStorageKeys.filter(key => key.startsWith('profile_'));
          
          for (const key of profileKeys) {
            try {
              const storedData = localStorage.getItem(key);
              if (!storedData) continue;
              
              const parsed = JSON.parse(storedData);
              if (parsed.walletAddress === address && parsed.username) {
                console.log("Found username by wallet address in localStorage:", parsed.username);
                setUsername(parsed.username);
                return;
              }
            } catch (e) {
              console.error("Error parsing localStorage item:", e);
            }
          }
        } catch (localError) {
          console.error("Error checking localStorage for username:", localError);
        }
        
        setUsername(null);
      } catch (error) {
        console.error("Error fetching profile for username:", error);
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
    // If there's a username, use it for the profile path, otherwise use the profile page
    menuItems.push({
      path: username ? `/${username}` : "/profile",
      label: "Profile",
      icon: <User className="h-5 w-5" />
    });
  }

  return menuItems;
};

export default useHeaderMenuItems;
