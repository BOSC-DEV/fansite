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
  const [xLink, setXLink] = useState("");

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
        const scammerData = await storageService.getScammer(id);
        
        if (!scammerData) {
          setIsLoading(false);
          return;
        }

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
          views: scammerData.views || 0,
          xLink: scammerData.xLink
        };
        
        setScammer(scammerObj);
        
        if (isConnected && address === scammerObj.addedBy) {
          setIsAuthorized(true);
          
          setName(scammerObj.name);
          setPhotoUrl(scammerObj.photoUrl);
          setAccusedOf(scammerObj.accusedOf);
          setLinks(scammerObj.links);
          setAliases(scammerObj.aliases);
          setAccomplices(scammerObj.accomplices);
          setOfficialResponse(scammerObj.officialResponse);
          setXLink(scammerObj.xLink || "");
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
    
    const updatedScammer = {
      ...scammer,
      name,
      photoUrl,
      accusedOf,
      links,
      aliases,
      accomplices,
      officialResponse,
      xLink,
      dateAdded: scammer.dateAdded.toISOString(),
      likes: scammer.likes,
      dislikes: scammer.dislikes,
      views: scammer.views,
      addedBy: scammer.addedBy
    };
    
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

  const handleAddLinkWrapper = () => {
    if (currentLink.trim()) {
      setLinks([...links, currentLink.trim()]);
      setCurrentLink("");
    }
  };

  const removeLinkWrapper = (link: string) => {
    setLinks(links.filter(l => l !== link));
  };

  const handleAddAliasWrapper = () => {
    if (currentAlias.trim()) {
      setAliases([...aliases, currentAlias.trim()]);
      setCurrentAlias("");
    }
  };

  const removeAliasWrapper = (alias: string) => {
    setAliases(aliases.filter(a => a !== alias));
  };

  const handleAddAccompliceWrapper = () => {
    if (currentAccomplice.trim()) {
      setAccomplices([...accomplices, currentAccomplice.trim()]);
      setCurrentAccomplice("");
    }
  };

  const removeAccompliceWrapper = (accomplice: string) => {
    setAccomplices(accomplices.filter(a => a !== accomplice));
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
                    handleAddLink={() => {
                      if (currentLink.trim()) {
                        setLinks([...links, currentLink.trim()]);
                        setCurrentLink("");
                      }
                    }}
                    removeLink={(link) => {
                      setLinks(links.filter(l => l !== link));
                    }}
                    currentAlias={currentAlias}
                    setCurrentAlias={setCurrentAlias}
                    aliases={aliases}
                    handleAddAlias={() => {
                      if (currentAlias.trim()) {
                        setAliases([...aliases, currentAlias.trim()]);
                        setCurrentAlias("");
                      }
                    }}
                    removeAlias={(alias) => {
                      setAliases(aliases.filter(a => a !== alias));
                    }}
                    currentAccomplice={currentAccomplice}
                    setCurrentAccomplice={setCurrentAccomplice}
                    accomplices={accomplices}
                    handleAddAccomplice={() => {
                      if (currentAccomplice.trim()) {
                        setAccomplices([...accomplices, currentAccomplice.trim()]);
                        setCurrentAccomplice("");
                      }
                    }}
                    removeAccomplice={(accomplice) => {
                      setAccomplices(accomplices.filter(a => a !== accomplice));
                    }}
                    officialResponse={officialResponse}
                    setOfficialResponse={setOfficialResponse}
                    xLink={xLink}
                    setXLink={setXLink}
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
