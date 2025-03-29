
import { FormContainer } from "./createListing/FormContainer";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileService } from "@/services/storage/localStorageService";
import { toast } from "sonner";
import { db } from "@/lib/supabase-helpers";
import ConnectWallet from "@/components/ConnectWallet";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CreateListingForm() {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(true);
  const [hasToastBeenShown, setHasToastBeenShown] = useState(false);

  useEffect(() => {
    // Check if user has a profile
    const checkProfile = async () => {
      if (isConnected && address) {
        setIsCheckingProfile(true);
        try {
          // First check if the profile exists in Supabase
          const { data: profile, error } = await db.profiles()
            .select('id')
            .eq('wallet_address', address)
            .maybeSingle();
            
          if (error) {
            console.error("Error checking profile:", error);
            // Fallback to localStorage check if Supabase fails
            const hasLocalProfile = profileService.hasProfile(address);
            setHasProfile(hasLocalProfile);
            
            if (!hasLocalProfile && !hasToastBeenShown) {
              toast.info("You need to create a profile before reporting a scammer");
              setHasToastBeenShown(true);
            }
          } else if (!profile) {
            // No profile found in Supabase
            setHasProfile(false);
            
            if (!hasToastBeenShown) {
              toast.info("You need to create a profile before reporting a scammer");
              setHasToastBeenShown(true);
            }
          } else {
            setHasProfile(true);
          }
        } catch (error) {
          console.error("Error checking profile:", error);
          setHasProfile(false);
        } finally {
          setIsCheckingProfile(false);
        }
      } else {
        setIsCheckingProfile(false);
      }
    };

    checkProfile();
  }, [isConnected, address, navigate, hasToastBeenShown]);

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
