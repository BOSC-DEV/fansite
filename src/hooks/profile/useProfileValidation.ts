
import { toast } from "sonner";

interface ProfileFormData {
  displayName: string;
  username: string;
  profilePicUrl: string;
  xLink: string;
  websiteLink: string;
  bio: string;
}

interface FormValidation {
  valid: boolean;
  message: string;
}

export function useProfileValidation() {
  const validateForm = (
    formData: ProfileFormData,
    usernameAvailable: boolean,
    urlValidation: FormValidation
  ): boolean => {
    // Validate display name
    if (!formData.displayName.trim()) {
      toast.error("Display name is required");
      return false;
    }
    
    // Validate username
    if (!formData.username.trim()) {
      toast.error("Username is required");
      return false;
    }
    
    if (!usernameAvailable) {
      toast.error("Username is not available or invalid");
      return false;
    }
    
    // Validate URLs
    if (!urlValidation.valid) {
      toast.error(urlValidation.message || "Invalid URL format");
      return false;
    }
    
    // All validations passed
    return true;
  };

  return {
    validateForm
  };
}
