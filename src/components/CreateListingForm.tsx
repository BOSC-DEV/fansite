
import { FormContainer } from "./createListing/FormContainer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function CreateListingForm() {
  const navigate = useNavigate();
  const [isCheckingProfile, setIsCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    // Check if user has a profile
    const checkProfile = async () => {
      setIsCheckingProfile(true);
      
      // Get profile identifier (either from wallet or from localStorage)
      let profileIdentifier = localStorage.getItem('anonymous_profile_id');
      
      try {
        if (profileIdentifier) {
          // Check Supabase for profile
          const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq('wallet_address', profileIdentifier)
            .maybeSingle();
            
          if (data) {
            console.log("Found profile in Supabase:", data);
            setHasProfile(true);
          } else {
            setHasProfile(false);
          }
        } else {
          setHasProfile(false);
        }
      } catch (error) {
        console.error("Error checking profile:", error);
        setHasProfile(false);
      } finally {
        setIsCheckingProfile(false);
      }
    };

    checkProfile();
  }, []);

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
