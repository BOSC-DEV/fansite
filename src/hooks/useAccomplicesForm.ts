
import { useState } from "react";

export function useAccomplicesForm() {
  const [currentAccomplice, setCurrentAccomplice] = useState("");
  const [accomplices, setAccomplices] = useState<string[]>([]);

  const handleAddAccomplice = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAccomplice.trim() && !accomplices.includes(currentAccomplice.trim())) {
      setAccomplices([...accomplices, currentAccomplice.trim()]);
      setCurrentAccomplice("");
    }
  };

  // Update to accept a numeric index instead of a string
  const removeAccomplice = (index: number) => {
    const newAccomplices = [...accomplices];
    newAccomplices.splice(index, 1);
    setAccomplices(newAccomplices);
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
