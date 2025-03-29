
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { toast } from "sonner";

export function UserProfile() {
  const navigate = useNavigate();
  const [saveError, setSaveError] = useState<string | null>(null);
  
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
    setSaveError(null);
    console.log("Profile form submitted with data:", formData);
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      // Validate required fields
      if (!formData.displayName.trim()) {
        toast.error("Display name is required");
        return;
      }
      
      if (!formData.username.trim()) {
        toast.error("Username is required");
        return;
      }
      
      if (!usernameAvailable) {
        toast.error("Username is not available");
        return;
      }
      
      // Proceed with profile save
      console.log("Attempting to save profile...");
      const success = await saveProfile();
      
      if (success) {
        console.log("Profile saved successfully, navigating back");
        // We don't need toast here as it's handled in the useProfileFormSubmit hook
        // Add a small delay before navigating to ensure the toast is visible
        setTimeout(() => navigate(-1), 1000);
      } else {
        console.error("Profile save returned false");
        setSaveError("Failed to save profile. Please try again.");
        toast.error("Failed to save profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      setSaveError(errorMessage);
      toast.error("An unexpected error occurred while saving profile.");
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
      error={saveError}
    />
  );
}

export default UserProfile;
