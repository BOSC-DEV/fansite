
import React from "react";
import { useListingForm } from "@/components/createListing/useListingForm";
import { useScammerFormSubmit } from "@/hooks/useScammerFormSubmit";
import { Scammer } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BasicInfoFields } from "@/components/createListing/BasicInfoFields";
import { AdditionalInfoFields } from "@/components/createListing/AdditionalInfoFields";
import { ListingDisclaimer } from "@/components/scammer/ListingDisclaimer";

interface EditScammerFormProps {
  scammer: Scammer;
  scammerId: string;
}

export function EditScammerForm({ scammer, scammerId }: EditScammerFormProps) {
  const navigate = useNavigate();
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
    handleAddLink, removeLink,
    handleAddAlias, removeAlias,
    handleAddAccomplice, removeAccomplice
  } = useListingForm();

  const { isSubmitting, submitScammerUpdate } = useScammerFormSubmit();

  // Initialize form with scammer data
  React.useEffect(() => {
    if (scammer) {
      setName(scammer.name);
      setPhotoUrl(scammer.photoUrl);
      setAccusedOf(scammer.accusedOf);
      setLinks(scammer.links);
      setAliases(scammer.aliases);
      setAccomplices(scammer.accomplices);
      setOfficialResponse(scammer.officialResponse);
    }
  }, [scammer]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await submitScammerUpdate(scammerId, scammer, {
      name,
      photoUrl,
      accusedOf,
      links,
      aliases,
      accomplices,
      officialResponse
    });
  };

  return (
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
              onClick={() => navigate(`/scammer/${scammerId}`)}
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
  );
}
