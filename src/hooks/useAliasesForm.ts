
import { useState } from "react";

export function useAliasesForm() {
  const [currentAlias, setCurrentAlias] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);

  const handleAddAlias = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAlias.trim() && !aliases.includes(currentAlias.trim())) {
      setAliases([...aliases, currentAlias.trim()]);
      setCurrentAlias("");
    }
  };

  // Update to accept a numeric index instead of a string
  const removeAlias = (index: number) => {
    const newAliases = [...aliases];
    newAliases.splice(index, 1);
    setAliases(newAliases);
  };

  return {
    currentAlias, 
    setCurrentAlias,
    aliases, 
    setAliases,
    handleAddAlias,
    removeAlias
  };
}
