
import { useState } from "react";

export function useAliasesForm() {
  const [currentAlias, setCurrentAlias] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);

  const handleAddAlias = () => {
    if (currentAlias.trim() && !aliases.includes(currentAlias.trim())) {
      setAliases([...aliases, currentAlias.trim()]);
      setCurrentAlias("");
    }
  };

  const removeAlias = (alias: string) => {
    setAliases(aliases.filter(a => a !== alias));
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
