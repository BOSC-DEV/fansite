
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/header/Header";
import { ScammerDetailsCard } from "@/components/scammer/ScammerDetailsCard";
import { ScammerDetailSkeleton } from "@/components/scammer/ScammerDetailSkeleton";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { BountyContribution } from "@/components/BountyContribution";
import { CommentSection } from "@/components/comments/CommentSection";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useScammerDetail } from "@/hooks/useScammerDetail";
import { AgreementRatioBar } from "@/components/scammer/details/AgreementRatioBar";
import { Helmet } from "react-helmet-async";
import { SiteFooter } from "@/components/layout/SiteFooter";

const ScammerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
    scammer, 
    isLoading, 
    imageLoaded, 
    setImageLoaded, 
    scammerStats,
    handleLikeScammer,
    handleDislikeScammer
  } = useScammerDetail(id);

  // Update formatDate to accept a string parameter
  const formatDate = (date: string) => {
    // Convert string to Date
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  };

  if (isLoading) {
    return <ScammerDetailSkeleton />;
  }

  if (!scammer) {
    return <ScammerNotFound />;
  }

  // Ensure we have absolute URLs for social media sharing
  const getAbsoluteUrl = (url: string) => {
    if (url.startsWith('http')) {
      return url;
    }
    return `${window.location.origin}${url.startsWith('/') ? '' : '/'}${url}`;
  };

  // Construct canonical URL
  const canonicalUrl = `https://bookofscams.lol/scammer/${scammer.id}`;
  
  // Ensure image URL is absolute
  const imageUrl = getAbsoluteUrl(scammer.photoUrl);

  return (
    <div className="min-h-screen old-paper flex flex-col">
      <Header />
      <div className="container mx-auto max-w-6xl px-4 py-4 flex-1 overflow-y-auto pb-16">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="mb-8 hover:bg-western-sand/30 text-western-wood hover:text-western-wood font-western"
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
              scammerStats={scammerStats}
              onLikeScammer={handleLikeScammer}
              onDislikeScammer={handleDislikeScammer}
            />
            
            <div className="mt-8">
              <AgreementRatioBar 
                likes={scammerStats.likes} 
                dislikes={scammerStats.dislikes} 
                onLike={handleLikeScammer}
                onDislike={handleDislikeScammer}
              />
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
      <SiteFooter />
    </div>
  );
}

export default ScammerDetail;
