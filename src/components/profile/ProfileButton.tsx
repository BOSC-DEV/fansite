
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { storageService } from '@/services/storage';
import { toast } from 'sonner';

export function ProfileButton() {
  const { address, disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProfile = async () => {
      if (address) {
        try {
          setIsProfileLoading(true);
          const profile = await storageService.getProfile(address);
          setUsername(profile?.username || null);
        } catch (error) {
          console.error('Error loading profile:', error);
        } finally {
          setIsProfileLoading(false);
        }
      }
    };

    loadProfile();
  }, [address]);

  const handleDisconnect = async () => {
    await disconnectWallet();
    toast.success("Wallet disconnected successfully");
    navigate('/');
  };

  const handleProfileClick = () => {
    if (username) {
      navigate(`/${username}`);
    } else if (address) {
      navigate(`/user/${address}`);
    } else {
      navigate('/profile');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full bg-western-accent hover:bg-western-accent/80 text-western-parchment"
        >
          <User className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-western-parchment/95 border-western-wood">
        <DropdownMenuLabel className="font-western text-western-wood">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-western-wood/20" />
        <DropdownMenuItem 
          onClick={handleProfileClick}
          className="cursor-pointer text-western-wood hover:bg-western-sand/30"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-western-wood/20" />
        <DropdownMenuItem 
          onClick={handleDisconnect} 
          className="cursor-pointer text-western-accent hover:bg-western-sand/30"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Disconnect Wallet</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
