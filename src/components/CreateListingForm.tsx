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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Plus, AlertTriangle, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { ScammerInput } from "@/lib/types";

const DEVELOPER_WALLET_ADDRESS = "0x80ec8C9A7ac3b601a9628a840306e85a01809074";

export function CreateListingForm() {
  const navigate = useNavigate();
  const { isConnected, balance, connectWallet, address } = useWallet();
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
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photoUrl">Photo URL *</Label>
              <Input
                id="photoUrl"
                placeholder="https://example.com/photo.jpg"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="accusedOf">Accused Of *</Label>
            <Textarea
              id="accusedOf"
              placeholder="Describe the scam or fraudulent activity"
              value={accusedOf}
              onChange={(e) => setAccusedOf(e.target.value)}
              className="min-h-[80px]"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Links to Evidence</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="https://example.com/evidence"
                value={currentLink}
                onChange={(e) => setCurrentLink(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLink())}
              />
              <Button type="button" variant="outline" onClick={handleAddLink}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {links.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {links.map((link, i) => (
                  <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                    <span className="truncate max-w-[150px]">{link}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => removeLink(link)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Known Aliases</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add alias or nickname"
                value={currentAlias}
                onChange={(e) => setCurrentAlias(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAlias())}
              />
              <Button type="button" variant="outline" onClick={handleAddAlias}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {aliases.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {aliases.map((alias, i) => (
                  <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                    {alias}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => removeAlias(alias)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Label>Known Accomplices</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="Add accomplice name"
                value={currentAccomplice}
                onChange={(e) => setCurrentAccomplice(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddAccomplice())}
              />
              <Button type="button" variant="outline" onClick={handleAddAccomplice}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {accomplices.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {accomplices.map((accomplice, i) => (
                  <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
                    {accomplice}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 ml-1"
                      onClick={() => removeAccomplice(accomplice)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="officialResponse">Official Response (if any)</Label>
            <Textarea
              id="officialResponse"
              placeholder="Any official statements or responses from authorities"
              value={officialResponse}
              onChange={(e) => setOfficialResponse(e.target.value)}
              className="min-h-[80px]"
            />
          </div>

          <div className="flex items-center p-4 bg-muted/30 rounded-lg border border-border/50">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              Creating a listing costs <span className="font-medium text-foreground">1 $BOSC token</span>. 
              The total bounty shown will be in $BOSC tokens, not USD. 
              All bounty wallets are controlled by the developer for security purposes.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <Button type="button" variant="outline" onClick={() => navigate("/most-wanted")}>
            Cancel
          </Button>
          
          {isConnected ? (
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="space-x-2"
            >
              <DollarSign className="h-4 w-4 mr-1" />
              {isSubmitting ? "Creating Listing..." : "Create Listing (1 $BOSC)"}
            </Button>
          ) : (
            <Button type="button" onClick={connectWallet}>
              Connect Wallet to Continue
            </Button>
          )}
        </CardFooter>
      </Card>
    </form>
  );
}

export default CreateListingForm;
