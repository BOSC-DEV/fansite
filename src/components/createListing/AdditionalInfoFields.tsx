
import { TagInput, TextAreaField, TextField } from "@/components/scammer/FormFields";
import { X } from "lucide-react";

interface AdditionalInfoFieldsProps {
  currentLink: string;
  setCurrentLink: (value: string) => void;
  links: string[];
  handleAddLink: () => void;
  removeLink: (link: string) => void;
  
  currentAlias: string;
  setCurrentAlias: (value: string) => void;
  aliases: string[];
  handleAddAlias: () => void;
  removeAlias: (alias: string) => void;
  
  currentAccomplice: string;
  setCurrentAccomplice: (value: string) => void;
  accomplices: string[];
  handleAddAccomplice: () => void;
  removeAccomplice: (accomplice: string) => void;
  
  officialResponse: string;
  setOfficialResponse: (value: string) => void;
  
  xLink: string;
  setXLink: (value: string) => void;
}

export function AdditionalInfoFields({
  currentLink,
  setCurrentLink,
  links,
  handleAddLink,
  removeLink,
  currentAlias,
  setCurrentAlias,
  aliases,
  handleAddAlias,
  removeAlias,
  currentAccomplice,
  setCurrentAccomplice,
  accomplices,
  handleAddAccomplice,
  removeAccomplice,
  officialResponse,
  setOfficialResponse,
  xLink,
  setXLink
}: AdditionalInfoFieldsProps) {
  return (
    <>
      <TagInput
        label="Links to Evidence"
        placeholder="https://example.com/evidence"
        currentValue={currentLink}
        values={links}
        setCurrentValue={setCurrentLink}
        addValue={handleAddLink}
        removeValue={removeLink}
      />

      <TextField
        id="xLink"
        label="X.com Profile Link"
        placeholder="https://x.com/username"
        value={xLink}
        onChange={(e) => setXLink(e.target.value)}
        required={false}
        icon={<X className="h-4 w-4" />}
      />

      <TagInput
        label="Known Aliases"
        placeholder="Add alias or nickname"
        currentValue={currentAlias}
        values={aliases}
        setCurrentValue={setCurrentAlias}
        addValue={handleAddAlias}
        removeValue={removeAlias}
      />

      <TagInput
        label="Known Accomplices"
        placeholder="Add accomplice name"
        currentValue={currentAccomplice}
        values={accomplices}
        setCurrentValue={setCurrentAccomplice}
        addValue={handleAddAccomplice}
        removeValue={removeAccomplice}
      />

      <TextAreaField
        id="officialResponse"
        label="Official Response (if any)"
        placeholder="Any official statements or responses from authorities"
        value={officialResponse}
        onChange={(e) => setOfficialResponse(e.target.value)}
        required={false}
      />
    </>
  );
}
