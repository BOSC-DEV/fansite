import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MOCK_SCAMMERS } from "@/lib/types";
import { Header } from "@/components/Header";
import BountyContribution from "@/components/BountyContribution";
import { useWallet } from "@/context/WalletContext";
import ConnectWallet from "@/components/ConnectWallet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { ScammerDetailSkeleton } from "@/components/scammer/ScammerDetailSkeleton";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { ScammerDetailsCard } from "@/components/scammer/ScammerDetailsCard";

const ScammerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isConnected } = useWallet();
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [loading, setLoading] = useState(true);
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
    return <ScammerDetailSkeleton />;
  }

  if (!scammer) {
    return <ScammerNotFound />;
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
            <ScammerDetailsCard
              scammer={scammer}
              imageLoaded={imageLoaded}
              setImageLoaded={setImageLoaded}
              formatDate={formatDate}
            />

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
                  Each scammer listing is created with 1 BOSC token and
                  generates a unique wallet address. Community members can
                  increase the bounty by contributing additional BOSC tokens.
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
                BOSC
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
