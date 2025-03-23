
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
import { DEVELOPER_WALLET_ADDRESS } from "@/contracts/contract-abis";
import { ListingDisclaimer } from "@/components/scammer/ListingDisclaimer";
import { ListingFormActions } from "@/components/scammer/ListingFormActions";
import { useListingForm } from "./useListingForm";
import { BasicInfoFields } from "./BasicInfoFields";
import { AdditionalInfoFields } from "./AdditionalInfoFields";
import { CloudflareTurnstile } from "@/components/CloudflareTurnstile";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { storageService } from "@/services/storage/localStorageService";

// Get Cloudflare Turnstile site key from environment variables or use development key as fallback
const TURNSTILE_SITE_KEY = import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY || '1x00000000000000000000BB';

export function FormContainer() {
  const navigate = useNavigate();
  const { isConnected, address } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  
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

  const handleVerify = (token: string) => {
    setTurnstileToken(token);
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

    if (!turnstileToken) {
      toast.error("Please complete the Cloudflare security verification");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, you would validate the turnstile token server-side
      console.log("Turnstile token for verification:", turnstileToken);
      
      // Get user profile
      const userProfile = storageService.getProfile(address || "");
      if (!userProfile) {
        throw new Error("Profile not found. Please create a profile first.");
      }
      
      // Generate scammer ID
      const scammerId = uuidv4();
      
      // Create the scammer listing
      const scammerListing = {
        id: scammerId,
        name,
        photoUrl,
        accusedOf,
        links,
        aliases,
        accomplices,
        officialResponse,
        bountyAmount: 0, // No bounty for now
        walletAddress: DEVELOPER_WALLET_ADDRESS,
        dateAdded: new Date().toISOString(),
        addedBy: address || "",
        comments: [],
        likes: 0,
        dislikes: 0,
        views: 0
      };
      
      // Save to localStorage
      storageService.saveScammer(scammerListing);
      
      toast.success("Scammer successfully added to the Book of Scams!");
      
      setTimeout(() => navigate(`/scammer/${scammerId}`), 1000);
    } catch (error: any) {
      console.error("Error creating listing:", error);
      toast.error(`Failed to create listing: ${error.message || "Please try again"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="w-full max-w-3xl mx-auto border-western-wood/60 bg-western-parchment/70">
        <CardHeader className="border-b border-western-wood/20">
          <CardTitle className="text-western-accent font-wanted">Wanted Poster Details</CardTitle>
          <CardDescription className="text-western-wood">
            Add a scammer to the Book of Scams. This will cost 1 $BOSC token.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
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

          <div className="mt-6 border-t border-western-wood/20 pt-6">
            <Alert className="mb-4 border-western-accent/30 bg-western-accent/10">
              <Shield className="h-4 w-4 text-western-accent" />
              <AlertDescription className="text-western-wood">
                Protected by Cloudflare Turnstile - Verify you're not a robot
              </AlertDescription>
            </Alert>
            
            <CloudflareTurnstile 
              siteKey={TURNSTILE_SITE_KEY} 
              onVerify={handleVerify} 
            />
            
            {!turnstileToken && (
              <p className="text-sm text-western-accent mt-2">
                * Required to submit the form
              </p>
            )}
          </div>

          <ListingDisclaimer />
        </CardContent>
        
        <CardFooter className="border-t border-western-wood/20 bg-western-sand/10">
          <ListingFormActions isSubmitting={isSubmitting} />
        </CardFooter>
      </Card>
    </form>
  );
}
