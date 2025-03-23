
import { toast } from "sonner";

interface ValidationInputs {
  name: string;
  accusedOf: string;
  photoUrl: string;
}

export function useFormValidation() {
  const validateForm = (inputs: ValidationInputs): boolean => {
    let isValid = true;
    const errors: string[] = [];
    
    if (!inputs.name.trim()) {
      errors.push("Name is required");
      isValid = false;
    }
    
    if (!inputs.accusedOf.trim()) {
      errors.push("Accusation is required");
      isValid = false;
    }
    
    // If photoUrl is empty, we'll use a placeholder later
    if (!inputs.photoUrl) {
      // This is just a warning, not an error that should block submission
      toast.info("No image provided - a placeholder will be used");
    }
    
    if (errors.length > 0) {
      toast.error(errors.join(", "));
    }
    
    return isValid;
  };

  return {
    validateForm
  };
}
