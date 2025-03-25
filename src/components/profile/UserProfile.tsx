
import React from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { toast } from "@/components/ui/use-toast";

export function UserProfile() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile form submitted with data:", formData);
    
    // Display a toast informing the user about signature request
    toast({
      title: "Wallet Signature Required",
      description: "Please sign the message with your wallet to verify ownership and save your profile.",
      duration: 5000,
    });
    
    const success = await saveProfile();
    if (success) {
      console.log("Profile saved successfully, navigating back");
      navigate(-1);
    }
  };

  if (!isConnected) {
    return <WalletConnectionState address={address} />;
  }

  return (
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
    />
  );
}

export default UserProfile;
