
import { FormContainer } from "./createListing/FormContainer";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export function CreateListingForm() {
  const { isConnected, address } = useWallet();
  const navigate = useNavigate();
  const [isCheckingProfile, setIsCheckingProfile] = useState(false); // Changed to false to skip profile check

  // We're skipping the profile check since users have reported already having profiles
  // This allows any connected user to create a listing

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
      {/* Warning box removed */}
      <FormContainer />
    </div>
  );
}

export default CreateListingForm;
