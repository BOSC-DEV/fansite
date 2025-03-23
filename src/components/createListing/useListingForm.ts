
import { useState } from "react";
import { toast } from "sonner";

export function useListingForm() {
  const [name, setName] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [accusedOf, setAccusedOf] = useState("");
  const [currentLink, setCurrentLink] = useState("");
  const [links, setLinks] = useState<string[]>([]);
  const [currentAlias, setCurrentAlias] = useState("");
  const [aliases, setAliases] = useState<string[]>([]);
  const [currentAccomplice, setCurrentAccomplice] = useState("");
  const [accomplices, setAccomplices] = useState<string[]>([]);
  const [officialResponse, setOfficialResponse] = useState("");

  const handleAddLink = () => {
    if (currentLink.trim() && !links.includes(currentLink.trim())) {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink("");
    }
  };

  const handleAddAlias = () => {
    if (currentAlias.trim() && !aliases.includes(currentAlias.trim())) {
      setAliases([...aliases, currentAlias.trim()]);
      setCurrentAlias("");
    }
  };

  const handleAddAccomplice = () => {
    if (currentAccomplice.trim() && !accomplices.includes(currentAccomplice.trim())) {
      setAccomplices([...accomplices, currentAccomplice.trim()]);
      setCurrentAccomplice("");
    }
  };

  const removeLink = (link: string) => {
    setLinks(links.filter(l => l !== link));
  };

  const removeAlias = (alias: string) => {
    setAliases(aliases.filter(a => a !== alias));
  };

  const removeAccomplice = (accomplice: string) => {
    setAccomplices(accomplices.filter(a => a !== accomplice));
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const errors: string[] = [];
    
    if (!name.trim()) {
      errors.push("Name is required");
      isValid = false;
    }
    
    if (!accusedOf.trim()) {
      errors.push("Accusation is required");
      isValid = false;
    }
    
    // If photoUrl is empty, we'll use a placeholder later
    if (!photoUrl) {
      // This is just a warning, not an error that should block submission
      toast.info("No image provided - a placeholder will be used");
    }
    
    if (errors.length > 0) {
      toast.error(errors.join(", "));
    }
    
    return isValid;
  };

  return {
    name, setName,
    photoUrl, setPhotoUrl,
    accusedOf, setAccusedOf,
    currentLink, setCurrentLink,
    links, setLinks,
    currentAlias, setCurrentAlias,
    aliases, setAliases,
    currentAccomplice, setCurrentAccomplice,
    accomplices, setAccomplices,
    officialResponse, setOfficialResponse,
    handleAddLink,
    handleAddAlias,
    handleAddAccomplice,
    removeLink,
    removeAlias,
    removeAccomplice,
    validateForm
  };
}
