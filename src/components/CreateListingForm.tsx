
import { FormContainer } from "./createListing/FormContainer";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileService } from "@/services/storage/localStorageService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import ConnectWallet from "@/components/ConnectWallet";

export function CreateListingForm() {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);

  useEffect(() => {
    // Check if user has a profile
    const checkProfile = async () => {
      if (isConnected && address) {
        setIsCheckingProfile(true);
        try {
          // First check if the profile exists in Supabase
          const { data: profile, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('wallet_address', address)
            .maybeSingle();
            
          if (error) {
            console.error("Error checking profile:", error);
            // Fallback to localStorage check if Supabase fails
            const hasLocalProfile = profileService.hasProfile(address);
            if (!hasLocalProfile) {
              toast.info("You need to create a profile before reporting a scammer");
              navigate("/profile");
            }
          } else if (!profile) {
            // No profile found in Supabase
            toast.info("You need to create a profile before reporting a scammer");
            navigate("/profile");
          }
        } catch (error) {
          console.error("Error checking profile:", error);
        } finally {
          setIsCheckingProfile(false);
        }
      } else {
        setIsCheckingProfile(false);
      }
    };

    checkProfile();
  }, [isConnected, address, navigate]);

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

  return (
    <div className="space-y-6">
      <FormContainer />
    </div>
  );
}

export default CreateListingForm;
