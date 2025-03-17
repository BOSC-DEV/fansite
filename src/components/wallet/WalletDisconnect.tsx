
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Wallet } from "lucide-react";

interface WalletDisconnectProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function WalletDisconnect({ 
  variant = "outline", 
  size = "sm",
  className = "" 
}: WalletDisconnectProps) {
  const { disconnectWallet } = useWallet();
  
  return (
    <Button
      variant={variant}
      size={size}
      onClick={disconnectWallet}
      className={className}
    >
      <Wallet className="h-4 w-4 mr-2" />
      Disconnect
    </Button>
  );
}

export default WalletDisconnect;
