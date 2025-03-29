
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WalletConnectionState } from "./WalletConnectionState";
import { UserProfileForm } from "./UserProfileForm";
import { useProfileForm } from "@/hooks/profile/useProfileForm";
import { toast } from "sonner";

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
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    try {
      // Proceed with profile save
      const success = await saveProfile();
      if (success) {
        console.log("Profile saved successfully, navigating back");
        toast.success("Profile saved successfully!");
        navigate(-1);
      } else {
        toast.error("Failed to save profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
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
    />
  );
}

export default UserProfile;
