
import { useState } from "react";

export function useLinksForm() {
  const [currentLink, setCurrentLink] = useState("");
  const [links, setLinks] = useState<string[]>([]);

  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLink.trim() && !links.includes(currentLink.trim())) {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink("");
    }
  };

  // Update to accept a numeric index instead of a string
  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  return {
    currentLink, 
    setCurrentLink,
    links, 
    setLinks,
    handleAddLink,
    removeLink
  };
}
