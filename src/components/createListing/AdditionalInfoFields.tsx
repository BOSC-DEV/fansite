
import { TagInput, TextAreaField } from "@/components/scammer/FormFields";

interface AdditionalInfoFieldsProps {
  currentLink: string;
  setCurrentLink: (value: string) => void;
  links: string[];
  handleAddLink: (e: React.FormEvent) => void;
  removeLink: (index: number) => void;
  
  currentAlias: string;
  setCurrentAlias: (value: string) => void;
  aliases: string[];
  handleAddAlias: (e: React.FormEvent) => void;
  removeAlias: (index: number) => void;
  
  currentAccomplice: string;
  setCurrentAccomplice: (value: string) => void;
  accomplices: string[];
  handleAddAccomplice: (e: React.FormEvent) => void;
  removeAccomplice: (index: number) => void;
  
  officialResponse: string;
  setOfficialResponse: (value: string) => void;
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
  setOfficialResponse
}: AdditionalInfoFieldsProps) {
  return (
    <>
      <TagInput
        label="Links to Socials"
        placeholder="https://example.com/socials"
        currentValue={currentLink}
        values={links}
        setCurrentValue={setCurrentLink}
        addValue={handleAddLink}
        removeValue={(link: string) => {
          const index = links.indexOf(link);
          if (index !== -1) {
            removeLink(index);
          }
        }}
      />

      <TagInput
        label="Known Aliases"
        placeholder="Add alias or nickname"
        currentValue={currentAlias}
        values={aliases}
        setCurrentValue={setCurrentAlias}
        addValue={handleAddAlias}
        removeValue={(alias: string) => {
          const index = aliases.indexOf(alias);
          if (index !== -1) {
            removeAlias(index);
          }
        }}
      />

      <TagInput
        label="Known Accomplices"
        placeholder="Add accomplice name"
        currentValue={currentAccomplice}
        values={accomplices}
        setCurrentValue={setCurrentAccomplice}
        addValue={handleAddAccomplice}
        removeValue={(accomplice: string) => {
          const index = accomplices.indexOf(accomplice);
          if (index !== -1) {
            removeAccomplice(index);
          }
        }}
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
