
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MOCK_SCAMMERS, Scammer } from "@/lib/types";
import { Header } from "@/components/Header";
import BountyContribution from "@/components/BountyContribution";
import { useWallet } from "@/context/WalletContext";
import ConnectWallet from "@/components/ConnectWallet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowLeft,
  DollarSign,
  ExternalLink,
  Calendar,
  User,
  Copy,
  CheckCircle2,
  Link2,
  Users,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const ScammerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [bountyAmount, setBountyAmount] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchScammerDetails = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const foundScammer = MOCK_SCAMMERS.find((s) => s.id === id);
        if (foundScammer) {
          setScammer(foundScammer);
          setBountyAmount(foundScammer.bountyAmount);
        }
      } catch (error) {
        console.error("Error fetching scammer details:", error);
        toast.error("Failed to load scammer details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchScammerDetails();
  }, [id]);

  const handleCopyAddress = () => {
    if (!scammer) return;
    
    navigator.clipboard.writeText(scammer.walletAddress);
    setCopied(true);
    toast.success("Wallet address copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleContributeBounty = (amount: number) => {
    setBountyAmount((prev) => prev + amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto max-w-6xl px-4 pt-32 pb-16">
          <div className="animate-pulse max-w-3xl mx-auto">
            <div className="h-8 bg-muted rounded-md w-1/3 mb-2"></div>
            <div className="h-4 bg-muted rounded-md w-1/2 mb-8"></div>
            <div className="aspect-[16/9] bg-muted rounded-lg mb-6"></div>
            <div className="h-6 bg-muted rounded-md w-1/4 mb-4"></div>
            <div className="h-4 bg-muted rounded-md w-full mb-2"></div>
            <div className="h-4 bg-muted rounded-md w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 space-y-6">
                <div className="h-6 bg-muted rounded-md w-1/4 mb-2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded-md w-full"></div>
                  <div className="h-4 bg-muted rounded-md w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="h-[300px] bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!scammer) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto max-w-6xl px-4 pt-32 pb-16 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-3xl font-bold mb-4">Scammer Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The scammer you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/most-wanted">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Most Wanted
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto max-w-6xl px-4 pt-32 pb-16">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/most-wanted")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Most Wanted
          </Button>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-3xl font-bold">{scammer.name}</h1>
            <Badge variant="destructive" className="ml-2">
              Wanted
            </Badge>
          </div>

          <p className="text-lg text-muted-foreground mb-6">
            {scammer.accusedOf}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <div className="relative aspect-video overflow-hidden bg-muted rounded-t-lg">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <AlertCircle className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                )}
                <img
                  src={scammer.photoUrl}
                  alt={scammer.name}
                  className={cn(
                    "object-cover w-full h-full transition-opacity duration-300",
                    imageLoaded ? "opacity-100" : "opacity-0"
                  )}
                  onLoad={() => setImageLoaded(true)}
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-bosc mr-1" />
                    <span className="text-xl font-bold text-bosc">
                      {bountyAmount.toLocaleString()} $BOSC
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    Added on {formatDate(scammer.dateAdded)}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <User className="h-4 w-4 mr-1" />
                    Added by:
                  </div>
                  <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                    {scammer.addedBy}
                  </code>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">
                    Listing Wallet Address:
                  </h3>
                  <div className="flex items-center gap-2">
                    <code className="text-xs bg-muted px-2 py-1 rounded font-mono flex-1 overflow-x-auto">
                      {scammer.walletAddress}
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={handleCopyAddress}
                    >
                      {copied ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </Button>
                  </div>
                </div>

                <Separator className="my-6" />

                {scammer.aliases.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center text-sm font-medium mb-3">
                      <User className="h-4 w-4 mr-2 text-muted-foreground" />
                      Known Aliases
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {scammer.aliases.map((alias, i) => (
                        <Badge key={i} variant="outline">
                          {alias}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {scammer.accomplices.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center text-sm font-medium mb-3">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      Known Accomplices
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {scammer.accomplices.map((accomplice, i) => (
                        <Badge key={i} variant="secondary">
                          {accomplice}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {scammer.links.length > 0 && (
                  <div className="mb-6">
                    <h3 className="flex items-center text-sm font-medium mb-3">
                      <Link2 className="h-4 w-4 mr-2 text-muted-foreground" />
                      Evidence Links
                    </h3>
                    <ul className="space-y-2">
                      {scammer.links.map((link, i) => (
                        <li key={i} className="flex items-center">
                          <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-bosc hover:underline flex items-center"
                          >
                            {link}
                            <ExternalLink className="h-3 w-3 ml-1 inline-block" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {scammer.officialResponse && (
                  <div>
                    <h3 className="flex items-center text-sm font-medium mb-3">
                      <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
                      Official Response
                    </h3>
                    <div className="bg-muted/50 border border-border/50 rounded-md p-4 text-sm">
                      {scammer.officialResponse}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="bg-muted/30 border border-border/50 rounded-lg p-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium mb-1">Disclaimer</h3>
                <p className="text-sm text-muted-foreground">
                  The information provided on this page is user-submitted and
                  has not been independently verified by Book of Scams. Always
                  conduct your own research before taking any action based on
                  this information.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {isConnected ? (
              <BountyContribution
                scammerId={scammer.id}
                scammerName={scammer.name}
                currentBounty={bountyAmount}
                walletAddress={scammer.walletAddress}
                onContribute={handleContributeBounty}
              />
            ) : (
              <ConnectWallet message="Connect your wallet to contribute to this bounty" />
            )}

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">About Book of Scams</CardTitle>
                <CardDescription>
                  How the listing and bounty system works
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Each scammer listing is created with 1 $BOSC token and
                  generates a unique wallet address. Community members can
                  increase the bounty by contributing additional $BOSC tokens.
                </p>
                <p className="text-sm text-muted-foreground">
                  Higher bounties indicate greater community concern about a
                  particular scammer and can help prioritize investigations and
                  recovery efforts.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/create-listing">Report Another Scammer</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <footer className="py-8 border-t">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-bosc">Book of Scams</span>
              <span className="px-2 py-1 bg-bosc/10 text-bosc text-xs font-medium rounded-full">
                $BOSC
              </span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link to="/most-wanted" className="text-sm text-muted-foreground hover:text-foreground">
                Most Wanted
              </Link>
              <Link to="/create-listing" className="text-sm text-muted-foreground hover:text-foreground">
                Report Scammer
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Book of Scams
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScammerDetail;
