
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

export const ThinBanner = () => {
  const { theme, setTheme } = useTheme();
  const { isConnected, connectWallet, connecting } = useWallet();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 py-2 border-b transition-colors", 
      "bg-western-parchment/90 backdrop-blur-sm dark:bg-black/80 dark:border-western-accent/30 border-western-leather/20"
    )}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left side - Theme toggle */}
        <div>
          <Toggle 
            pressed={theme === "dark"} 
            onPressedChange={toggleTheme}
            aria-label="Toggle theme"
            className="border-none h-7 w-7"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 text-western-accent" />
            ) : (
              <Moon className="h-4 w-4 text-western-leather" />
            )}
          </Toggle>
        </div>
        
        {/* Center - Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/8a55e27c-a460-46a6-9f26-dd32ef3512ff.png" 
              alt="Book of Scams Logo" 
              className="h-7 w-7"
              style={{ objectFit: "contain" }}
            />
          </Link>
        </div>
        
        {/* Right side - Wallet */}
        <div>
          {!isConnected && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={connectWallet} 
              disabled={connecting}
              className="h-7 px-2 text-xs border border-western-wood/30 dark:border-western-accent/30"
            >
              <Wallet className="h-4 w-4" />
            </Button>
          )}
          {isConnected && (
            <Wallet className="h-4 w-4 text-western-accent" />
          )}
        </div>
      </div>
    </div>
  );
};
