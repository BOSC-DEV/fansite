
import { useState } from "react";

export function useLinksForm() {
  const [currentLink, setCurrentLink] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [xLink, setXLink] = useState("");

  const handleAddLink = () => {
    if (currentLink.trim() && !links.includes(currentLink.trim())) {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink("");
    }
  };

  const removeLink = (link: string) => {
    setLinks(links.filter(l => l !== link));
  };

  return {
    currentLink, 
    setCurrentLink,
    links, 
    setLinks,
    handleAddLink,
    removeLink,
    xLink,
    setXLink
  };
}
