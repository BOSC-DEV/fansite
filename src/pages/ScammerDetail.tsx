
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ScammerDetailSkeleton } from "@/components/scammer/ScammerDetailSkeleton";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { ScammerDetailLayout } from "@/components/scammer/details/ScammerDetailLayout";
import { useScammerDetail } from "@/hooks/useScammerDetail";

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

  // Format date for display
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-western-parchment to-western-sand/30">
      <Header />
      <ScammerDetailLayout
        scammer={scammer}
        imageLoaded={imageLoaded}
        setImageLoaded={setImageLoaded}
        scammerStats={scammerStats}
        onLikeScammer={handleLikeScammer}
        onDislikeScammer={handleDislikeScammer}
        formatDate={formatDate}
      />
    </div>
  );
}

export default ScammerDetail;
