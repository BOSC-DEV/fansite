
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/context/WalletContext';
import { User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

export function ProfileButton() {
  const { address } = useWallet();
  const navigate = useNavigate();
  const [profileData, setProfileData] = React.useState<{
    username: string | null;
    profilePicUrl: string | null;
  }>({ username: null, profilePicUrl: null });
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const loadProfile = async () => {
      if (!address) {
        setProfileData({ username: null, profilePicUrl: null });
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // Try Supabase first
        const { data, error } = await supabase
          .from('profiles')
          .select('username, profile_pic_url')
          .eq('wallet_address', address)
          .maybeSingle();

        if (data) {
          console.log("Found profile in Supabase:", data);
          setProfileData({
            username: data.username || null,
            profilePicUrl: data.profile_pic_url || null,
          });
        } else {
          // Fallback to localStorage
          try {
            const localData = localStorage.getItem(`profile_${address}`);
            if (localData) {
              const parsed = JSON.parse(localData);
              console.log("Found profile in localStorage:", parsed);
              setProfileData({
                username: parsed.username || null,
                profilePicUrl: parsed.profilePicUrl || null,
              });
            }
          } catch (localError) {
            console.error("Error checking localStorage:", localError);
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [address]);

  const handleProfileClick = () => {
    if (!address) {
      navigate('/profile');
      return;
    }
    
    if (profileData.username) {
      navigate(`/${profileData.username}`);
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
      disabled={isLoading}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src={profileData.profilePicUrl || ''} alt="Profile" />
        <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
          <User className="h-5 w-5" />
        </AvatarFallback>
      </Avatar>
    </Button>
  );
}
