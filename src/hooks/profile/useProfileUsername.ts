
import { useState, useEffect } from "react";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";

export function useProfileUsername() {
  const { isConnected, address } = useWallet();
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true);
  const [checkingUsername, setCheckingUsername] = useState(false);

  useEffect(() => {
    // Validate username with debounce
    if (username) {
      const timer = setTimeout(() => {
        checkUsernameAvailability(username, address);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setUsernameAvailable(true);
    }
  }, [username, address]);

  const checkUsernameAvailability = async (usernameToCheck: string, currentAddress?: string) => {
    if (!usernameToCheck) return;
    
    if (usernameToCheck.length < 3) {
      setUsernameAvailable(false);
      return;
    }
    
    // Only allow alphanumeric and underscore
    if (!/^[a-zA-Z0-9_]+$/.test(usernameToCheck)) {
      setUsernameAvailable(false);
      return;
    }
    
    setCheckingUsername(true);
    try {
      console.log("[useProfileUsername] Checking username availability:", usernameToCheck);
      const isAvailable = await storageService.isUsernameAvailable(usernameToCheck, currentAddress);
      console.log("[useProfileUsername] Username availability result:", isAvailable);
      setUsernameAvailable(isAvailable);
    } catch (error) {
      console.error("[useProfileUsername] Error checking username:", error);
      setUsernameAvailable(false);
    } finally {
      setCheckingUsername(false);
    }
  };

  const handleUsernameChange = (value: string) => {
    // Lowercase and replace spaces with underscores
    const formattedValue = value.toLowerCase().replace(/\s+/g, '_');
    console.log("[useProfileUsername] Formatted username:", formattedValue);
    setUsername(formattedValue);
  };

  return {
    username,
    setUsername: handleUsernameChange,
    usernameAvailable,
    checkingUsername,
    checkUsername: checkUsernameAvailability // <-- Expose the checkUsername function
  };
}
