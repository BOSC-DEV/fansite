
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
import { ScammerInput } from "@/lib/types";
import { TextField, TextAreaField, TagInput } from "@/components/scammer/FormFields";
import { ListingDisclaimer } from "@/components/scammer/ListingDisclaimer";
import { ListingFormActions } from "@/components/scammer/ListingFormActions";

const DEVELOPER_WALLET_ADDRESS = "0x80ec8C9A7ac3b601a9628a840306e85a01809074";

export function CreateListingForm() {
  const navigate = useNavigate();
  const { isConnected, balance, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
    if (!name.trim()) {
      toast.error("Name is required");
      return false;
    }
    if (!accusedOf.trim()) {
      toast.error("Accusation is required");
      return false;
    }
    if (!photoUrl.trim()) {
      toast.error("Photo URL is required");
      return false;
    }
    if (balance !== null && balance < 1) {
      toast.error("Insufficient $BOSC balance. You need at least 1 $BOSC to create a listing.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const scammerData: ScammerInput = {
        name,
        photoUrl,
        accusedOf,
        links,
        aliases,
        accomplices,
        officialResponse,
        controlledByDev: true,
        devWalletAddress: DEVELOPER_WALLET_ADDRESS
      };
      
      console.log("Creating scammer listing:", scammerData);
      console.log("Wallet for bounties controlled by developer:", DEVELOPER_WALLET_ADDRESS);
      console.log("Listing created by user wallet:", address);
      
      toast.success("Scammer successfully added to the Book of Scams!");
      toast.info("Bounty wallet is now controlled by the developer");
      
      setTimeout(() => navigate("/most-wanted"), 1000);
    } catch (error) {
      console.error("Error creating listing:", error);
      toast.error("Failed to create listing. Please try again.");
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
          <div className="grid gap-6 md:grid-cols-2">
            <TextField
              id="name"
              label="Name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            
            <TextField
              id="photoUrl"
              label="Photo URL"
              placeholder="https://example.com/photo.jpg"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
          </div>

          <TextAreaField
            id="accusedOf"
            label="Accused Of"
            placeholder="Describe the scam or fraudulent activity"
            value={accusedOf}
            onChange={(e) => setAccusedOf(e.target.value)}
            required
          />

          <TagInput
            label="Links to Evidence"
            placeholder="https://example.com/evidence"
            currentValue={currentLink}
            values={links}
            setCurrentValue={setCurrentLink}
            addValue={handleAddLink}
            removeValue={removeLink}
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

          <ListingDisclaimer />
        </CardContent>
        
        <CardFooter>
          <ListingFormActions isSubmitting={isSubmitting} />
        </CardFooter>
      </Card>
    </form>
  );
}

export default CreateListingForm;
