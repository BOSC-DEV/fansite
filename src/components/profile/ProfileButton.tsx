
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { storageService } from '@/services/storage';
import { useIsMobile } from '@/hooks/use-mobile';

export function ProfileButton() {
  const { address } = useWallet();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string | null>(null);
  const [profilePic, setProfilePic] = React.useState<string | null>(null);
  const [isProfileLoading, setIsProfileLoading] = React.useState(true);
  const isMobile = useIsMobile();
  
  const avatarSize = isMobile ? "h-6 w-6" : "h-8 w-8";
  const iconSize = isMobile ? "h-4 w-4" : "h-5 w-5";

  React.useEffect(() => {
    const loadProfile = async () => {
      if (address) {
        try {
          setIsProfileLoading(true);
          const profile = await storageService.getProfile(address);
          setUsername(profile?.username || null);
          setProfilePic(profile?.profilePicUrl || null);
        } catch (error) {
          console.error('Error loading profile:', error);
        } finally {
          setIsProfileLoading(false);
        }
      }
    };

    loadProfile();
  }, [address]);

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
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full bg-western-accent hover:bg-western-accent/80 text-western-parchment"
      onClick={handleProfileClick}
    >
      <Avatar className={avatarSize}>
        <AvatarImage src={profilePic || ''} alt="Profile" />
        <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
          <User className={iconSize} />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}
