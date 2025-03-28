
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ScammerDetailsCard } from "@/components/scammer/ScammerDetailsCard";
import { ScammerDetailSkeleton } from "@/components/scammer/ScammerDetailSkeleton";
import { ScammerNotFound } from "@/components/scammer/ScammerNotFound";
import { useScammerDetail } from "@/hooks/useScammerDetail";
import { BountyFooter } from "@/components/bounty/BountyFooter";
import { CommentSection } from "@/components/comments/CommentSection";
import { useIsMobile } from "@/hooks/use-mobile";
import { SiteFooter } from "@/components/layout/SiteFooter";

const ScammerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scammer, loading, error } = useScammerDetail(id);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return <ScammerDetailSkeleton />;
  }

  if (error || !scammer) {
    return <ScammerNotFound onBackClick={() => navigate("/most-wanted")} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{`${scammer.name || "Scammer"} | BOSC`}</title>
        <meta
          name="description"
          content={`Details about ${scammer.name || "a scammer"} reported on Book of Scams.`}
        />
      </Helmet>

      <div className="container mx-auto px-4 max-w-7xl flex-grow">
        <ScammerDetailsCard scammer={scammer} />
        
        {/* Show bounty footer if wallet addresses are available */}
        {scammer.walletAddresses && scammer.walletAddresses.length > 0 && (
          <BountyFooter
            scammerId={scammer.id}
            walletAddresses={scammer.walletAddresses}
          />
        )}
        
        {/* Comments section */}
        <CommentSection scammerId={scammer.id} />
      </div>

      {!isMobile && <SiteFooter />}
    </div>
  );
};

export default ScammerDetail;
