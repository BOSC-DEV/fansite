
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { storageService } from '@/services/storage';

export function ProfileButton() {
  const { address } = useWallet();
  const navigate = useNavigate();
  const [username, setUsername] = React.useState<string | null>(null);
  const [profilePic, setProfilePic] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const loadProfile = async () => {
      if (address) {
        try {
          const profile = await storageService.getProfile(address);
          setUsername(profile?.username || null);
          setProfilePic(profile?.profilePicUrl || null);
        } catch (error) {
          console.error('Error loading profile:', error);
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
    <button 
      className="rounded-full bg-western-accent p-1 text-western-parchment"
      onClick={handleProfileClick}
    >
      <Avatar className="h-5 w-5">
        <AvatarImage src={profilePic || ''} alt="Profile" />
        <AvatarFallback className="bg-western-wood text-western-parchment">
          <User className="h-3 w-3" />
        </AvatarFallback>
      </Avatar>
    </button>
  );
}

export default ProfileButton;
