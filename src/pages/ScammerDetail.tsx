
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
import { scammerService } from "@/services/storage/scammerService";
import { Scammer } from "@/lib/types";
import { toast } from "sonner";

const ScammerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [scammer, setScammer] = useState<Scammer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadScammer = async () => {
      setIsLoading(true);
      if (id) {
        try {
          // First try to load from Supabase
          const supabaseScammer = await scammerService.getScammer(id);
          
          if (supabaseScammer) {
            // Convert to Scammer type
            setScammer({
              id: supabaseScammer.id,
              name: supabaseScammer.name,
              photoUrl: supabaseScammer.photoUrl,
              accusedOf: supabaseScammer.accusedOf,
              links: supabaseScammer.links,
              aliases: supabaseScammer.aliases,
              accomplices: supabaseScammer.accomplices,
              officialResponse: supabaseScammer.officialResponse,
              bountyAmount: supabaseScammer.bountyAmount,
              walletAddress: "",
              dateAdded: new Date(supabaseScammer.dateAdded),
              addedBy: supabaseScammer.addedBy
            });
          } else {
            // If not found in Supabase, try localStorage
            const localScammer = storageService.getScammer(id);
            
            if (localScammer) {
              setScammer({
                id: localScammer.id,
                name: localScammer.name,
                photoUrl: localScammer.photoUrl,
                accusedOf: localScammer.accusedOf,
                links: localScammer.links,
                aliases: localScammer.aliases,
                accomplices: localScammer.accomplices,
                officialResponse: localScammer.officialResponse,
                bountyAmount: localScammer.bountyAmount,
                walletAddress: "",
                dateAdded: new Date(localScammer.dateAdded),
                addedBy: localScammer.addedBy
              });
            } else {
              console.error("Scammer not found in either Supabase or localStorage");
            }
          }
        } catch (error) {
          console.error("Error loading scammer:", error);
          // Fallback to localStorage if Supabase fails
          const localScammer = storageService.getScammer(id);
          
          if (localScammer) {
            setScammer({
              id: localScammer.id,
              name: localScammer.name,
              photoUrl: localScammer.photoUrl,
              accusedOf: localScammer.accusedOf,
              links: localScammer.links,
              aliases: localScammer.aliases,
              accomplices: localScammer.accomplices,
              officialResponse: localScammer.officialResponse,
              bountyAmount: localScammer.bountyAmount,
              walletAddress: "",
              dateAdded: new Date(localScammer.dateAdded),
              addedBy: localScammer.addedBy
            });
          } else {
            toast.error("Failed to load scammer details");
          }
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
            
            <div className="mt-8">
              <CommentSection scammerId={scammer.id} />
            </div>
          </div>

          <div>
            <BountyContribution 
              scammerId={scammer.id}
              currentBounty={scammer.bountyAmount}
              scammerName={scammer.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScammerDetail;
