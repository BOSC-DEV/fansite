
import { useState } from "react";
import { toast } from "sonner";

export function useBasicInfoForm() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [accusedOf, setAccusedOf] = useState("");

  return {
    name, 
    setName,
    photoUrl, 
    setPhotoUrl,
    accusedOf, 
    setAccusedOf
  };
}
