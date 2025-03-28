
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface DesktopNavigationProps {
  menuItems: MenuItem[];
}

export const DesktopNavigation = ({ menuItems }: DesktopNavigationProps) => {
  const location = useLocation();

  // Create a simplified menu with the new labels that we'll display
  const displayLabels: Record<string, string> = {
    "Home": "Home",
    "Most Wanted": "Wanted",
    "Leaderboard": "Stats",
    "Report": "Report",
    "Profile": "Profile"
  };

  return (
    <nav className="flex flex-1 items-center">
      <div className="flex space-x-10">
        {menuItems.map(item => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={cn(
              "flex flex-col items-center justify-center text-sm font-bold transition-colors hover:scale-110 transform duration-200 font-western min-w-16", 
              location.pathname === item.path ? "text-western-parchment" : "text-western-sand hover:text-western-parchment"
            )}
          >
            {item.icon}
            <span className="mt-1">{displayLabels[item.label] || item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default DesktopNavigation;
