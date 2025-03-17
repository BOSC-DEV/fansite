
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/context/WalletContext";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { toast } from "sonner";
import web3Provider from "@/services/web3Provider";
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { ListingDisclaimer } from "@/components/scammer/ListingDisclaimer";
import { ListingFormActions } from "@/components/scammer/ListingFormActions";
import { useListingForm } from "./useListingForm";
import { BasicInfoFields } from "./BasicInfoFields";
import { AdditionalInfoFields } from "./AdditionalInfoFields";

export function FormContainer() {
  const navigate = useNavigate();
  const { isConnected, balance, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
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
  } = useListingForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!validateForm(balance)) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const scammerId = await web3Provider.addScammer(name, accusedOf, photoUrl);
      
      if (!scammerId) {
        throw new Error("Failed to create scammer listing");
      }
      
      console.log("Creating scammer listing with ID:", scammerId);
      console.log("Wallet for bounties controlled by developer:", DEVELOPER_WALLET_ADDRESS);
      console.log("Listing created by user wallet:", address);
      
      toast.success("Scammer successfully added to the Book of Scams!");
      toast.info("Bounty wallet is now controlled by the developer");
      
      setTimeout(() => navigate("/most-wanted"), 1000);
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast.error(`Failed to create listing: ${error.message || "Please try again"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Report a Scammer</CardTitle>
          <CardDescription>
            Add a scammer to the Book of Scams. This will cost 1 $BOSC token.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <BasicInfoFields 
            name={name}
            setName={setName}
            photoUrl={photoUrl}
            setPhotoUrl={setPhotoUrl}
            accusedOf={accusedOf}
            setAccusedOf={setAccusedOf}
          />

          <AdditionalInfoFields 
            currentLink={currentLink}
            setCurrentLink={setCurrentLink}
            links={links}
            handleAddLink={handleAddLink}
            removeLink={removeLink}
            currentAlias={currentAlias}
            setCurrentAlias={setCurrentAlias}
            aliases={aliases}
            handleAddAlias={handleAddAlias}
            removeAlias={removeAlias}
            currentAccomplice={currentAccomplice}
            setCurrentAccomplice={setCurrentAccomplice}
            accomplices={accomplices}
            handleAddAccomplice={handleAddAccomplice}
            removeAccomplice={removeAccomplice}
            officialResponse={officialResponse}
            setOfficialResponse={setOfficialResponse}
          />

          <ListingDisclaimer />
        </CardContent>
        
        <CardFooter>
          <ListingFormActions isSubmitting={isSubmitting} />
        </CardFooter>
      </Card>
    </form>
  );
}
