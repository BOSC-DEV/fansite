
import { useBasicInfoForm } from "@/hooks/useBasicInfoForm";
import { useLinksForm } from "@/hooks/useLinksForm";
import { useAliasesForm } from "@/hooks/useAliasesForm";
import { useAccomplicesForm } from "@/hooks/useAccomplicesForm";
import { useResponseForm } from "@/hooks/useResponseForm";
import { useFormValidation } from "@/hooks/useFormValidation";

export function useListingForm() {
  const basicInfo = useBasicInfoForm();
  const linksForm = useLinksForm();
  const aliasesForm = useAliasesForm();
  const accomplicesForm = useAccomplicesForm();
  const responseForm = useResponseForm();
  const { validateForm: validateFormBase } = useFormValidation();

  const validateForm = (): boolean => {
    return validateFormBase({
      name: basicInfo.name,
      accusedOf: basicInfo.accusedOf,
      photoUrl: basicInfo.photoUrl
    });
  };

  return {
    // Basic info
    name: basicInfo.name, 
    setName: basicInfo.setName,
    photoUrl: basicInfo.photoUrl, 
    setPhotoUrl: basicInfo.setPhotoUrl,
    accusedOf: basicInfo.accusedOf, 
    setAccusedOf: basicInfo.setAccusedOf,
    
    // Links
    currentLink: linksForm.currentLink, 
    setCurrentLink: linksForm.setCurrentLink,
    links: linksForm.links, 
    setLinks: linksForm.setLinks,
    handleAddLink: linksForm.handleAddLink,
    removeLink: linksForm.removeLink,
    xLink: linksForm.xLink,
    setXLink: linksForm.setXLink,
    
    // Aliases
    currentAlias: aliasesForm.currentAlias, 
    setCurrentAlias: aliasesForm.setCurrentAlias,
    aliases: aliasesForm.aliases, 
    setAliases: aliasesForm.setAliases,
    handleAddAlias: aliasesForm.handleAddAlias,
    removeAlias: aliasesForm.removeAlias,
    
    // Accomplices
    currentAccomplice: accomplicesForm.currentAccomplice, 
    setCurrentAccomplice: accomplicesForm.setCurrentAccomplice,
    accomplices: accomplicesForm.accomplices, 
    setAccomplices: accomplicesForm.setAccomplices,
    handleAddAccomplice: accomplicesForm.handleAddAccomplice,
    removeAccomplice: accomplicesForm.removeAccomplice,
    
    // Official response
    officialResponse: responseForm.officialResponse, 
    setOfficialResponse: responseForm.setOfficialResponse,
    
    // Form validation
    validateForm
  };
}
