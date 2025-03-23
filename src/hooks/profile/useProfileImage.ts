
import { useState } from "react";

export function useProfileImage() {
  const [profilePicUrl, setProfilePicUrl] = useState("");

  return {
    profilePicUrl,
    setProfilePicUrl,
  };
}
