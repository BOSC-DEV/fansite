
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, RefreshCw, Wallet } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "sonner";
import { SolAmount } from '@/components/SolAmount';

interface WalletDisconnectProps {
  onDisconnect?: () => void;
}

export const WalletDisconnect = ({ onDisconnect }: WalletDisconnectProps) => {
  const { disconnectWallet, address, balance, connectWallet } = useWallet();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  const handleDisconnect = async () => {
    await disconnectWallet();
    toast.success("Wallet disconnected");
    if (onDisconnect) {
      onDisconnect();
    }
  };

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    try {
      await connectWallet();
      toast.success("Balance updated");
    } catch (error) {
      toast.error("Failed to refresh balance");
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="mb-6 p-4 bg-western-sand/20 rounded-lg border border-western-wood/30">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Wallet className="h-5 w-5 text-western-accent mr-2" />
            <span className="text-sm font-medium text-western-wood">Connected Wallet</span>
          </div>
          <Button 
            variant="outline"
            size="sm" 
            onClick={handleDisconnect}
            className="border-western-wood/50 text-western-accent hover:bg-western-wood hover:text-western-parchment"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </Button>
        </div>
        
        <div className="bg-western-parchment/50 p-3 rounded border border-western-wood/20">
          <div className="flex justify-between items-center">
            <span className="text-sm text-western-wood/70">Address</span>
            <span className="text-sm font-mono text-western-wood">{address ? formatAddress(address) : 'Not connected'}</span>
          </div>
        </div>
        
        <div className="bg-western-parchment/50 p-3 rounded border border-western-wood/20">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/b56ce7fa-4bb2-4920-b10e-4b0c6907f0ec.png" 
                alt="SOL"
                className="h-4 w-4 mr-2" 
                style={{ objectFit: "contain" }}
              />
              <span className="text-sm text-western-wood/70">Balance</span>
            </div>
            <div className="flex items-center">
              <span className="text-sm font-mono text-western-wood font-medium mr-3">
                {balance !== null ? (
                  <SolAmount amount={balance} />
                ) : (
                  "0.00 SOL"
                )}
              </span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleRefreshBalance}
                disabled={isRefreshing}
                className="h-6 w-6 rounded-full hover:bg-western-wood/10"
              >
                <RefreshCw className={`h-4 w-4 text-western-accent ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
