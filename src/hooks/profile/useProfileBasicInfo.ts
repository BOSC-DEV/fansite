
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";

export interface BasicInfoFormData {
  displayName: string;
  bio: string;
  bioCharCount: number;
}

export function useProfileBasicInfo() {
  const { isConnected, address } = useWallet();
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [bioCharCount, setBioCharCount] = useState(0);

  const handleDisplayNameChange = (newName: string) => {
    console.log("Setting display name to:", newName);
    setDisplayName(newName);
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    console.log("Setting bio to:", text);
    if (text.length <= 142) {
      setBio(text);
      setBioCharCount(text.length);
    }
  };

  return {
    basicInfo: {
      displayName,
      bio,
      bioCharCount,
    },
    setDisplayName: handleDisplayNameChange,
    handleBioChange,
    address,
    isConnected,
  };
}
