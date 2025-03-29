
import { FormContainer } from "./createListing/FormContainer";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ConnectWallet from "@/components/ConnectWallet";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CreateListingForm() {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user has a profile
    const checkProfile = async () => {
      if (!isConnected || !address) {
        setIsCheckingProfile(false);
        setHasProfile(false);
        return;
      }
      
      setIsCheckingProfile(true);
      
      try {
        // Check Supabase for profile
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .eq('wallet_address', address)
          .maybeSingle();
          
        if (data) {
          console.log("Found profile in Supabase:", data);
          setHasProfile(true);
        } else {
          // Check localStorage as fallback
          try {
            const localData = localStorage.getItem(`profile_${address}`);
            if (localData) {
              console.log("Found profile in localStorage");
              setHasProfile(true);
            } else {
              // Check all localStorage keys in case wallet address format is different
              const allStorageKeys = Object.keys(localStorage);
              const profileKeys = allStorageKeys.filter(key => key.startsWith('profile_'));
              
              let foundProfile = false;
              for (const key of profileKeys) {
                try {
                  const storedData = localStorage.getItem(key);
                  if (!storedData) continue;
                  
                  const parsed = JSON.parse(storedData);
                  if (parsed.walletAddress === address) {
                    console.log("Found profile by wallet address in localStorage");
                    foundProfile = true;
                    break;
                  }
                } catch (e) {
                  console.error("Error parsing localStorage item:", e);
                }
              }
              
              setHasProfile(foundProfile);
            }
          } catch (localError) {
            console.error("Error checking localStorage:", localError);
            setHasProfile(false);
          }
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        setHasProfile(false);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkProfile();
  }, [isConnected, address]);

  const handleCreateProfile = () => {
    navigate("/profile");
  };

  if (isCheckingProfile) {
    return (
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="animate-spin h-8 w-8 border-4 border-western-accent border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-2 text-western-wood">Checking your profile...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="space-y-6">
        <ConnectWallet 
          redirectPath="/create-listing"
        />
      </div>
    );
  }

  if (!hasProfile) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Profile Required</AlertTitle>
          <AlertDescription>
            You need to create a profile before you can report a scammer. Creating a profile helps maintain accountability in our community.
          </AlertDescription>
        </Alert>
        
        <div className="text-center">
          <Button 
            onClick={handleCreateProfile}
            className="bg-western-accent hover:bg-western-accent/80 text-western-parchment"
          >
            Create Your Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FormContainer />
    </div>
  );
}

export default CreateListingForm;
