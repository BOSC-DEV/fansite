
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { toast } from "sonner";
import { EmailVerification } from "./EmailVerification";
import { isEmailVerified } from "@/lib/supabase";
import CloudflareTurnstile from "@/components/CloudflareTurnstile";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function UserProfile() {
  const navigate = useNavigate();
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(undefined);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  
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
    
    // Still check email verification status, but don't require it
    checkEmailVerification();
  }, []);

  const handleTurnstileVerify = (token: string) => {
    console.log("Turnstile verification successful with token:", token);
    setCaptchaVerified(true);
    // Continue with form submission after verification
    handleFormSubmit();
  };

  const handleFormSubmit = async () => {
    console.log("Profile form submitted with data:", formData);
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      // Proceed with profile save without email verification check
      toast.info("Saving your profile...");
      
      const success = await saveProfile();
      
      if (success) {
        console.log("Profile saved successfully, navigating back");
        toast.success("Profile saved successfully!");
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        throw new Error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error during profile save:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    // Show Turnstile verification
    setShowCaptcha(true);
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
              Skip and continue without email verification
            </button>
          </div>
        </div>
      ) : (
        <>
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
          
          <Dialog open={showCaptcha} onOpenChange={setShowCaptcha}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Human Verification</DialogTitle>
                <DialogDescription>
                  Please complete the captcha to save your profile
                </DialogDescription>
              </DialogHeader>
              
              <div className="my-4">
                <CloudflareTurnstile 
                  siteKey="1x00000000000000000000AA" 
                  onVerify={handleTurnstileVerify} 
                  theme="auto"
                />
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

export default UserProfile;
