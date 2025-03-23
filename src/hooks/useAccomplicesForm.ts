
import { useState } from "react";

export function useAccomplicesForm() {
  const [currentAccomplice, setCurrentAccomplice] = useState("");
  const [accomplices, setAccomplices] = useState<string[]>([]);

  const handleAddAccomplice = () => {
    if (currentAccomplice.trim() && !accomplices.includes(currentAccomplice.trim())) {
      setAccomplices([...accomplices, currentAccomplice.trim()]);
      setCurrentAccomplice("");
    }
  };

  const removeAccomplice = (accomplice: string) => {
    setAccomplices(accomplices.filter(a => a !== accomplice));
  };

  return {
    currentAccomplice, 
    setCurrentAccomplice,
    accomplices, 
    setAccomplices,
    handleAddAccomplice,
    removeAccomplice
  };
}
