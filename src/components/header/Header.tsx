
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import Logo from "./Logo";
import { ProfileButton } from "../profile/ProfileButton";

export const Header = () => {
  const { isConnected, connectWallet, connecting } = useWallet();

  const handleConnectClick = async () => {
    if (!isConnected) {
      await connectWallet();
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 wood-texture border-b border-western-wood/50">
      <div className="container px-2 py-1 mx-auto flex items-center justify-between">
        <Logo />
        
        {!isConnected ? (
          <Button 
            variant="default" 
            size="sm" 
            onClick={handleConnectClick} 
            disabled={connecting} 
            className="bg-western-accent text-western-parchment hover:bg-western-accent/80 h-7 text-xs"
          >
            <Wallet className="h-3 w-3 mr-1.5" />
            {connecting ? "..." : "Connect"}
          </Button>
        ) : (
          <ProfileButton />
        )}
      </div>
    </header>
  );
};

export default Header;
