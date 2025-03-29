
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { toast } from "sonner";
import { EmailVerification } from "./EmailVerification";
import { isEmailVerified } from "@/lib/supabase";

export function UserProfile() {
  const navigate = useNavigate();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(undefined);
  
  const {
    formData,
    setDisplayName,
    setUsername,
    setProfilePicUrl,
    setXLink,
    setWebsiteLink,
    handleBioChange,
    isSubmitting,
    hasProfile,
    saveProfile,
    address,
    isConnected,
    profileId,
    usernameAvailable,
    checkingUsername
  } = useProfileForm();

  useEffect(() => {
    const checkEmailVerification = async () => {
      const verified = await isEmailVerified();
      setEmailVerified(verified);
    };
    
    checkEmailVerification();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile form submitted with data:", formData);
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      // If wallet is connected but email is not verified, suggest it
      if (isConnected && emailVerified === false) {
        const shouldProceed = window.confirm("Your email is not verified. You can still save your profile with wallet signature only. Would you like to proceed?");
        if (!shouldProceed) {
          setShowEmailVerification(true);
          return;
        }
      }
      
      // Proceed with profile save
      toast.info("Saving your profile...");
      
      // Ensure we have a unique ID for this profile - use the wallet address if needed
      const profileToSave = {
        ...formData,
        walletAddress: address || "",
        createdAt: new Date().toISOString(),
      };
      
      const success = await saveProfile();
      
      if (success) {
        console.log("Profile saved successfully, navigating back");
        toast.success("Profile saved successfully!");
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        throw new Error("Failed to save profile - unknown error");
      }
    } catch (error) {
      console.error("Error during profile save:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const handleEmailVerified = (email: string) => {
    toast.success("Email verification process initiated for " + email);
    setEmailVerified(true);
    setShowEmailVerification(false);
  };

  if (!isConnected) {
    return <WalletConnectionState address={address} />;
  }

  return (
    <>
      {showEmailVerification ? (
        <div className="max-w-2xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-6">Email Verification</h2>
          <EmailVerification onSuccess={handleEmailVerified} />
          <div className="mt-4 text-center">
            <button 
              onClick={() => setShowEmailVerification(false)}
              className="text-sm text-muted-foreground hover:underline"
            >
              Skip and continue with wallet only
            </button>
          </div>
        </div>
      ) : (
        <UserProfileForm
          formData={formData}
          setDisplayName={setDisplayName}
          setUsername={setUsername}
          setProfilePicUrl={setProfilePicUrl}
          setXLink={setXLink}
          setWebsiteLink={setWebsiteLink}
          handleBioChange={handleBioChange}
          isSubmitting={isSubmitting}
          hasProfile={hasProfile}
          saveProfile={saveProfile}
          address={address}
          usernameAvailable={usernameAvailable}
          checkingUsername={checkingUsername}
          handleSubmit={handleSubmit}
          emailVerified={emailVerified}
          onRequestEmailVerification={() => setShowEmailVerification(true)}
        />
      )}
    </>
  );
}

export default UserProfile;
