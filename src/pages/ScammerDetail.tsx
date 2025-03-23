
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ScammerDetailsCard } from "@/components/scammer/ScammerDetailsCard";
import { ScammerDetailSkeleton } from "@/components/scammer/ScammerDetailSkeleton";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { BountyContribution } from "@/components/BountyContribution";
import { CommentSection } from "@/components/comments/CommentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { storageService } from "@/services/storage/localStorageService";
import { Scammer } from "@/lib/types";

const ScammerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScammer = () => {
      setIsLoading(true);
      if (id) {
        const scammerData = storageService.getScammer(id);
        if (scammerData) {
          // Convert to Scammer type
          setScammer({
            id: scammerData.id,
            name: scammerData.name,
            photoUrl: scammerData.photoUrl,
            accusedOf: scammerData.accusedOf,
            links: scammerData.links,
            aliases: scammerData.aliases,
            accomplices: scammerData.accomplices,
            officialResponse: scammerData.officialResponse,
            bountyAmount: scammerData.bountyAmount,
            walletAddress: scammerData.walletAddress,
            dateAdded: new Date(scammerData.dateAdded),
            addedBy: scammerData.addedBy
          });
        }
      }
      setIsLoading(false);
    };

    loadScammer();
  }, [id]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  if (isLoading) {
    return <ScammerDetailSkeleton />;
  }

  if (!scammer) {
    return <ScammerNotFound />;
  }

  return (
    <div className="min-h-screen old-paper">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 pt-28 pb-16">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-8 hover:bg-western-sand/20 text-western-wood"
        >
          <Link to="/most-wanted">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Most Wanted
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ScammerDetailsCard
              scammer={scammer}
              bountyAmount={scammer.bountyAmount}
              imageLoaded={imageLoaded}
              setImageLoaded={setImageLoaded}
              formatDate={formatDate}
            />
            
            {/* Add comment section below the details card */}
            <div className="mt-8">
              <CommentSection scammerId={scammer.id} />
            </div>
          </div>

          <div>
            <BountyContribution 
              scammerId={scammer.id}
              currentBounty={scammer.bountyAmount}
              scammerName={scammer.name}
              walletAddress={scammer.walletAddress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScammerDetail;
