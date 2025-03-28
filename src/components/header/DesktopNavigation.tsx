
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

  return (
    <nav className="flex flex-1 items-center justify-center">
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
  );
};

export default DesktopNavigation;
