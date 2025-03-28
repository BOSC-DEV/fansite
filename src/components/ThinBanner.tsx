
import React from "react";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun, Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { Logo } from "./header/Logo";
import { Toggle } from "./ui/toggle";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

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
            className="border-none"
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
          <Logo />
        </div>
        
        {/* Right side - Wallet */}
        <div>
          {!isConnected && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={connectWallet} 
              disabled={connecting}
              className="h-8 text-xs border border-western-wood/30 dark:border-western-accent/30"
            >
              <Wallet className="h-3.5 w-3.5 mr-1" />
              {connecting ? "..." : "Connect"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
