
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";

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

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
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
    setDisplayName,
    handleBioChange,
    address,
    isConnected,
  };
}
