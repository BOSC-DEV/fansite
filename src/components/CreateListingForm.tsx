
import { FormContainer } from "./createListing/FormContainer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storageService } from "@/services/storage/localStorageService";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

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
            const hasLocalProfile = storageService.hasProfile(address);
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

  return (
    <div className="space-y-6">
      <Alert className="border-western-wood bg-western-sand/20">
        <Shield className="h-4 w-4 text-western-accent" />
        <AlertTitle className="text-western-accent">Protected Form</AlertTitle>
        <AlertDescription className="text-western-wood">
          This form is protected by Cloudflare Turnstile to ensure secure and legitimate submissions.
          Your domain is also secured with Cloudflare nameservers for additional protection.
        </AlertDescription>
      </Alert>
      
      <FormContainer />
    </div>
  );
}

export default CreateListingForm;
