
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useWallet } from "@/context/WalletContext";
import { storageService } from "@/services/storage";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useListingForm } from "@/components/createListing/useListingForm";
import { useSubmitListing } from "@/components/createListing/SubmitListingHandler";
import { BasicInfoFields } from "@/components/createListing/BasicInfoFields";
import { AdditionalInfoFields } from "@/components/createListing/AdditionalInfoFields";
import { ListingDisclaimer } from "@/components/scammer/ListingDisclaimer";
import { ListingFormActions } from "@/components/scammer/ListingFormActions";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { Scammer } from "@/lib/types";

const EditListing = () => {
  const { id } = useParams<{ id: string }>();
  const { address, isConnected } = useWallet();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
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
    validateForm
  } = useListingForm();

  const { isSubmitting, handleSubmit } = useSubmitListing();

  useEffect(() => {
    const loadScammer = async () => {
      setIsLoading(true);
      
      if (!id) {
        setIsLoading(false);
        return;
      }

      try {
        // Load scammer details
        const scammerData = await storageService.getScammer(id);
        
        if (!scammerData) {
          setIsLoading(false);
          return;
        }

        // Convert to Scammer type
        const scammerObj: Scammer = {
          id: scammerData.id,
          name: scammerData.name,
          photoUrl: scammerData.photoUrl,
          accusedOf: scammerData.accusedOf,
          links: scammerData.links,
          aliases: scammerData.aliases,
          accomplices: scammerData.accomplices,
          officialResponse: scammerData.officialResponse,
          bountyAmount: scammerData.bountyAmount,
          walletAddress: scammerData.walletAddress || "",
          dateAdded: new Date(scammerData.dateAdded),
          addedBy: scammerData.addedBy,
          likes: scammerData.likes || 0,
          dislikes: scammerData.dislikes || 0,
          views: scammerData.views || 0
        };
        
        setScammer(scammerObj);
        
        // Check if user is authorized to edit
        if (isConnected && address === scammerObj.addedBy) {
          setIsAuthorized(true);
          
          // Populate form with existing data
          setName(scammerObj.name);
          setPhotoUrl(scammerObj.photoUrl);
          setAccusedOf(scammerObj.accusedOf);
          setLinks(scammerObj.links);
          setAliases(scammerObj.aliases);
          setAccomplices(scammerObj.accomplices);
          setOfficialResponse(scammerObj.officialResponse);
        }
      } catch (error) {
        console.error("Error loading scammer for editing:", error);
        toast.error("Failed to load scammer details");
      } finally {
        setIsLoading(false);
      }
    };

    loadScammer();
  }, [id, address, isConnected]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!scammer || !id) {
      toast.error("No scammer data to update");
      return;
    }
    
    // Update scammer data
    const updatedScammer = {
      ...scammer,
      name,
      photoUrl,
      accusedOf,
      links,
      aliases,
      accomplices,
      officialResponse,
      // Keep original date and other stats
      dateAdded: scammer.dateAdded.toISOString(),
      likes: scammer.likes,
      dislikes: scammer.dislikes,
      views: scammer.views,
      addedBy: scammer.addedBy
    };
    
    // Convert date to string for storage
    const scammerToSave = {
      ...updatedScammer,
      dateAdded: updatedScammer.dateAdded,
    };
    
    try {
      const saved = await storageService.saveScammer(scammerToSave);
      
      if (saved) {
        toast.success("Scammer listing updated successfully!");
        setTimeout(() => navigate(`/scammer/${id}`), 1500);
      } else {
        toast.error("Failed to update scammer listing");
      }
    } catch (error) {
      console.error("Error updating scammer:", error);
      toast.error("Failed to update scammer listing");
    }
  };

  // Fixed event handlers to accept event parameters and correctly handle array indices
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentLink.trim()) {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink("");
    }
  };

  const removeLink = (index: number) => {
    const newLinks = [...links];
    newLinks.splice(index, 1);
    setLinks(newLinks);
  };

  const handleAddAlias = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAlias.trim()) {
      setAliases([...aliases, currentAlias.trim()]);
      setCurrentAlias("");
    }
  };

  const removeAlias = (index: number) => {
    const newAliases = [...aliases];
    newAliases.splice(index, 1);
    setAliases(newAliases);
  };

  const handleAddAccomplice = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentAccomplice.trim()) {
      setAccomplices([...accomplices, currentAccomplice.trim()]);
      setCurrentAccomplice("");
    }
  };

  const removeAccomplice = (index: number) => {
    const newAccomplices = [...accomplices];
    newAccomplices.splice(index, 1);
    setAccomplices(newAccomplices);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col old-paper">
        <Header />
        <main className="flex-1 pt-28 pb-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="spinner"></div>
              <p className="mt-4 text-western-wood">Loading...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!scammer) {
    return <ScammerNotFound />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col old-paper">
        <Header />
        <main className="flex-1 pt-28 pb-16">
          <div className="container mx-auto px-4">
            <Alert variant="destructive" className="max-w-2xl mx-auto">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Unauthorized</AlertTitle>
              <AlertDescription>
                You are not authorized to edit this scammer listing. Only the creator can edit their listings.
              </AlertDescription>
              <div className="mt-4">
                <Button asChild>
                  <Link to={`/scammer/${id}`}>Go back to scammer details</Link>
                </Button>
              </div>
            </Alert>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col old-paper">
      <Header />

      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="mb-8 hover:bg-western-sand/20 text-western-wood"
          >
            <Link to={`/scammer/${id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Scammer Details
            </Link>
          </Button>

          <div className="paper-texture border-2 border-western-wood rounded-sm p-6">
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-wanted text-western-accent mb-2">Edit Listing</h1>
              <p className="text-western-wood max-w-2xl mx-auto">
                Update the information for this scammer listing
              </p>
            </div>
            
            <form onSubmit={handleFormSubmit}>
              <Card className="w-full max-w-3xl mx-auto border-western-wood/60 bg-western-parchment/70">
                <CardHeader className="border-b border-western-wood/20">
                  <CardTitle className="text-western-accent font-wanted">Edit Wanted Poster</CardTitle>
                  <CardDescription className="text-western-wood">
                    Update details for "{scammer.name}"
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

                  <ListingDisclaimer />
                </CardContent>
                
                <CardFooter className="border-t border-western-wood/20 bg-western-sand/10">
                  <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-6 mt-4 py-2 w-full">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => navigate(`/scammer/${id}`)}
                      className="border-western-wood text-western-wood hover:bg-western-sand/20 min-w-[120px]"
                    >
                      Cancel
                    </Button>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-western-accent hover:bg-western-accent/90 text-western-parchment font-wanted min-w-[220px]"
                    >
                      {isSubmitting ? "Updating..." : "Update Listing"}
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditListing;
