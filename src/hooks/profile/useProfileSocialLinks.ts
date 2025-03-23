
import { useState } from "react";

export function useProfileSocialLinks() {
  const [xLink, setXLink] = useState("");
  const [websiteLink, setWebsiteLink] = useState("");

  const isValidUrl = (url: string) => {
    if (!url) return true; // Empty URLs are considered valid (optional field)
    
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  const validateUrls = () => {
    // Validate URLs if provided
    if (xLink && !isValidUrl(xLink)) {
      return { valid: false, message: "Please enter a valid X (Twitter) URL" };
    }

    if (websiteLink && !isValidUrl(websiteLink)) {
      return { valid: false, message: "Please enter a valid website URL" };
    }

    return { valid: true, message: "" };
  };

  return {
    socialLinks: {
      xLink,
      websiteLink,
    },
    setXLink,
    setWebsiteLink,
    validateUrls,
  };
}
